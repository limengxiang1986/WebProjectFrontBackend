from django.shortcuts import render

# Create your views here.

import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import *
import json
import datetime
from .models import User

from django.views.decorators.csrf import csrf_exempt

@require_http_methods(["GET","POST"])
def user_list(request):
    print('user_list')
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)

@require_http_methods(["GET"])
def add_user(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)



@require_http_methods(["GET","POST"])
def user_list2(request):
    print('############user')
    if(request.method=='POST'):
        return HttpResponse(request.POST['text_email'])
    else:
        return HttpResponse("false")

@csrf_exempt
def your_view(request):
    print('########user')
    if request.method == "POST":
        return HttpResponse(request.POST['text_email'])
    return HttpResponse("Your response")




