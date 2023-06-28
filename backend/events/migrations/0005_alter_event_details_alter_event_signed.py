# Generated by Django 4.2.2 on 2023-06-28 13:58

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_remove_participant_details_remove_participant_proof_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='details',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='event',
            name='signed',
            field=models.IntegerField(default=-1, validators=[django.core.validators.MinValueValidator(-1), django.core.validators.MaxValueValidator(1)]),
        ),
    ]
