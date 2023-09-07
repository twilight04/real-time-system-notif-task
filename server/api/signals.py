from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.db.models import signals
from .models import Text, Notification
from django.core.mail import send_mail
from django.conf import settings
from pusher import Pusher

pusher = Pusher(
    app_id=settings.PUSHER_APP_ID,
    key=settings.PUSHER_APP_KEY,
    secret=settings.PUSHER_APP_SECRET,
    cluster=settings.PUSHER_APP_CLUSTER
)

@receiver(post_save, sender=Text)
def create_or_update_text_notification(sender, instance, created, **kwargs):
    if created:
        action_message = f'{instance.text} is created'
    else:
        action_message = f'{instance.text} is updated'

    if instance.email:
        subject = 'Notification'
        message = action_message
        from_email = settings.EMAIL_HOST_USER 
        recipient_list = [instance.email]

        send_mail(subject, message, from_email, recipient_list)

    notification = Notification.objects.create(action=action_message)

    pusher.trigger('my-channel', 'my-event', {'status': 'ok'})


@receiver(pre_delete, sender=Text)
def delete_text_notification(sender, instance, **kwargs):

    action_message = f'{instance.text} is deleted'

    if instance.email:
        subject = 'Notification'
        message = action_message
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [instance.email]

        send_mail(subject, message, from_email, recipient_list)

    Notification.objects.create(
        action=action_message,
    )

    pusher.trigger('my-channel', 'my-event', {'status': 'ok'})
