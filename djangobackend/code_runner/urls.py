from django.urls import path
from .views import run_code, validate_exercise

urlpatterns = [
    path("run/", run_code, name="run_code"),
    path("validate/", validate_exercise, name="validate_exercise"),
]
