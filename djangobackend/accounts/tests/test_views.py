import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from accounts.models import User

@pytest.mark.django_db
def test_register_user_success():
    client = APIClient()
    url = reverse('register_user')
    data = {
        'username': 'pytestuser',
        'password': 'password123',
        'role': 'user'
    }

    response = client.post(url, data, format='json')

    assert response.status_code == 200
    assert 'access' in response.data
    assert response.data['user']['username'] == 'pytestuser'


@pytest.mark.django_db
def test_register_user_duplicate():
    User.objects.create_user(username='testdup', password='123456', role='user')

    client = APIClient()
    url = reverse('register_user')
    data = {
        'username': 'testdup',
        'password': 'anypass'
    }

    response = client.post(url, data, format='json')

    assert response.status_code == 400
    assert 'error' in response.data


@pytest.mark.django_db
def test_login_user_success():
    User.objects.create_user(username='logintest', password='12345678', role='admin')

    client = APIClient()
    url = reverse('login_user')
    data = {
        'username': 'logintest',
        'password': '12345678'
    }

    response = client.post(url, data, format='json')

    assert response.status_code == 200
    assert 'access' in response.data
    assert response.data['user']['username'] == 'logintest'


@pytest.mark.django_db
def test_login_user_wrong_credentials():
    client = APIClient()
    url = reverse('login_user')
    data = {
        'username': 'eva',
        'password': '1234'
    }

    response = client.post(url, data, format='json')

    assert response.status_code == 401
    assert 'error' in response.data
