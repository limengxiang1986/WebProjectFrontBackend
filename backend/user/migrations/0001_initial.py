# Generated by Django 2.2.24 on 2021-08-13 06:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=48)),
                ('email', models.EmailField(max_length=64, unique=True)),
                ('password', models.CharField(max_length=128)),
            ],
            options={
                'db_table': 'user',
            },
        ),
    ]