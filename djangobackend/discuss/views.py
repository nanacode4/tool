from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Discuss
from .serializers import DiscussSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def get_discussions_with_replies(request):
    discussions = Discuss.objects.all().order_by('-time')
    serializer = DiscussSerializer(discussions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_reply(request, discuss_id):
    serializer = DiscussSerializer(data=request.data)
    if serializer.is_valid():

        data = serializer.validated_data
        new_discuss = Discuss.objects.create(
            title=data['title'],
            description=data['description'],
            tags=data.get('tags', []),
            username=data.get('username', 'Anonymous')
        )
        return Response({'message': 'Question posted', 'id': new_discuss.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_discussion(request):
    serializer = DiscussSerializer(data=request.data)
    if serializer.is_valid():

        data = serializer.validated_data
        new_discuss = Discuss.objects.create(
            title=data['title'],
            description=data['description'],
            tags=data.get('tags', []),
            username=data.get('username', 'Anonymous')
        )
        return Response({'message': 'Question posted', 'id': new_discuss.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
