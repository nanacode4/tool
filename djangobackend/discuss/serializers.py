from rest_framework import serializers
from .models import Discuss, Reply

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['replier', 'content', 'time']

class DiscussSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True)

    class Meta:
        model = Discuss
        fields = ['id', 'title', 'description', 'tags', 'likes', 'time', 'username', 'replies']


