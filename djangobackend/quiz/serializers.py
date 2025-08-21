from rest_framework import serializers
from .models import (
    QuizIndex,
    MultipleChoiceQuestion,
    FillInBlankQuestion,
    DragDropQuestion,
    WrongAnswer
)



class MultipleChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleChoiceQuestion
        fields = ['id', 'category', 'question', 'answer', 'options']


class FillInBlankSerializer(serializers.ModelSerializer):
    class Meta:
        model = FillInBlankQuestion
        fields = ['id', 'category', 'question', 'answer', 'code_parts']


class DragDropSerializer(serializers.ModelSerializer):
    class Meta:
        model = DragDropQuestion
        fields = ['id', 'category', 'question', 'code_parts', 'answer', 'options']


class QuizIndexSerializer(serializers.ModelSerializer):
    data = serializers.SerializerMethodField()

    class Meta:
        model = QuizIndex
        fields = ['id', 'kind', 'ref_id', 'data']

    def get_data(self, obj):
        if obj.kind == 'multiple':
            question = MultipleChoiceQuestion.objects.get(id=obj.ref_id)
            return MultipleChoiceSerializer(question).data
        elif obj.kind == 'fill':
            question = FillInBlankQuestion.objects.get(id=obj.ref_id)
            return FillInBlankSerializer(question).data
        elif obj.kind == 'drag':
            question = DragDropQuestion.objects.get(id=obj.ref_id)
            return DragDropSerializer(question).data
        return None


class WrongAnswerSerializer(serializers.ModelSerializer):
    quiz = serializers.SerializerMethodField()

    class Meta:
        model = WrongAnswer
        fields = ['id', 'user', 'quiz_id', 'quiz', 'added_at']

    def get_quiz(self, obj):
        try:
            quiz_index = QuizIndex.objects.get(id=obj.quiz_id)
            if quiz_index.kind == 'multiple':
                instance = MultipleChoiceQuestion.objects.get(id=quiz_index.ref_id)
                data = MultipleChoiceSerializer(instance).data
            elif quiz_index.kind == 'fill':
                instance = FillInBlankQuestion.objects.get(id=quiz_index.ref_id)
                data = FillInBlankSerializer(instance).data
            elif quiz_index.kind == 'drag':
                instance = DragDropQuestion.objects.get(id=quiz_index.ref_id)
                data = DragDropSerializer(instance).data
            else:
                return None

            return {
                "id": quiz_index.id,
                "kind": quiz_index.kind,
                "ref_id": quiz_index.ref_id,
                "data": data
            }
        except QuizIndex.DoesNotExist:
            return None
