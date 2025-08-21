from django.contrib import admin
from .models import UserCourseProgress

@admin.register(UserCourseProgress)
class UserCourseProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'topic')
