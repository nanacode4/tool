import pytest
from accounts.models import User
from django.db import IntegrityError

@pytest.mark.django_db
def test_create_user_with_role():
    user = User.objects.create_user(username='modeluser', password='123456', role='admin')

    assert user.username == 'modeluser'
    assert user.role == 'admin'
    assert user.check_password('123456')


@pytest.mark.django_db
def test_default_role_is_user():
    user = User.objects.create_user(username='defaultrole', password='abc123')
    assert user.role == 'user'


@pytest.mark.django_db
def test_username_uniqueness():
    User.objects.create_user(username='uniqueuser', password='pass1')
    with pytest.raises(IntegrityError):
        User.objects.create_user(username='uniqueuser', password='pass2')


@pytest.mark.django_db
def test_user_str_method():
    user = User.objects.create_user(username='showme', password='123456')
    assert str(user) == 'showme'
