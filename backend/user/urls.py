from django.conf.urls import url, include
from .views import *
from .rcaedq import *

urlpatterns = [
    url(r'', user_list, ),
    url(r'user/', your_view, ),
    url(r'user', your_view, ),
    url(r'add_user$', add_user, ),
    url(r'rcaeda_ajax_add_com', rcaeda_ajax_add_com, ),
]

