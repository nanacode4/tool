from django.urls import path
from .views import all_quiz_questions,quiz_detail,wrong_answer_list,get_wrong_answers,delete_wrong_answer


urlpatterns = [
    path('', all_quiz_questions, name='all_quizzes'),
    path('wrong_answers/', wrong_answer_list, name='wrong_answers'),
    path('get_wrong_answers/', get_wrong_answers, name='get_wrong_answers'),
    path('wrong_answers/<int:quiz_id>/', delete_wrong_answer, name='delete_wrong_answer'),
    path('<int:pk>/', quiz_detail, name='quiz_detail'),

]

