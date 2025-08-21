from .models import QuizIndex, MultipleChoiceQuestion, FillInBlankQuestion, DragDropQuestion
from accounts.models import User
from .serializers import (
    MultipleChoiceSerializer,
    FillInBlankSerializer,
    DragDropSerializer,
)
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .serializers import WrongAnswerSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import WrongAnswer

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def all_quiz_questions(request):
    if request.method == 'GET':
        quiz_items = QuizIndex.objects.all()
        result = []

        for index in quiz_items:
            data = {
                "id": index.id,
                "kind": index.kind,
                "ref_id": index.ref_id,
            }

            if index.kind == 'multiple':
                instance = MultipleChoiceQuestion.objects.get(id=index.ref_id)
                data["data"] = MultipleChoiceSerializer(instance).data
            elif index.kind == 'fill':
                instance = FillInBlankQuestion.objects.get(id=index.ref_id)
                data["data"] = FillInBlankSerializer(instance).data
            elif index.kind == 'drag':
                instance = DragDropQuestion.objects.get(id=index.ref_id)
                data["data"] = DragDropSerializer(instance).data
            else:
                data["data"] = None

            result.append(data)

        return Response(result)

    elif request.method == 'POST':
        kind = request.data.get("kind")
        data = request.data.get("data")

        if kind == 'multiple':
            serializer = MultipleChoiceSerializer(data=data)
        elif kind == 'fill':
            serializer = FillInBlankSerializer(data=data)
        elif kind == 'drag':
            serializer = DragDropSerializer(data=data)
        else:
            return Response({'error': 'Invalid kind type'}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            question = serializer.save()
            index = QuizIndex.objects.create(kind=kind, ref_id=question.id)

            return Response({
                'id': index.id,
                'kind': kind,
                'ref_id': question.id,
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def quiz_detail(request, pk):
    index = get_object_or_404(QuizIndex, pk=pk)

    # Get specific topic examples
    if index.kind == 'multiple':
        model = MultipleChoiceQuestion
        serializer_class = MultipleChoiceSerializer
    elif index.kind == 'fill':
        model = FillInBlankQuestion
        serializer_class = FillInBlankSerializer
    elif index.kind == 'drag':
        model = DragDropQuestion
        serializer_class = DragDropSerializer
    else:
        return Response({'error': 'Invalid quiz kind'}, status=status.HTTP_400_BAD_REQUEST)

    instance = get_object_or_404(model, id=index.ref_id)

    # === GET ===
    if request.method == 'GET':
        data = {
            'id': index.id,
            'kind': index.kind,
            'ref_id': index.ref_id,
            'data': serializer_class(instance).data
        }
        return Response(data)

    # === PUT ===
    elif request.method == 'PUT':
        serializer = serializer_class(instance, data=request.data.get('data'), partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'id': index.id,
                'kind': index.kind,
                'ref_id': index.ref_id,
                'data': serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # === DELETE ===
    elif request.method == 'DELETE':
        instance.delete()
        index.delete()
        return Response({'message': 'Quiz deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)






User = get_user_model()



@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def wrong_answer_list(request):
    username = request.data.get("username")
    quiz_id = request.data.get("quiz")

    if not username or not quiz_id:
        return Response({"error": "Missing username or quiz ID"}, status=400)

    user = get_object_or_404(User, username=username)

    obj, created = WrongAnswer.objects.get_or_create(user=user, quiz_id=quiz_id)

    if created:
        return Response({'message': 'Added to review list'})
    else:
        return Response({'message': 'Already in review list'})

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_wrong_answers(request):
    user = request.user
    wrong_answers = WrongAnswer.objects.filter(user=user)
    serializer = WrongAnswerSerializer(wrong_answers, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_wrong_answer(request, quiz_id):
    try:
        wrong_answer = WrongAnswer.objects.get(quiz_id=quiz_id, user=request.user)
        wrong_answer.delete()
        return Response({"detail": "Wrong answer removed."}, status=status.HTTP_204_NO_CONTENT)
    except WrongAnswer.DoesNotExist:
        return Response({"error": "Wrong answer not found."}, status=status.HTTP_404_NOT_FOUND)
