from django.db import models
from django.conf import settings

# question kind
KIND_CHOICES = [
    ("multiple", "Multiple Choice"),
    ("fill", "Fill in the Blank"),
    ("drag", "Drag and Drop")
]


# === Question type table split by kind ===
class MultipleChoiceQuestion(models.Model):
    category = models.CharField(max_length=50)
    question = models.TextField()
    options = models.JSONField()  # ["a", "b", "c"]
    answer = models.CharField(max_length=100)


    def __str__(self):
        return f"[Multiple] {self.question[:30]}"


class FillInBlankQuestion(models.Model):
    category = models.CharField(max_length=50)
    question = models.TextField()
    code_parts = models.JSONField()  # [{{text: "print(", input: True}}, ...]
    answer = models.JSONField()  # ["x", "10"]


    def __str__(self):
        return f"[Fill] {self.question[:30]}"


class DragDropQuestion(models.Model):
    category = models.CharField(max_length=50)
    question = models.TextField()
    code_parts = models.JSONField()
    answer = models.JSONField()
    options = models.JSONField()

    def __str__(self):
        return f"[Drag] {self.question[:30]}"



# === Intermediate table: unified index title ===
class QuizIndex(models.Model):
    kind = models.CharField(max_length=20, choices=KIND_CHOICES)
    ref_id = models.PositiveIntegerField()  # Primary key ID pointing to different child tables

    def get_question_instance(self):
        if self.kind == "multiple":
            return MultipleChoiceQuestion.objects.get(id=self.ref_id)
        elif self.kind == "fill":
            return FillInBlankQuestion.objects.get(id=self.ref_id)
        elif self.kind == "drag":
            return DragDropQuestion.objects.get(id=self.ref_id)
        return None

    def __str__(self):
        return f"{self.kind}#{self.ref_id}"





class WrongAnswer(models.Model):
    quiz_id = models.IntegerField()
    added_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'quiz_id')

    def __str__(self):
        return f"{self.user.username} - Quiz#{self.quiz_id}"
