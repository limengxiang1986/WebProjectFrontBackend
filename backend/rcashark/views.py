import json

from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from common import fetch_dict_result
from rcashark import models
from django.db import connection

import sys

from rcashark.models import Mnrcatable, Mnrcametricstable


def rcaeda(request):
    print('-------------')
    context = {}
    return render(request, 'rcaeda.html', context)


def login(request):
    print('################add')
    if(request.method=='POST'):
        return HttpResponse(request.POST['text_email'])
    else:
        return HttpResponse("false")


@require_http_methods(["GET","POST"])
def login2():
    print('------------------login')
    html = "<html><body>It is now %s.</body></html>"
    return HttpResponse(html)

def myview(_request):
    print('################add')
    response = HttpResponse(json.dumps({"key": "value", "key2": "value"}))
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "*"
    return response

def prontoquery(_request):
    print('################prontoquery')
    try:
        print('autocompletepronto')
        PRID = _request.GET['pronto'].strip()
        item = {'query': PRID, "suggestions": []}
        rst = Mnrcatable.objects.filter(prid__icontains=PRID)
        rst2 = Mnrcametricstable.objects.filter(prid__icontains=PRID)
        for i in rst:
            item["suggestions"].append({'value': str(i.prid), 'data': str(i.prid)})
        for i in rst2:
            if {'value': str(i.prid), 'data': str(i.prid)} not in item["suggestions"]:
                item["suggestions"].append({'value': str(i.prid), 'data': str(i.prid)})
    except BaseException as e1:
        print(str(e1.message))
    dumps = json.dumps({"data": item})
    response = HttpResponse(dumps)
    print(dumps)
    return response

def tribequery(_request):
    # print('################tribequery')
    try:
        tribe = _request.GET['tribe']
        tribe = tribe.replace('delete', '').replace('DELETE', '').replace('drop', '').replace('DROP', '').replace(
            'TRUNC', '').replace('trunc', '')
        item = {'query': tribe, "suggestions": []}
        tribesql = "select \
                                v.t JiraIssueAssigneeTribe, count(*)\
                                from\
                                (\
                                    select t.TribeName t from emailservice t where t.TribeName != ''\
                                union all\
                                select t.JiraIssueAssigneeTribe t from mnrcametricstable t where t.JiraIssueAssigneeTribe != ''\
                                union all\
                                select t.tribe from inchargegroups t where t.tribe != ''\
                                union all\
                                select t.tribe from mn_gics t where t.tribe != ''\
                                union all\
                                select t.tribe from mn_ncdr_gics t where t.tribe != ''\
                                union all\
                                select t.csz from rca_xt_dm t where t.type_id = '25' and t.type_name = 'TRIBENAME'\
                                ) v\
                                where lower(v.t) LIKE lower('%" + str(tribe) + "%')\
                                group by v.t\
                                limit 10 "
        cursor = connection.cursor()
        cursor.execute(tribesql)
        jsonobj = fetch_dict_result(cursor)
        # print(jsonobj)
        for i in jsonobj:
            item["suggestions"].append({'value': str(i["JiraIssueAssigneeTribe"]), 'data': str(i["JiraIssueAssigneeTribe"])})
    except BaseException as e1:
        print(str(e1.message))

    dumps = json.dumps({"data": item})
    response = HttpResponse(dumps)
    # print(dumps)
    return response


