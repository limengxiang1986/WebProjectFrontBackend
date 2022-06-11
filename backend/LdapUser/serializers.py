from rest_framework_mongoengine import serializers

from .models import LdapUser


class LdapUserSerializer(serializers.DocumentSerializer):
    class Meta:
        model = LdapUser
        fields = '__all__'
