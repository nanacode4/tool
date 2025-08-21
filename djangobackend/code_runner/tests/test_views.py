import pytest
from django.urls import reverse
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_run_python_code_success():
    client = APIClient()
    url = reverse("run_code")
    data = {
        "language": "python",
        "code": "print(1 + 1)"
    }

    response = client.post(url, data, format="json")

    assert response.status_code == 200
    assert response.data["output"] == "2"
    assert response.data["error"] == ""


@pytest.mark.django_db
def test_run_missing_language():
    client = APIClient()
    url = reverse("run_code")
    data = {"code": "print('hello')"}

    response = client.post(url, data, format="json")

    assert response.status_code == 400
    assert "error" in response.data


@pytest.mark.django_db
def test_validate_exercise_success():
    client = APIClient()
    url = reverse("validate_exercise")
    code = """
name = "Alice"
age = 25
height = 1.68
print(f"My name is {name}, I am {age} years old and {height} meters tall.")
"""
    response = client.post(url, {"code": code}, format="json")

    assert response.status_code == 200
    assert response.data["success"] is True
    assert len(response.data["results"]) >= 6


@pytest.mark.django_db
def test_validate_exercise_missing_variable():
    client = APIClient()
    url = reverse("validate_exercise")
    code = """
age = 25
height = 1.68
print("My name is missing")
"""
    response = client.post(url, {"code": code}, format="json")

    assert response.status_code == 200
    assert response.data["success"] is False
    messages = [r["message"] for r in response.data["results"]]
    assert any("Variable 'name' is missing" in m for m in messages)
