import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

@pytest.fixture
def api_client_with_token(db):
    user = User.objects.create_user(username='testuser', password='testpass')
    refresh = RefreshToken.for_user(user)
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
    return client, user


@pytest.mark.django_db
def test_mark_topic_complete_success(api_client_with_token):
    client, user = api_client_with_token
    url = reverse('mark_topic_complete')
    data = {'topic': 'Functions', 'course': 'Python'}

    response = client.post(url, data, format='json')

    assert response.status_code == 200
    assert response.json()['message'] == 'Progress saved successfully'


@pytest.mark.django_db
def test_mark_topic_complete_missing_data(api_client_with_token):
    client, _ = api_client_with_token
    url = reverse('mark_topic_complete')

    response = client.post(url, {'topic': 'Functions'}, format='json')

    assert response.status_code == 400
    assert 'error' in response.json()


@pytest.mark.django_db
def test_get_course_progress(api_client_with_token):
    client, user = api_client_with_token
    url = reverse('get_course_progress')

    response = client.get(url)

    assert response.status_code == 200
    data = response.json()
    assert data['course'] == 'Python'
    assert data['completed'] == 0
    assert data['total'] == 15


@pytest.mark.django_db
def test_get_user_topics_empty(api_client_with_token):
    client, _ = api_client_with_token
    url = reverse('get_user_topics')

    response = client.get(url)

    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) == 0


@pytest.mark.django_db
def test_unmark_topic_complete_not_found(api_client_with_token):
    client, _ = api_client_with_token
    url = reverse('unmark_topic_complete')
    data = {'topic': 'NonExisting', 'course': 'Python'}

    response = client.delete(url, data, format='json')

    assert response.status_code == 404
    assert response.json()['error'] == 'Progress not found'
