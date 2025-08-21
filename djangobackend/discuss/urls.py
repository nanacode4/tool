from django.urls import path
from .views import get_discussions_with_replies, add_reply, create_discussion

urlpatterns = [
    path('all/', get_discussions_with_replies, name='get_discussions_with_replies'),
    path('<int:discuss_id>/reply/', add_reply, name='add_reply'),
    path('create/', create_discussion, name='create_discussion'),
]
