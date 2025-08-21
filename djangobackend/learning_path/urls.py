from django.urls import path
from .views import mark_topic_complete, get_course_progress,get_user_topics,unmark_topic_complete

urlpatterns = [
    path('user_progress/', mark_topic_complete, name='mark_topic_complete'),
    path('user_progress/summary/', get_course_progress, name='get_course_progress'),
    path('user_progress/list/', get_user_topics, name='get_user_topics'),
    path('user_progress/unmark/', unmark_topic_complete, name='unmark_topic_complete'),


]