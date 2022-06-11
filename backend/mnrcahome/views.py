from django.core import serializers
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
from rcashark import models

def mnrcametricsquery(_request):
    print('################mnrcametricsquery')
    #username = _request.GET['username1']
    #password = _request.GET['password1']
    ma = models.Mnrcametricstable.objects.all()[:5]
    dumps = json.dumps({"data": json.loads(serializers.serialize("json", ma))})
    print(dumps)
    response = HttpResponse(dumps)
    return response





