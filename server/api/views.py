from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TextSerializer
from .models import Text
from .serializers import NotificationSerializer
from .models import Notification

# Create your views here.

class TextView(APIView):

    def get(self, request, pk=None):
        try:
            if pk is None:
                texts = Text.objects.all()
                serializer = TextSerializer(texts, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                text = get_object_or_404(Text, pk=pk)
                serializer = TextSerializer(text)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            serializer = TextSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            text = get_object_or_404(Text, pk=pk)

            serializer = TextSerializer(text, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            text = get_object_or_404(Text, pk=pk)
            text.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class NotificationView(APIView):

    def get(self, request):
        try:
            notifications = Notification.objects.all().order_by('-created_at')
            serializer = NotificationSerializer(notifications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            Notification.objects.filter(is_read=False).update(is_read=True)
            return Response({'message': 'All notifications marked as read'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, pk=None):
        try:
            if pk is not None:
                notification = get_object_or_404(Notification, pk=pk)
                notification.delete()
            else:
                Notification.objects.all().delete()
                
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)