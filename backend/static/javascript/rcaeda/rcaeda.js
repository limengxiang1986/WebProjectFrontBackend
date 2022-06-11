$(document).ready(function(){
});

$("#submitbtn").click(function(){
    var formjson = makeformjson();
    $.ajax({
        type: 'POST',
        url: "/user/rcaeda_ajax_add_com",
        data: {
            'comname': 'test submit',
            'csrfmiddlewaretoken': '{{ csrf_token }}',
            'formjsonparam':JSON.stringify(formjson)
        },
        success: function (data) {
            alert(data["businessScope"]);
        }
    });
});

function makeformjson(){
    var rcaformobj = {
	"base": {
		"case_number": $("#CaseNumber").val(),
		"product": $("#Product").val(),
		"abstract_headline": $("#AbstractHeadline").val(),
		"assessors": $("#Assessors").val(),
		"quality_reviewer": $("#QualityReviewer").val(),
		"issue_description": $("#IssueDescription")[0].value,
		"triggering_scenario": $("#Triggeringscenario")[0].value,
		"triggering_scenario_category": $("#Triggeringscenariocategory").find("option:selected").text(),
		"code_deficienc": $("#CodeDeficiency")[0].value,
		"correction_description": $("#CorrectionDescription").find("option:selected").text(),
		"injection_type": $("#Injectiontype")[0].value,
		"injection_time": $("#Injectiontime")[0].value,
		"additional_facts": $("#AdditionalFacts").value ? $("#AdditionalFacts").value : '',
		"inheritance_recommendation": $("#InheritanceRecommendation")[0].value,
		"how_many_times": $("#Howmanytimes")[0].value
	}};
	try{
        var RootCauseAnalysis={};
        rcaformobj["RootCauseAnalysis"] = {};
        rcaformobj["RootCauseAnalysis"]["why_was_the_fault_introduced"] = generatorLine("WhywasthefaultintroducedTr");
        rcaformobj["RootCauseAnalysis"]["why_root_cause_was_not_found"] = generatorLine("WhyrootcausenotfoundTr");

        var EscapeDefectAnalysis={};
        rcaformobj["EscapeDefectAnalysis"] = {};
        rcaformobj["EscapeDefectAnalysis"]["why_not_requirements_review"] = generatorLine("WhydidnotrequirementsTr");
        rcaformobj["EscapeDefectAnalysis"]["why_not_design_review"] = generatorLine("WhydidnotdesignTr");
        rcaformobj["EscapeDefectAnalysis"]["why_not_analysis_tools"] = generatorLine("WhydidnotanalysistoolsTr");
        rcaformobj["EscapeDefectAnalysis"]["why_not_inspections"] = generatorLine("WhydidnotinspectionsTr");
        rcaformobj["EscapeDefectAnalysis"]["why_not_component_test"] = generatorLine("WhydidnotcomponenttestTr");
        rcaformobj["EscapeDefectAnalysis"]["why_not_entity_test"] = generatorLine("WhydidnotEntitytestTr");
        rcaformobj["EscapeDefectAnalysis"]["why_not_et_auto"] = generatorLine("WhydidnotETautoTr");
        rcaformobj["EscapeDefectAnalysis"]["why_not_system_test"] = generatorLine("WhydidnotSystemTestTr");
        rcaformobj["EscapeDefectAnalysis"]["why_not_st_auto"] = generatorLine("WhydidnotSTautoTr");
    }catch(e){
        alert(e);
    }
    return rcaformobj;
}

function generatorLine(objtrgroupdid){
    var lineArr = [];
    var objtr = $("[groupid="+objtrgroupdid+"]");
    for(var i=0;i<objtr.length;i++){
        var trobj = objtr[i];
        var lineObj = [];
        for(var j=0;j<$(trobj).find("[groupid=lindobj]").length;j++){
            var objtype = $(trobj).find("[groupid=lindobj]")[j]["type"];
            if(objtype =='textarea'){
                lineObj.push($(trobj).find("[groupid=lindobj]")[j].value);
            }else if(objtype == 'select-one'){
                lineObj.push($($(trobj).find("[groupid=lindobj]")[j]).find("option:selected").val());
            }else {
                lineObj.push($(trobj).find("[groupid=lindobj]")[j].val());
            }
        }
        lineArr.push(lineObj);
    }
    return lineArr;
}

