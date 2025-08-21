import pytest
from django.urls import reverse
from discuss.models import Discuss, Reply
import json

@pytest.mark.django_db
def test_create_discussion_success(client):
    url = reverse('create_discussion')
    data = {
        'title': 'Test Title',
        'description': 'Test Description',
        'tags': ['test', 'pytest'],
        'username': 'testuser'
    }

    response = client.post(url, data=json.dumps(data), content_type="application/json")

    assert response.status_code == 200
    assert response.json()['message'] == 'Question posted'
    assert Discuss.objects.filter(title='Test Title').exists()


@pytest.mark.django_db
def test_create_discussion_missing_fields(client):
    url = reverse('create_discussion')
    data = {'title': 'Missing description'}

    response = client.post(url, data=json.dumps(data), content_type="application/json")

    assert response.status_code == 400
    assert 'error' in response.json()


@pytest.mark.django_db
def test_add_reply_success(client):
    discuss = Discuss.objects.create(
        title='Test Discuss',
        description='Test Desc',
        tags=[],
        username='tester'
    )

    url = reverse('add_reply', args=[discuss.id])
    data = {'replier': 'someone', 'content': 'Nice question!'}

    response = client.post(url, data=json.dumps(data), content_type="application/json")

    assert response.status_code == 200
    assert response.json()['message'] == 'Reply added successfully'
    assert Reply.objects.filter(discuss=discuss, replier='someone').exists()


@pytest.mark.django_db
def test_add_reply_discuss_not_found(client):
    url = reverse('add_reply', args=[9999])
    data = {'replier': 'someone', 'content': 'Reply'}

    response = client.post(url, data=json.dumps(data), content_type="application/json")

    assert response.status_code == 404
    assert 'error' in response.json()


@pytest.mark.django_db
def test_get_discussions_with_replies(client):
    discuss = Discuss.objects.create(
        title='Discussion Title',
        description='Description',
        tags=['tag1'],
        username='author'
    )
    Reply.objects.create(discuss=discuss, replier='replier1', content='Reply content')

    url = reverse('get_discussions_with_replies')
    response = client.get(url)

    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert data[0]['title'] == 'Discussion Title'
    assert data[0]['replies'][0]['replier'] == 'replier1'
