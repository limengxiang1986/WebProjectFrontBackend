from django.db import models

# Create your models here.

class User(models.Model):
    class Meta :
        db_table = 'user'
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=48,null=False)
    email = models.EmailField(max_length=64,null=False,unique=True)
    password = models.CharField(max_length=128,null=False)



