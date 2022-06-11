from mongoengine import Q

from .models import LdapUser
from .serializers import LdapUserSerializer


def ldap_get_user_by_uid(uid, field=None):
    user = LdapUser.objects(uid=uid).first()
    if field:
        return getattr(user, field, None)
    return LdapUserSerializer(user).data


def ldap_user_selection(display_name_contains=None, squad_group=None):
    data = []
    limit = 35

    if not display_name_contains and not squad_group:
        return None
    elif display_name_contains and squad_group:
        users = LdapUser.objects(Q(display_name__icontains=display_name_contains)).filter(squad_group=squad_group).limit(limit)
    elif display_name_contains:
        users = LdapUser.objects(Q(display_name__icontains=display_name_contains)).limit(limit)
    elif squad_group:
        limit = 70
        users = LdapUser.objects.filter(squad_group=squad_group).limit(limit)

    users = list(users)
    for user in users:
        data.append(LdapUserSerializer(user).data)

    return data
