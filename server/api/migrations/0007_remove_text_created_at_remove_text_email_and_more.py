# Generated by Django 4.2.5 on 2023-09-07 05:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_text_email_delete_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='text',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='text',
            name='email',
        ),
        migrations.RemoveField(
            model_name='text',
            name='updated_at',
        ),
    ]
