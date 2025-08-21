import pytest
from django.urls import reverse
from feedback.models import Feedback
import json

@pytest.mark.django_db
def test_create_feedback_success(client):
    url = reverse('feedback-create')
    data = {
        'username': 'testuser',
        'content': 'This is a feedback message.'
    }

    response = client.post(url, data=json.dumps(data), content_type='application/json')

    assert response.status_code == 201
    assert Feedback.objects.filter(username='testuser', content='This is a feedback message.').exists()


@pytest.mark.django_db
def test_create_feedback_missing_content(client):
    url = reverse('feedback-create')
    data = {
        'username': 'testuser'

    }

    response = client.post(url, data=json.dumps(data), content_type='application/json')

    assert response.status_code == 400
    assert 'content' in response.json()


@pytest.mark.django_db
def test_feedback_list_view(client):
    Feedback.objects.create(username='user1', content='First feedback')
    Feedback.objects.create(username='user2', content='Second feedback')

    url = reverse('feedback-list')
    response = client.get(url)

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]['username'] == 'user2'
    assert data[1]['username'] == 'user1'
