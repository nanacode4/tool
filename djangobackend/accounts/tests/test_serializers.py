import pytest
from accounts.models import User
from accounts.serializers import UserSerializer


@pytest.mark.django_db
def test_user_serializer_valid_data():
    data = {
        'username': 'pytestuser',
        'password': 'mypassword',
        'role': 'admin'
    }

    serializer = UserSerializer(data=data)
    assert serializer.is_valid()
    user = serializer.save()

    assert user.username == 'pytestuser'
    assert user.role == 'admin'
    # assert user.check_password('mypassword')





@pytest.mark.django_db
def test_user_serializer_password_write_only():
    user = User(username='testhidden', role='user', email='test@example.com')
    user.set_password('secret123')
    user.save()

    serializer = UserSerializer(user)
    data = serializer.data

    assert 'password' not in data
