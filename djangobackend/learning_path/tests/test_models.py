import pytest
from django.contrib.auth import get_user_model
from learning_path.models import UserCourseProgress

User = get_user_model()

@pytest.mark.django_db
def test_create_user_course_progress():
    user = User.objects.create_user(username='testuser', password='pass123')
    progress = UserCourseProgress.objects.create(user=user, course='Python', topic='Variables')

    assert progress.user == user
    assert progress.course == 'Python'
    assert progress.topic == 'Variables'


@pytest.mark.django_db
def test_unique_together_constraint():
    user = User.objects.create_user(username='testuser2', password='pass123')
    UserCourseProgress.objects.create(user=user, course='Python', topic='Functions')

    with pytest.raises(Exception) as exc_info:
        UserCourseProgress.objects.create(user=user, course='Python', topic='Functions')

    assert 'UNIQUE constraint failed' in str(exc_info.value) or 'duplicate key value violates unique constraint' in str(exc_info.value)


@pytest.mark.django_db
def test_user_course_progress_str_method():
    user = User.objects.create_user(username='displayuser', password='pass123')
    progress = UserCourseProgress.objects.create(user=user, course='Python', topic='Loops')

    assert str(progress) == 'displayuser - Python - Loops'
