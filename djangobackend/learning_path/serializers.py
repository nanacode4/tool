from rest_framework import serializers
from .models import UserCourseProgress

class UserCourseProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCourseProgress
        fields = '__all__'
