# Generated by Django 3.1.3 on 2021-01-01 20:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='newuser',
            name='PMC',
            field=models.BooleanField(default=False),
        ),
    ]