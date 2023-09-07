from django.urls import path
from .views import TextView
from .views import NotificationView

urlpatterns = [
    path('texts', TextView.as_view(), name='texts'),
    path('texts/<int:pk>/', TextView.as_view(), name='text'),
    path('notifications', NotificationView.as_view(), name='notifications'),
    path('notifications/delete/<int:pk>/', NotificationView.as_view(), name='notification'),
    path('notifications/delete', NotificationView.as_view(), name='notification_delete'),
]
