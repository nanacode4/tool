from django.db import models
from django.conf import settings

class UserCourseProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.CharField(max_length=100, default='Python')
    topic = models.CharField(max_length=100)

    class Meta:
        unique_together = ('user', 'course', 'topic')

    def __str__(self):
        return f'{self.user.username} - {self.course} - {self.topic}'
