import json
from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.http import require_http_methods


# @require_http_methods(["GET","POST"])
# def login():
#     print('------------------login')
#     now = datetime.datetime.now()
#     html = "<html><body>It is now %s.</body></html>" % now
#     return HttpResponse(html)

def myview(_request):
    print('################addxxxxx')
    response = HttpResponse(json.dumps({"key": "value", "key2": "value"}))
    # response["Access-Control-Allow-Origin"] = "*"
    # response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    # response["Access-Control-Max-Age"] = "1000"
    # response["Access-Control-Allow-Headers"] = "*"
    return response

# def add(request):
#     print('################add')
#     if(request.method=='POST'):
#         return HttpResponse(request.POST['text_email'])
#     else:
#         return HttpResponse("false")

