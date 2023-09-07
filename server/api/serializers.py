from rest_framework import serializers
from .models import Text
from .models import Notification

class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ('__all__')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('__all__')