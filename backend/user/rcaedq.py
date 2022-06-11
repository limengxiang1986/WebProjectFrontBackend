import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .rcaform import *


@csrf_exempt
def rcaeda_ajax_add_com(request):
    comname = request.POST['comname']
    formjsonstr = request.POST['formjsonparam']
    #print(formjsonstr)
    formjsonobj = json.loads(formjsonstr)

    rcaformBase = RcaformBase(formjsonobj['base']["case_number"],
                              formjsonobj['base']["product"],
                              formjsonobj['base']["abstract_headline"],
                              formjsonobj['base']["assessors"],
                              formjsonobj['base']["quality_reviewer"],
                              formjsonobj['base']["issue_description"],
                              formjsonobj['base']["triggering_scenario"],
                              formjsonobj['base']["triggering_scenario_category"],
                              formjsonobj['base']["code_deficienc"],
                              formjsonobj['base']["correction_description"],
                              formjsonobj['base']["injection_type"],
                              formjsonobj['base']["injection_time"],
                              formjsonobj['base']["additional_facts"],
                              formjsonobj['base']["inheritance_recommendation"],
                              formjsonobj['base']["how_many_times"]
                              )

    why_was_the_fault_introduced = makeRcaformRootCauseLineList(formjsonobj["RootCauseAnalysis"]["why_was_the_fault_introduced"])
    why_root_cause_was_not_found = makeRcaformRootCauseLineList(formjsonobj["RootCauseAnalysis"]["why_root_cause_was_not_found"])
    rcaformRootCause = RcaformRootCause(why_was_the_fault_introduced,why_root_cause_was_not_found)

    why_not_requirements_review = makeRcaformEscapeCauseLineList(formjsonobj["EscapeDefectAnalysis"]["why_not_requirements_review"])
    why_not_design_review = makeRcaformEscapeCauseLineList(formjsonobj["EscapeDefectAnalysis"]["why_not_design_review"])
    why_not_analysis_tools = makeRcaformEscapeCauseLineList(formjsonobj["EscapeDefectAnalysis"]["why_not_analysis_tools"])
    why_not_inspections = makeRcaformEscapeCauseLineList(formjsonobj["EscapeDefectAnalysis"]["why_not_inspections"])
    why_not_component_test = makeRcaformEscapeCauseLineList(formjsonobj["EscapeDefectAnalysis"]["why_not_component_test"])
    why_not_entity_test = makeRcaformEscapeCauseLineList(formjsonobj["EscapeDefectAnalysis"]["why_not_entity_test"])
    why_not_et_auto = makeRcaformEscapeCauseLineList(formjsonobj["EscapeDefectAnalysis"]["why_not_et_auto"])
    why_not_system_test = makeRcaformEscapeCauseLineList(formjsonobj["EscapeDefectAnalysis"]["why_not_system_test"])
    why_not_st_auto = makeRcaformEscapeCauseLineList(formjsonobj["EscapeDefectAnalysis"]["why_not_st_auto"])
    rcaformEscapeDefect = RcaformEscapeDefect(why_not_requirements_review,why_not_design_review,why_not_analysis_tools,
                                              why_not_inspections,why_not_component_test,why_not_entity_test,why_not_et_auto,
                                              why_not_system_test,why_not_st_auto)

    rcaform = Rcaform(rcaformBase,rcaformRootCause,rcaformEscapeDefect)
    #print(rcaform.to_string())
    rcaform.doSave()

    item = {}
    keys = ['comname', 'data', 'creditCode', 'orgNumber', 'regAuthority', 'operatingStatus', 'regCapital',
            'companyType', 'termStart', 'teamEnd', 'regAddress', 'businessScope']
    for key in keys:
        item[key] = ''
    if comname:
        item['businessScope'] = 'tax'
        # print(item)
        return JsonResponse(item)
    else:
        item['data'] = '没有查到此公司!'
        return JsonResponse(item)


def makeRcaformRootCauseLineList(list):
    linelist = []
    for i in list:
        linelist.append(makeRcaformRootCauseLine(i))
    return linelist


def makeRcaformRootCauseLine(obj):
    lineobj = RcaformRootCauseLine(obj[0], obj[1], obj[2], obj[3], obj[4], obj[5],
                                   obj[6], obj[7], obj[8],
                                   obj[9], obj[10], obj[11],
                                   obj[12])
    return lineobj


def makeRcaformEscapeCauseLineList(list):
    linelist = []
    for i in list:
        linelist.append(makeRcaformEscapeCauseLine(i))
    return linelist


def makeRcaformEscapeCauseLine(obj):
    lineobj = RcaformRootCauseLine(obj[0], obj[1], obj[2], obj[3], obj[4], obj[5],
                                   obj[6], obj[7], obj[8],
                                   obj[9], obj[10], obj[11],
                                   obj[12])
    return lineobj
