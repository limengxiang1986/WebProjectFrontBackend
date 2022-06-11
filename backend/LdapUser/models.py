from mongoengine import Document, fields


class LdapUser(Document):
    uid = fields.StringField(required=True, unique=True, null=False)
    display_name = fields.StringField(required=True)
    squad_group = fields.StringField(required=True)
    mail = fields.StringField(null=True)
    site = fields.StringField(null=True)
    tribe = fields.StringField(null=True)
    mobile = fields.StringField(null=True)

    meta = {
        'indexes': [
            'uid',
            'display_name',
            'squad_group'
        ]
    }
