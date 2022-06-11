var triggeringScenarioOps = [];
var injectionTypeValuesOps = [];
var rCAValuesOps = [];
var rCASubValuesOps = [];
var rCAImprovementActionsOps = [];
var eDAValuesOps = [];
var eDASubValuesOps = [];
var eDAImprovementActionsOps = [];
var wherecouldDefecthaveBeenDetectedOps = [];
var allpos = [];
var questionicon = '&#xf00c9;';
var answericon = "&#xe704;";
var panelbtncolor = "yellow";
var panelbtncolordis = "#082961";
var hearttoken = "";

$(document).ready(function(){
    $('#main').width('100%');
    $("#main").css({width: "100%",top: "77px",position: "absolute"});
    disabledAllBtn(true);

    $("#tab-radio-1-div").show();
    $("#tab-radio-2-div").hide();
    $("#tab-radio-3-div").hide();
    $("#tab-radio-4-div").hide();

    allpos = loadSelect("all", "");
    triggeringScenarioOps = filterSelect(allpos, "01");
    injectionTypeValuesOps = filterSelect(allpos, "04");
    rCAValuesOps = filterSelect(allpos, "05");
    rCASubValuesOps = filterSelect(allpos, "", "05");
    rCAImprovementActionsOps = filterSelect(allpos, "23");
    eDAValuesOps = filterSelect(allpos, "06");
    eDASubValuesOps = filterSelect(allpos, "", "06");
    eDAImprovementActionsOps = filterSelect(allpos, "24");
    wherecouldDefecthaveBeenDetectedOps = filterSelect(allpos, "02");

    fillSelect($("#triggering_scenario_category"),triggeringScenarioOps);
    fillSelect($("#injection_type"),injectionTypeValuesOps);


    $('table tr').find('td[groupid=lindobj]:lt(5)').each(function(e){
        $(this).css('min-width','300px');
    });
    $('table tr').find('td[groupid=lindobj]:lt(5)').find('p').each(function(e){
        $(this).hide();
        $(this).parent().append('<div style="width: 100%;height: 100%;background-color:#D9E5FA;" class="qadiv"></div>');
    });
/*    $('#RCADivtable,#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr').find('td[groupid=lindobj]:lt(5)').each(function(e){
        $(this).append('<div style="width: 100%;height: 0%;background-color: #fdf59a ;position: relative; z-index: 999;" class="floatdiv"><span class="iconfont" style="left: 40%;top: 40%;font-size: 40px;">&#xeaf3;</span></div>');
    });*/
    $('#RCADivtable,#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr').find('td[groupid=lindobj]:lt(5)').hover(function(e){
        if($(this).find('p:eq(0)').text() == ""){
            show5WhyAddBtn($(this));
        }
    },function(){
        hide5WhyAddBtn($(this));
    });
    // avoid show 5why add btn when mouse hover on same tds.
    $('#RCADivtable,#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr').find('td:gt(11)').hover(function(e){
        hide5WhyAddBtn($(this));
    },function(){
        hide5WhyAddBtn($(this));
    });
    // dblclick , open edit qa panel
    $('#RCADivtable,#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr').find('td[groupid=lindobj]:lt(5)').dblclick(function(e){
        if($(this).find('p:eq(0)').text() != ""){
            doeditqa(getAEdit(getNextTd($(this))),e);
        }
    });
    $('table tr').find('td[class=btnpanel]').append("" +
        "<a href='javascript:void(0)' style='text-align: center;align-content: center;' class='edittd'  title='edit'><span class=\"iconfont\" style='float: none;opacity: 1;color:"+panelbtncolor+";'>&#xe6d4;</span></a>"+
        "<a href='javascript:void(0)' style=\"visibility: visible;color:"+panelbtncolor+";\" class='cleartd' title='clear' ><span class=\"iconfont\" style='float: none;opacity: 1;color:"+panelbtncolor+";margin: 5px 0px 0px 7px;font-size: 16px;'>&#xe6bb;</span></a>" +
        "<a href='javascript:void(0)' style=\"visibility: visible;\" class='addcause' title='add answer to cause'><span class=\"iconfont\" style='float: none;opacity: 1;color:"+panelbtncolor+";padding: 0px 0px 0px 1px;'>&#xe507;</span></a>"+
        "<a href='javascript:void(0)' style=\"display:none;\" class='branchr' title='branch right'><span class=\"iconfont\" style='float: none;opacity: 1;color:"+panelbtncolor+";margin: 0px 0px 0px 5px;font-size: 18px;'>&#xe62e;</span></a>"+
        "<a href='javascript:void(0)' style=\"visibility: visible;\" class='branchd' title='branch down' ><span class=\"iconfont\" style='float: none;opacity: 1;color:"+panelbtncolor+";margin: 5px 0px 0px 3.5px;font-size: 16px;'>&#xe753;</span></a>");
    $('table tr').find('td[class=btnpanel]').each(function(){
        getAEdit($(this)).click(function(e){
            doeditqa($(this),e);
        });
        getAAddCause($(this)).click(function(e){
            if($(this).parent().prev().find('p:eq(0)').text() != ""){
                addCause($(this),e);
            }
        });
        getABranchR($(this)).click(function(e){
            branchRight($(this),e);
        });
        getAClearTd($(this)).click(function(e){
            clearQa($(this),e);
        });
        $(this).css('max-width','30px');
    });
    $('#RCADivtable,#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr').find('th:lt(6):gt(3)').each(function(){
        $(this).hide();
    });
    $('#RCADivtable,#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr').find('td:lt(11):gt(6)').each(function(){
        $(this).hide();
    });
    $('table tr').find('td[class=btnpanel]:lt(4):gt(1)').each(function(){
        getABranchR($(this)).show();
    });
/*    $('table tr').find('td[class=btnpanel]').find('a:eq(1)').hover(function(){
        if($(this).parent().prev().find('p:eq(0)').text() != ""){
            $(this).find('span').css('color','yellow');
        }
    },function (){
        $(this).find('span').css('color','darkgray');
    });*/
    // dblclick , open edit qa panel
    $('#RCADivtable,#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr').find('td:eq(11)').dblclick(function(e){
        doeditcause($(this).find('a'),e);
    });
    $('#RCADivtable,#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr').find('td:eq(11)').find('a').click(function(e){
        doeditcause($(this),e);
    });
    // dblclick , open edit qa panel
    $('#RCADivtable,#EDADiv1table').find('tr').find('td:lt(19):gt(11)').dblclick(function(e){
        doeditpanel($(this).find('a'),e);
    });
    $('#RCADivtable,#EDADiv1table').find('tr').find('td:lt(19):gt(11)').find('a').click(function(e){
        doeditpanel($(this),e);
    });
    // // dblclick , open detected edit qa panel
    // $('#EDADiv2table,#EDADiv3table').find('tr').find('td:eq(18)').dblclick(function(e){
    //     doeditdetected($(this).find('a'),e);
    // });
    // $('#EDADiv2table,#EDADiv3table').find('tr').find('td:eq(18)').find('a').click(function(e){
    //     doeditdetected($(this),e);
    // });
    // dblclick , open edit qa panel
    $('#EDADiv2table,#EDADiv3table').find('tr').find('td:gt(11)').dblclick(function(e){
        doeditpanel($(this).find('a'),e);
    });
    $('#EDADiv2table,#EDADiv3table').find('tr').find('td:gt(11)').find('a').click(function(e){
        doeditpanel($(this),e);
    });
    rcaformjson = jQuery.parseJSON(rcaformstr);
    if("modify" == acttype ){
        initForm(rcaformjson);
        $("#submitbtn").val("SubmitToJira");
        $("#case_number").prop("readonly",true);
    }else if("addfromexcel" == acttype){
        $("#case_number").prop("readonly",true);
        $("#case_number").val(rcaform_pronto_id);
        initForm(rcaformjson);
     }else if("view" == acttype){
        $("textarea").each(function(){$(this).prop("readonly",true)});
        $("select").each(function(){$(this).attr("disabled",true)});
        initForm(rcaformjson);
        $("#SubmitToJira").css('visibility', "hidden");
        $("#RcaFactsGetFilled").css('visibility', "hidden");
        $("#CreateJiraSubTaskForAp").css('visibility', "hidden");
        $("#CreateJiraSubTaskForApFromSharePointExcel").css('visibility', "hidden");
        //$("#CloseBtn").show();
    }
    //init EDA why1 with first guide question.
    $('#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr:gt(0)').each(function(e){
        //find tr which's guide question is not null
        var guideobj = $(this).find('td:eq(0)');
        if(guideobj.find('p').text() != "") {
            var curobj = $(this).find('td:eq(1)');
            if(curobj.find('p').text() == "") {
                var title = guideobj.find('p').text();
                title = title.replaceAll('\n','');
                try {
                    title = title.replaceAll(/\s+/g, ' ').replaceAll(/\d\. /g, '');
                } catch (e) {
                }
                var innerHtml = generateQaInnerHtml(title, '');
                if (innerHtml != "") {
                    curobj.find('p:eq(0)').text(title);
                    curobj.find("div:eq(0)").html(innerHtml);
                    curobj.css({"max-width": "500px", "background-color": "#CCCCCC"});
                }
            }
        }
    });
    if($("#case_number").val() != rcaform_pronto_id){
        $("#case_number").val(rcaform_pronto_id);
    }
    $('textarea').each(function(){$(this).attr("resize", "none")});

    disabledAllBtn(false);

    if(develpflag){
         disabledAllBtn(true);
         $("#SubmitToJira-DEV").show();
    }
    if(!rcaform_pronto_id){
         disabledAllBtn(true);
    }

    $("#main").find("hr").each(function(){
       $(this).hide();
    });

    //$("#bottomDiv").offset({"top":$("#prontodiv").height() + 150});
    $("#5WhyRCAExcel").hide();
    $("#CEDARTemplate").hide();
    $("#TMTInternal").hide();
    $("#footer").hide();

    registerTableDragEvent('RCADivtable');
    registerTableDragEvent('EDADiv1table');
    registerTableDragEvent('EDADiv2table');
    registerTableDragEvent('EDADiv3table');

    $(".topnav li").click(function(){
        framelayout($(this));
    });

    $(".topnavsub li").click(function(){
        framelayout($(this));
    });

    //branchRight
    var formjson = {};
    try{
        formjson = makeformjson();
        var checkHasW4W51 = checkHasW4W5(formjson,[{"rcaformrootcause":["why_was_the_fault_introduced","why_root_cause_was_not_found"]}]);
        showBranchRight('RCADivtable', checkHasW4W51);
        var checkHasW4W52 = checkHasW4W5(formjson,[{"rcaformescapedefect":["why_not_component_test","why_not_requirements_review","why_not_inspections","why_not_design_review","why_not_analysis_tools"]}]);
        showBranchRight('EDADiv1table', checkHasW4W52);
        var checkHasW4W53 = checkHasW4W5(formjson,[{"rcaformescapedefect":["why_not_entity_test"]}]);
        showBranchRight('EDADiv2table', checkHasW4W53);
        var checkHasW4W54 = checkHasW4W5(formjson,[{"rcaformescapedefect":["why_not_system_test"]}]);
        showBranchRight('EDADiv3table', checkHasW4W54);
    }catch (e){
        return;
    }
    //branchDown
    $('#RCADivtable,#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr:gt(0)').each(function(){
        $(this).css('display','');
        if(isSubline($(this))){
            var emptyLine = true;
            for(var i =0 ;i<$(this).find('td[groupid=lindobj]').length; i++){
                if($(this).find('td[groupid=lindobj]:eq('+i+')').find('p:eq(0)').text() != ""){
                    emptyLine = false;
                }
            }
            if(emptyLine){
                $(this).hide();
            }
        }
        var currentTrIdx = $(this).parent().find("tr").index($(this));
        var nextTrIdx = currentTrIdx + 1;
        var nextTr = $(this).parent().find('tr:eq('+nextTrIdx+')');
        if(nextTr.length >0) {
            if (!isSubline(nextTr)) {
                disableA(getABranchD($(this).find('td[class=btnpanel]')));
            }
        }else {
            disableA(getABranchD($(this).find('td[class=btnpanel]')));
        }
        $(this).find('td[class=btnpanel]').each(function(){
             getABranchD($(this)).click(function(){
                var curTr = $(this).parent().parent();
                var nextTr = getNextTr(curTr);
                if(nextTr.length > 0 ){
                    if(isSubline(nextTr)){
                        nextTr.show(1000);
                        disableA(getABranchD(curTr.find('td[class=btnpanel]')));
                        var nextnextTr = getNextTr(nextTr);
                        if(isSubline(nextnextTr) && nextnextTr.css('display') != 'none' ){
                            disableA(getABranchD(nextTr.find('td[class=btnpanel]')));
                        }
                    }else {
                        disableA(getABranchD(curTr.find('td[class=btnpanel]')));
                    }
                }else {
                    disableA(getABranchD(curTr.find('td[class=btnpanel]')));
                }
             });
             getAClearTd($(this)).each(function(){
                 if(getPreTd($(this).parent()).find('p:eq(0)').text() == ""){
                     disableA($(this));
                 }
            });
             getAAddCause($(this)).each(function(){
                 if(getPreTd($(this).parent()).find('p:eq(0)').text() == ""){
                     disableA($(this));
                 }
            });
        });
    });
    $('#RCADivtable,#EDADiv1table,#EDADiv2table,#EDADiv3table').find('tr:gt(0)').each(function(){
        //if nexttr's nexttr is subline and is already show,then hide nexttr's branchdown button.
        var nextTr = getNextTr($(this));
        if(isSubline(nextTr) && nextTr.css('display') != 'none' ){
            disableA(getABranchD($(this).find('td[class=btnpanel]')));
        }
    });
    $("body").css("overflow-x","hidden");
    $("#qaaddicon").click(function(){
        qaaddiconclick();
    });
    $(document).mousedown(function(e){
        if(2 == e.which){
            return false;
        }
    });

    $('#tab-radio-1-div,#tab-radio-4-div').hover(function(){
        $("#qaaddicon").stop().css({"height":"0px","width":"0px", "opacity":0}).hide();
    });
    initComment(rcaform_pronto_id);

    var decodejiraissuetype = decodeframeid(jiraissuetype);
    if(decodejiraissuetype != ''){
        framelayout($("#"+decodejiraissuetype));
        if(['edaradio1','edaradio2','edaradio3'].indexOf(decodejiraissuetype) > -1){
            $("#tab-radio-3").click();
        }
    }
});
function bottomDivShow(type){
    if(['rca','eda','eda-sct','eda-st','eda-et'].indexOf(type) > -1){
        $("#SubmitToJira").show();
        $("#RcaFactsGetFilled").hide();
        $("#CreateJiraSubTaskForAp").hide();
        $("#gradingdiv").hide();
        //$("#CloseBtn").show();
        $("#copyurla").show();
    }else if(['facts'].indexOf(type) > -1){
        $("#SubmitToJira").show();
        $("#RcaFactsGetFilled").show();
        $("#CreateJiraSubTaskForAp").hide();
        $("#gradingdiv").hide();
        //$("#CloseBtn").show();
        $("#copyurla").show();
    }else if(['summary'].indexOf(type) > -1){
        $("#SubmitToJira").show();
        $("#RcaFactsGetFilled").hide();
        $("#CreateJiraSubTaskForAp").show();
        $("#gradingdiv").show();
        //$("#CloseBtn").show();
        $("#copyurla").show();
    }
}
$("#qaaddicon").mouseenter(function(){
        qaaddiconhover($(this));
    }
);
var objtd = null;
function qaaddiconhover(obj){
    $("#qaaddicon").stop().show().css({"height":"70px","width":"70px", "opacity":1});
}
function qaaddiconclick(){
    if(objtd != null){
        getAEdit(getNextTd(objtd)).click();
    }
}
function show5WhyAddBtn(obj){
    if(obj.find('p:eq(0)').text() == ""){
        if(getTdIdx(obj) < 11){
            var tdTop = obj.offset().top;
            var tdLeft = obj.offset().left;
            var tdW = obj.width();
            var tdH = obj.height();
            var adjustL = tdLeft+(tdW-70)/2;
            var adjustT = tdTop+(tdH-70)/2;
            $('#qaaddicon').show().offset({"top":adjustT,"left":adjustL}).css({"height":"70px","width":"70px", "opacity":1});
            objtd = obj;
        }
    }
}
function hide5WhyAddBtn(obj){
    $('#qaaddicon').css({"height":"0px","width":"0px", "opacity":0}).hide();
}
function getAEdit(td){
    return td.find("a.edittd");
}
function getAAddCause(td){
    return td.find("a.addcause");
}
function getABranchR(td){
    return td.find("a.branchr");
}
function getABranchD(td){
    return td.find("a.branchd");
}
function getAClearTd(td){
    return td.find("a.cleartd");
}
function disableA(a){
    a.find('span').css('color',panelbtncolordis);
}
function enableA(a){
    a.find('span').css('color',panelbtncolor);
}

function getNextTr(curTr){
    var curTable = curTr.parent();
    var currentTrIdx = curTable.find("tr").index(curTr);
    var nextTrIdx = currentTrIdx + 1;
    var nextTr = curTable.find('tr:eq('+nextTrIdx+')');
    return nextTr;
}
function getTdIdx(curTd){
    var colidx = curTd.parent().find("td").index(curTd);
    return colidx;
}
function getPreTd(curTd){
    var colidx = curTd.parent().find("td").index(curTd);
    var preidx = colidx - 1;
    return curTd.parent().find("td:eq("+preidx+")");
}
function getNextTd(curTd){
    var colidx = curTd.parent().find("td").index(curTd);
    var nextidx = colidx + 1;
    return curTd.parent().find("td:eq("+nextidx+")");
}
function clearQa(obj){
    var curTd = $(obj).parent();
    var preTd = getPreTd(curTd);
    if(preTd.find('p:eq(0)').text() != ''){
        preTd.find('p:eq(0)').text('');
        preTd.find('div:eq(0)').text('');
        preTd.find('div:eq(0)').css({'background-color':'#FFFFFF'});
        preTd.css({'background-color':'#FFFFFF'});
    }
    getAAddCause(curTd).find('span').css('color',panelbtncolordis);
    getAClearTd(curTd).find('span').css('color',panelbtncolordis);
}

function showBranchRight(tid, checkHasW4W51){
    if(checkHasW4W51.indexOf('why5') >= 0){
        branchRight($("#"+tid).find('tr:eq(1) td:eq(6) a:eq(2)'));
        branchRight($("#"+tid).find('tr:eq(1) td:eq(8) a:eq(2)'));
    }else if(checkHasW4W51.indexOf('why5') == -1 && checkHasW4W51.indexOf('why4') >= 0){
        branchRight($("#"+tid).find('tr:eq(1) td:eq(6) a:eq(2)'));
    }
}

function isSubline(tr){
    if(tr == undefined){
        return false;
    }
    var currentTrIdx = tr.parent().index(tr);
    if(currentTrIdx ==0){
        return false;
    }
    var firstTd = tr.find('td:eq(0),th:eq(0)');
    var secTd = tr.find('td:eq(1),th:eq(1)');
    if(firstTd.text() == "" && secTd.text().indexOf('Why') == -1){
        return true;
    }
    return false;
}

$("#CloseBtn").click(function(){
    window.close();
});

function checkHasW4W5(formjson, objlist){
    var hasW4W5 = [];
    for(var i=0;i<objlist.length;i++){
        for(var j in objlist[i]){
            for(var k=0;k<objlist[i][j].length;k++){
                for(var l=0;l<formjson[j][objlist[i][j][k]].length;l++){
                    if(formjson[j][objlist[i][j][k]][l]['why4'] != ""){
                        hasW4W5.push('why4');
                    }
                    if(formjson[j][objlist[i][j][k]][l]['why5'] != ""){
                        hasW4W5.push('why5');
                    }
                }
            }
        }
    }
    return hasW4W5;
}

function branchRight(obj){
    var colidx = obj.parent().parent().find("td").index(obj.parent());
    if([6,8].indexOf(colidx)>=0){
        obj.parent().parent().parent().find('tr').find('td:lt('+(colidx+3)+'):gt('+(colidx)+')').show(1000);
        getABranchR(obj.parent().parent().parent().find('tr').find('td:eq('+(colidx)+')')).hide(1000);
        if(colidx == '6'){
            obj.parent().parent().parent().find('tr').find('th:eq(4)').show(1000);
        }else if(colidx == '8'){
            obj.parent().parent().parent().find('tr').find('th:eq(5)').show(1000);
        }
    }
    //obj.parent().parent().parent().width(obj.parent().parent().parent().width()+300);
}

function isNullOrUndefined(obj) {
     if (typeof(obj) == "undefined" || obj == null) {
         return true;
     }
     return false;
}

function toggleWidth(id){
    $("#"+id).find('tr').find('th:eq(0)').each(function(){
        if($(this).width() < 150){
            $(this).width('250');
            $(this).parent().parent().find('tr:gt(0)').each(function(){
                $(this).find('td:eq(0)').find('p').show();
            });
        }else {
            $(this).width('5');
            $(this).parent().parent().find('tr:gt(0)').each(function(){
                $(this).find('td:eq(0)').find('p').hide();
            });
        }
    })
}

var relframeid="tab-radio-1";
var subframeid="edaradio1";

function framelayout(obj){
    $(obj).attr("color","");
    $(obj).attr("ischecked","true");
    $("#SummaryScrollFooter").hide();
    if($(obj).attr("ischecked") == "true" ){
        frameid = obj.attr("id");
        if(frameid == 'tab-radio-1'){
            $("#tab-radio-1-div").show();
            $("#tab-radio-2-div").hide();
            $("#tab-radio-3-div").hide();
            $("#topnavsub").hide();
            $("#tab-radio-4-div").hide();
            $("#RcaScrollFooter").hide();
            $(".topnav li").attr("ischecked","");
            $(".topnav li").removeClass("headmessagesedchecked");
            relframeid = frameid;
            bottomDivShow('facts');
            $("#mainscrollid1").css("top","23px");
            $("#mainscrollid1").find('p').text('Online Facts');
        }else if(frameid == 'tab-radio-2'){
            $("#tab-radio-1-div").hide();
            $("#tab-radio-2-div").show();
            $("#tab-radio-3-div").hide();
            $("#topnavsub").hide();
            $("#tab-radio-4-div").hide();
            $("#RcaScrollFooter").show();
            relframeid = frameid;
            $('#RcaScrollFooter').scrollLeft(0);
            $(".topnav li").attr("ischecked","");
            $(".topnav li").removeClass("headmessagesedchecked");
            $("#RCADiv").scrollLeft(0);
            bottomDivShow('rca');
            $("#mainscrollid1").css("top","23px");
            $("#mainscrollid1").find('p').text('Online RCA');
        }else if(frameid == 'tab-radio-3'){
            $("#tab-radio-1-div").hide();
            $("#tab-radio-2-div").hide();
            $("#tab-radio-3-div").show();
            $("#topnavsub").show();
            $("#tab-radio-4-div").hide();
            $("#RcaScrollFooter").show();
            relframeid = subframeid;
            $('#RcaScrollFooter').scrollLeft(0);
            $("#EDADiv").scrollLeft(0);
            $("#EDADiv2").scrollLeft(0);
            $("#EDADiv3").scrollLeft(0);
            $(".topnav li").attr("ischecked","");
            $(".topnav li").removeClass("headmessagesedchecked");
            bottomDivShow('eda');
            $("#mainscrollid1").css("top","59px");
            $("#mainscrollid1").find('p').text('Online EDA');
        }
        if(frameid == 'edaradio1'){
            $("#EDADiv").show();
            $("#EDADiv2").hide();
            $("#EDADiv3").hide();
            $("#EDADiv4").hide();
            $("#RcaScrollFooter").show();
            subframeid = frameid;
            relframeid = frameid;
            $('#RcaScrollFooter').scrollLeft(0);
            $("#EDADiv").scrollLeft(0);
            $(".topnavsub li").attr("ischecked","");
            $(".topnavsub li").removeClass("headmessagesedchecked");
            bottomDivShow('eda-sct');
            $("#mainscrollid1").css("top","59px");
            $("#mainscrollid1").find('p').text('Online EDA');
        }else if(frameid == 'edaradio2'){
            $("#EDADiv").hide();
            $("#EDADiv2").show();
            $("#EDADiv3").hide();
            $("#EDADiv4").hide();
            $("#RcaScrollFooter").show();
            subframeid = frameid;
            relframeid = frameid;
            $('#RcaScrollFooter').scrollLeft(0);
            $("#EDADiv2").scrollLeft(0);
            $(".topnavsub li").attr("ischecked","");
            $(".topnavsub li").removeClass("headmessagesedchecked");
            bottomDivShow('eda-et');
            $("#mainscrollid1").css("top","59px");
            $("#mainscrollid1").find('p').text('Online EDA');
        }else if(frameid == 'edaradio3'){
            $("#EDADiv").hide();
            $("#EDADiv2").hide();
            $("#EDADiv3").show();
            $("#EDADiv4").hide();
            $("#RcaScrollFooter").show();
            subframeid = frameid;
            relframeid = frameid;
            $('#RcaScrollFooter').scrollLeft(0);
            $("#EDADiv3").scrollLeft(0);
            $(".topnavsub li").attr("ischecked","");
            $(".topnavsub li").removeClass("headmessagesedchecked");
            bottomDivShow('eda-st');
            $("#mainscrollid1").css("top","59px");
            $("#mainscrollid1").find('p').text('Online EDA');
        }else if(frameid == 'tab-radio-4'){
            $("#tab-radio-1-div").hide();
            $("#tab-radio-2-div").hide();
            $("#tab-radio-3-div").hide();
            $("#topnavsub").hide();
            $("#tab-radio-4-div").show();
            $("#RcaScrollFooter").hide();
            $(".topnav li").attr("ischecked","");
            $(".topnav li").removeClass("headmessagesedchecked");
            relframeid = frameid;
            generateSummary();
            bottomDivShow('summary');
            $("#mainscrollid1").css("top","23px");
            $("#mainscrollid1").find('p').text('Online Summary');
        }
    }
    $(obj).addClass("headmessagesedchecked");
}

function generateSummary(){
    var formjson = {};
    var summarydiv = $("#summarydiv");
    try{
        formjson = makeformjson();
    }catch (e){
        alert(e);
        return;
    }
    for(var i in formjson["rcaformbase"]){
        $("#basesummary").find("table").find('#'+ i+"_summary").html("");
        if(typeof(formjson["rcaformbase"][i]) == "object"){
            $("#basesummary").find("table").find('#'+ i+"_summary").append('<p>'+formjson["rcaformbase"][i]["text"]+'</p>');
        }else {
            $("#basesummary").find("table").find('#'+ i+"_summary").append('<p>'+formjson["rcaformbase"][i]+'</p>');
        }
    }
    $("#rcasummary").html("");
    var apgradingoptions = "<option value=''></option><option value='A'>A</option><option value='B'>B</option><option value='C'>C</option><option value='D'>D</option>";
    var rcatablehtml = "<table style='margin: 10px;width: auto;margin:0px;padding:0px;margin-right: 9px;width: 2000px;'><tr style='display: none;'>";
    var colspan = '11';
    rcatablehtml += "<tr style='height: 30px;'><td style='width: 100%;height: 30px;color: #FFFFFF;text-align: center;background-color: #194A95;' colspan='"+colspan+"' ><p style='margin: 0px 0px 0px 20px;color: #FFFFFF;font-size: 22px;display: contents;'>RCA</p></td></tr>";
    rcatablehtml += "<tr><td  class='summaryth' style='width: 250px;'>Root Cause</td>" +
        "<td  class='summaryth' style='width: 250px;'>Action Proposal</td>" +
        "<td style='width: 200px;' class='summaryth' >Root Cause Category</td>" +
        "<td style='width: 200px;' class='summaryth' >Root Cause Subcategory</td>" +
        "<td style='width: 200px;' class='summaryth' >RCA Action Type</td>" +
        "<td style='width: 200px;' class='summaryth' colspan='1'>Assigned To</td>" +
        "<td style='width: 200px;' class='summaryth' colspan='1' >RCA AI ID</td>" +
        "<td style='width: 200px;' class='summaryth' colspan='1' >Completion Target Date</td>" +
        "<td style='width: 200px;display: none;' class='summarythgrade'>RCA Quality Grade</td>" +
        "<td style='display: none;' class='summaryth'></td><td style='width: 200px;' class='summarythgrade'>Options</td></tr>";
    for(var i in formjson["rcaformrootcause"]){
        for (var k=0;k<formjson["rcaformrootcause"][i].length;k++ ){
            var hasData = false;
            var ap_id = formjson["rcaformrootcause"][i][k]['ap_id'];
            for(var kv in formjson["rcaformrootcause"][i][k]){
                if(kv.indexOf('why') ==-1 && kv.indexOf('ap_id') ==-1 && getFieldVal(formjson["rcaformrootcause"][i][k], kv) != "<p></p>"){
                    hasData = true;
                }
            }
            if(hasData){
                var apjiraid = getFieldValPrue(formjson["rcaformrootcause"][i][k], "ap_jiratask_id");
                rcatablehtml += "<tr summaryuuid='"+ap_id+"' >" +
                    "<td>"+getFieldVal(formjson["rcaformrootcause"][i][k],"rootcause")+"</td>" +
                    "<td>"+getFieldVal(formjson["rcaformrootcause"][i][k],"actionproposal")+"</td>" +
                    "<td>"+getFieldVal(formjson["rcaformrootcause"][i][k],"root_cause_category")+"</td>" +
                    "<td>"+getFieldVal(formjson["rcaformrootcause"][i][k],"root_cause_subcategory")+"</td>" +
                    "<td>"+getFieldVal(formjson["rcaformrootcause"][i][k],"rca_action_type")+"</td>" +
                    "<td colspan='1'>"+getFieldVal(formjson["rcaformrootcause"][i][k],"assigned_to")+"</td>" +
                    "<td colspan='1' style='background-color: "+(apjiraid ? "darkseagreen" :"")+"'><a href='javascript:void(0)' style='text-decoration: none;color: blue; ' onclick='openLink(\"https://jiradc.ext.net.nokia.com/browse/"+apjiraid+"\")'>"+apjiraid+"</a></td>" +
                    "<td colspan='1' >"+getFieldVal(formjson["rcaformrootcause"][i][k], "completion_target_date")+"</td>" +
                    "<td style='display: none;'><select group='gradingselect'>" + apgradingoptions + "</select></td>" +
                    "<td style='display: none;'></td>" +
                    "<td><a style='display: "+(apjiraid ? "none" :"")+"' class='createaplink' onclick='createsingleap(\"RCA\",\""+rcaform_pronto_id+"\",\""+i+"\",\""+k+"\")'>Create Ap</a></td>" +
                    "</tr>";
            }
        }
    }
    //$("#edasummary-sct").html("<br><div style='width: 100%;height: 30px;color: #FFFFFF;text-align: center;' class='summarytitle'><p style='margin: 0px 0px 0px 20px;color: #FFFFFF;font-size: 22px;'>EDA-SCT</p></div>");
    //$("#edasummary-et").html("<br><div style='width: 100%;height: 30px;color: #FFFFFF;text-align: center;' class='summarytitle'><p style='margin: 0px 0px 0px 20px;color: #FFFFFF;font-size: 22px;'>EDA-ET</p></div>");
    //$("#edasummary-st").html("<br><div style='width: 100%;height: 30px;color: #FFFFFF;text-align: center;' class='summarytitle'><p style='margin: 0px 0px 0px 20px;color: #FFFFFF;font-size: 22px;'>EDA-ST</p></div>");
    var ettitle = true;
    var sttitle = true;
    var sctThFlag = true;
    for(var i in formjson["rcaformescapedefect"]) {
        //eda
        if (["why_not_requirements_review", "why_not_design_review", "why_not_analysis_tools", "why_not_inspections", "why_not_component_test"].indexOf(i) >= 0) {
            //sct et st
            for (var k = 0; k < formjson["rcaformescapedefect"][i].length; k++) {
                if(sctThFlag){
                    sctThFlag = false;
                    rcatablehtml += "<tr style='height: 30px;'><td style='width: 100%;height: 30px;color: #FFFFFF;text-align: center;background-color: #194A95;' colspan='"+colspan+"' ><p style='margin: 0px 0px 0px 20px;color: #FFFFFF;font-size: 22px;display: contents;'>EDA-SCT</p></td></tr>";
                    rcatablehtml += "<tr><td   style='max-width:300px;display: none;' class='summaryth' >why1</td>" +
                        "<td   style='max-width:300px;display: none;' class='summaryth' >why2</td>" +
                        "<td   style='max-width:300px;display: none;' class='summaryth' >why3</td>" +
                        "<td   style='max-width:300px;display: none;' class='summaryth' >why4</td>" +
                        "<td   style='max-width:300px;display: none;' class='summaryth' >why5</td>" +
                        "<td  class='summaryth'>Escape Cause</td><td    class='summaryth' >Action Proposal</td>" +
                        "<td   class='summaryth' >Escape Cause Category</td>" +
                        "<td   class='summaryth' >Escape Cause Subcategory</td>" +
                        "<td   class='summaryth' >EDA Action Type</td>" +
                        "<td   class='summaryth' colspan='1'>Assigned To</td>" +
                        "<td    class='summaryth' colspan='1' >RCA AI ID</td>" +
                        "<td width='10%'   class='summaryth' colspan='1' >Completion Target Date</td>" +
                        "<td style='width: 200px;display: none;' class='summarythgrade'>EDA Quality Grade</td>" +
                        "<td style='display: none;' class='summaryth'></td>" +
                        "<td style='width: 200px;' class='summarythgrade'>Options</td></tr>";
                }
                var hasData = false;
                var ap_id = formjson["rcaformescapedefect"][i][k]['ap_id'];
                for (var kv in formjson["rcaformescapedefect"][i][k]) {
                    if (kv.indexOf('why') ==-1 && kv.indexOf('ap_id') ==-1 && getFieldVal(formjson["rcaformescapedefect"][i][k], kv) != "<p></p>") {
                        hasData = true;
                    }
                }
                if (hasData) {
                    var apjiraid = getFieldValPrue(formjson["rcaformescapedefect"][i][k], "ap_jiratask_id");
                    rcatablehtml += "<tr summaryuuid='"+ap_id+"'>" +
                        "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why1") + "</td>" +
                        "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why2") + "</td>" +
                        "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why3") + "</td>" +
                        "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why4") + "</td>" +
                        "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why5") + "</td>" +
                        "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "escape_cause") + "</td>" +
                        "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "actionproposal") + "</td>" +
                        "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "escape_cause_category") + "</td>" +
                        "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "escape_cause_subcategory") + "</td>" +
                        "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "eda_action_type") + "</td>" +
                        "<td colspan='1'>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "assigned_to") + "</td>" +
                        "<td colspan='1'  style='background-color: "+(apjiraid ? "darkseagreen" :"")+"'><a href='javascript:void(0)' style='text-decoration: none;color: blue; ' onclick='openLink(\"https://jiradc.ext.net.nokia.com/browse/"+apjiraid+"\")'>"+apjiraid+"</a></td>" +
                        "<td colspan='1' >" + getFieldVal(formjson["rcaformescapedefect"][i][k], "completion_target_date") + "</td>" +
                        "<td style='display: none;'><select group='gradingselect'>" + apgradingoptions + "</select></td>" +
                        "<td style='display: none;'></td>" +
                        "<td><a style='display: "+(apjiraid ? "none" :"")+"' class='createaplink' onclick='createsingleap(\"EDA\",\""+rcaform_pronto_id+"\",\""+i+"\",\""+k+"\")'>Create Ap</a></td></tr>";
                }
            }
        } else {
            //sct et st
            for (var k = 0; k < formjson["rcaformescapedefect"][i].length; k++) {
                var divid = "";
                if (["why_not_entity_test", "why_not_et_auto"].indexOf(i) >= 0) {
                    divid = "edasummary-et";
                    if(ettitle){
                        ettitle = false;
                        rcatablehtml += "<tr style='height: 30px;'><td style='width: 100%;height: 30px;color: #FFFFFF;text-align: center;background-color: #194A95;' colspan='"+colspan+"' ><p style='margin: 0px 0px 0px 20px;color: #FFFFFF;font-size: 22px;display: contents;'>EDA-ET</p></td></tr>";
                        rcatablehtml += "<tr><td   style='max-width:300px;display: none;' class='summaryth' >why1</td>" +
                            "<td   style='max-width:300px;display: none;' class='summaryth' >why2</td>" +
                            "<td   style='max-width:300px;display: none;' class='summaryth' >why3</td>" +
                            "<td   style='max-width:300px;display: none;' class='summaryth' >why4</td>" +
                            "<td  style='max-width:300px;display: none;' class='summaryth' >why5</td>" +
                            "<td class='summaryth'>Escape Cause</td>" +
                            "<td   class='summaryth' >Action Proposal</td>" +
                            "<td   class='summaryth' >Escape Cause Category</td>" +
                            "<td   class='summaryth' >Escape Cause Subcategory</td>" +
                            "<td   class='summaryth' >EDA Action Type</td>" +
                            "<td   class='summaryth' colspan='1'>Assigned To</td>" +
                            "<td   class='summaryth' colspan='1' >RCA AI ID</td>" +
                            "<td   class='summaryth' colspan='1' >Completion Target Date</td>" +
                            "<td style='display: none;'  class='summaryth' colspan='1' >Where Could Defect Have Been Detected</td>" +
                            "<td style='width: 200px;display: none;' class='summarythgrade'>EDA Quality Grade</td>" +
                            "<td style='width: 200px;' class='summarythgrade'>Options</td></tr>";
                    }

                    var hasData = false;
                    for (var kv in formjson["rcaformescapedefect"][i][k]) {
                        if (kv.indexOf('why') ==-1 && kv.indexOf('ap_id') ==-1 && getFieldVal(formjson["rcaformescapedefect"][i][k], kv) != "<p></p>") {
                            hasData = true;
                        }
                    }
                    var ap_id = formjson["rcaformescapedefect"][i][k]['ap_id'];
                    if (hasData) {
                        var apjiraid = getFieldValPrue(formjson["rcaformescapedefect"][i][k], "ap_jiratask_id");
                        rcatablehtml += "<tr summaryuuid='"+ap_id+"' >" +
                            "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why1") + "</td>" +
                            "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why2") + "</td>" +
                            "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why3") + "</td>" +
                            "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why4") + "</td>" +
                            "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why5") + "</td>" +
                            "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "escape_cause") + "</td>" +
                            "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "actionproposal") + "</td>" +
                            "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "escape_cause_category") + "</td>" +
                            "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "escape_cause_subcategory") + "</td>" +
                            "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "eda_action_type") + "</td>" +
                            "<td colspan='1'>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "assigned_to") + "</td>" +
                            "<td colspan='1' style='background-color: "+(apjiraid ? "darkseagreen" :"")+"'><a href='javascript:void(0)' style='text-decoration: none;color: blue; ' onclick='openLink(\"https://jiradc.ext.net.nokia.com/browse/"+apjiraid+"\")'>"+apjiraid+"</a></td>" +
                            "<td colspan='1' >" + getFieldVal(formjson["rcaformescapedefect"][i][k], "completion_target_date") + "</td>" +
                            "<td style='display: none;'  width='15%'colspan='1' >" + getFieldVal(formjson["rcaformescapedefect"][i][k], "where_could_defect_have_been_detected") + "</td>" +
                            "<td style='display: none;'><select group='gradingselect'>" + apgradingoptions + "</select></td>" +
                            "<td><a style='display: "+(apjiraid ? "none" :"")+"' class='createaplink' onclick='createsingleap(\"EDA\",\""+rcaform_pronto_id+"\",\""+i+"\",\""+k+"\")'>Create Ap</a></td></tr>";
                    }
                } else if (["why_not_system_test", "why_not_st_auto"].indexOf(i) >= 0) {
                    if(sttitle){
                        rcatablehtml += "<tr style='height: 30px;'><td style='width: 100%;height: 30px;color: #FFFFFF;text-align: center;background-color: #194A95;' colspan='"+colspan+"' ><p style='margin: 0px 0px 0px 20px;color: #FFFFFF;font-size: 22px;display: contents;'>EDA-ST</p></td></tr>";
                        rcatablehtml += "<tr><td  style='max-width:300px;display: none;' class='summaryth' >why1</td>" +
                            "<td  style='max-width:300px;display: none;' class='summaryth' >why2</td>" +
                            "<td  style='max-width:300px;display: none;' class='summaryth' >why3</td>" +
                            "<td  style='max-width:300px;display: none;' class='summaryth' >why4</td>" +
                            "<td  style='max-width:300px;display: none;' class='summaryth' >why5</td>" +
                            "<td class='summaryth'>Escape Cause</td><td   class='summaryth' >Action Proposal</td>" +
                            "<td   class='summaryth' >Escape Cause Category</td>" +
                            "<td   class='summaryth' >Escape Cause Subcategory</td>" +
                            "<td   class='summaryth' >EDA Action Type</td>" +
                            "<td   class='summaryth' colspan='1'>Assigned To</td>" +
                            "<td   class='summaryth' colspan='1' >RCA AI ID</td>" +
                            "<td   class='summaryth' colspan='1' >Completion Target Date</td>" +
                            "<td style='display: none;'   class='summaryth' colspan='1' >Where Could Defect Have Been Detected</td>" +
                            "<td style='width: 200px;display: none;' class='summarythgrade'>EDA Quality Grade</td>" +
                            "<td style='width: 200px;' class='summarythgrade'>Options</td></tr>";
                        sttitle = false;
                    }
                    divid = "edasummary-st";
                    var hasData = false;
                    for (var kv in formjson["rcaformescapedefect"][i][k]) {
                        if (kv.indexOf('why') ==-1 && kv.indexOf('ap_id') ==-1 && getFieldVal(formjson["rcaformescapedefect"][i][k], kv) != "<p></p>") {
                            hasData = true;
                        }
                    }
                    var ap_id = formjson["rcaformescapedefect"][i][k]['ap_id'];
                    if (hasData) {
                        var apjiraid = getFieldValPrue(formjson["rcaformescapedefect"][i][k], "ap_jiratask_id");
                        rcatablehtml += "<tr summaryuuid='"+ap_id+"'>" +
                            "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why1") + "</td>" +
                            "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why2") + "</td>" +
                            "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why3") + "</td>" +
                            "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why4") + "</td>" +
                            "<td style='display: none;'>" + getFieldValQa(formjson["rcaformescapedefect"][i][k], "why5") + "</td>" +
                            "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "escape_cause") + "</td>" +
                            "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "actionproposal") + "</td>" +
                            "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "escape_cause_category") + "</td>" +
                            "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "escape_cause_subcategory") + "</td>" +
                            "<td>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "eda_action_type") + "</td>" +
                            "<td colspan='1'>" + getFieldVal(formjson["rcaformescapedefect"][i][k], "assigned_to") + "</td>" +
                            "<td colspan='1'  style='background-color: "+(apjiraid ? "darkseagreen" :"")+"'><a href='javascript:void(0)' style='text-decoration: none;color: blue; ' onclick='openLink(\"https://jiradc.ext.net.nokia.com/browse/"+apjiraid+"\")'>"+apjiraid+"</a></td>" +
                            "<td colspan='1' >" + getFieldVal(formjson["rcaformescapedefect"][i][k], "completion_target_date") + "</td>" +
                            "<td style='display: none;'  width='15%'colspan='1' >" + getFieldVal(formjson["rcaformescapedefect"][i][k], "where_could_defect_have_been_detected") + "</td>" +
                            "<td style='display: none;'><select group='gradingselect'>" + apgradingoptions + "</select></td>" +
                            "<td><a style='display: "+(apjiraid ? "none" :"")+"' class='createaplink' onclick='createsingleap(\"EDA\",\""+rcaform_pronto_id+"\",\""+i+"\",\""+k+"\")'>Create Ap</a></td></tr>";
                    }
                }
            }
        }
    }
    $(rcatablehtml+"</table>").appendTo($("#rcasummary"));
    //$(scttablehtml+"</table>").appendTo($("#edasummary-sct"));
    //$(ettablehtml+"</table>").appendTo($("#edasummary-et"));
    //$(sttablehtml+"</table>").appendTo($("#edasummary-st"));
    $("#SummaryScrollFooter").show();
    $("#rcasummary").find("select[group=gradingselect]").change(function(){
        var grading = $(this).find("option:selected").text();
        var oriobj = $("tr[ap_id="+$(this).parent().parent().attr('summaryuuid')+"]");
        oriobj.find('td:eq(20)').find('p').text(grading);
    });
    $("#rcasummary").find("select[group=gradingselect]").each(function(){
        var ap_id = $(this).parent().parent().attr('summaryuuid');
        var oriobj = $("tr[ap_id="+ap_id+"]");
        $(this).val(oriobj.find('td:eq(20)').find('p').text());
    });
}

function createsingleap(rcaedatype,prid, i,k){
    var formjson = {};
    try{
        formjson = makeformjson();
    }catch (e){
        alert(e);
        return;
    }
    var apid = '';
    if(rcaedatype=='RCA'){
        var obj = formjson["rcaformrootcause"][i][k];
        apid = formjson["rcaformrootcause"][i][k]["ap_id"];
        if(obj['ap_jiratask_id']){
            alert('Jira ap is created,cannot duplicate create.');
            return;
        }
        if(!(obj['rootcause'] && obj['root_cause_category'] && obj['root_cause_subcategory'] &&
            obj['assigned_to'] && obj['actionproposal'] &&
            obj['rca_action_type'] && obj['completion_target_date'] && true)){
            alert('Please complete the information before creating AP.');
            return ;
        }
    }else if(rcaedatype=='EDA'){
        var obj = formjson["rcaformescapedefect"][i][k];
        apid = formjson["rcaformescapedefect"][i][k]["ap_id"];
        if(obj['ap_jiratask_id']){
            alert('Jira ap is created,cannot duplicate create.');
            return;
        }
        if(!(obj['escape_cause'] && obj['escape_cause_category'] && obj['escape_cause_subcategory'] &&
            obj['assigned_to'] && obj['actionproposal'] &&
            obj['eda_action_type'] && obj['completion_target_date'] && true)){
            alert('Please complete the information before creating AP.');
            return ;
        }
    }
    var rst = confirm('Confirm to Create AP?' );
    if(!rst){
        return;
    }
    var vacttype = $("#acttype").val();
    disabledAllBtn(true);
    showloading('', '');
    hearttoken = sys_guid();
    $.ajax({
        type: 'POST',
        url: "/prontowebCreateSingleAp",
        timeout:20000,
        data: {
            'csrfmiddlewaretoken': '{{ csrf_token }}',
            'prid':prid,
            'ap_id':apid,
            'formjsonparam':JSON.stringify(formjson),
            'jiraissueid' : jiraissueid,
            'acttype' : vacttype,
            'rcaedatype':rcaedatype,
            'hearttoken':hearttoken
        },
        success: function (data) {
            hideloading();
            disabledAllBtn(false);
            if(data && data["result"] == 'success'){
                alert('Success.');
                location.href = "/?pridsearch2="+rcaform_pronto_id;
            } else if(data && data["result"] == 'error') {
                alert("Error.An error occurred, please contact the administrator. " + data["mes"]);
            } else {

            }
        },
        complete : function(XMLHttpRequest,status){
           if(status=='timeout'){
               hideloading();
               disabledAllBtn(false);
           }else if(status=='error'){
               alert(status);
           }
           hideloading();
           disabledAllBtn(false);
        }
    });
}

function getFieldValPrue(obj, key){
     if(typeof(obj[key]) == "object"){
         return obj[key]["text"];
     }else {
        return obj[key];
     }
}
function getFieldVal(obj, key){
     if(typeof(obj[key]) == "object"){
         return '<p style="font-size: 14px;">' + obj[key]["text"] + '</p>';
     }else {
        return '<p>' + obj[key] + '</p>';
     }
}

function getFieldValQa(obj, key){
    var qa = parseQa(obj[key]);
    var html = generateQaInnerHtml(qa[0],qa[1]);
    return html;
}

function adjustTextAreaLayout(){
    $("td[groupid=lindobj]").find("textarea").each(function(){
        _width = $(this).parent().width();
        _height = $(this).parent().height();
        $(this).css({"height":"90%"});
    });
}

function addCause(obj,e){
    var trobj = $(obj.parent().parent());
    var t = $(obj.parent().prev().find('p')[0]).text();
    var answer = '';
    if(t.indexOf('\r\nAnswer:\r\n')>=0){
        answer = t.substring(t.indexOf('\r\nAnswer:\r\n')+11);
    }else if(t.indexOf('\n\nAnswer:\n')>=0){
        answer = t.substring(t.indexOf('\n\nAnswer:\n')+10);
    }
    var causeTd = trobj.find('td:eq(11)');
    var causeText = causeTd.find('p').text();
    var bgcolor = causeTd.css("background-color");
    var flyer = $('<svg class="icon" aria-hidden="true" font-size="35px"><use xlink:href="#icon-yuandian4"></use></svg>');  //$('<img class="u-flyer" src="'+img+'">');
    flyer.clone().fly({
        start: {
            left: e.clientX,
            top: e.clientY
        },
        end: {
            left: causeTd.offset().left+200,
            top: e.clientY,
            width: 0,
            height: 0
        },
        speed: 1.4,
        vertex_Rtop: 10,
        onEnd: function(){
            if(causeText.indexOf(answer) == -1){
                if(causeText == ''){
                    causeTd.find('p').text(answer);
                }else {
                    causeTd.find('p').text(causeText+'\r\n'+answer);
                }
            }
            causeTd.animate({"background-color":"#00C9FF"},100 ).animate({"background-color":bgcolor},500 );
            var flyer2 = $('<p style="background-color: #3DAA00;color: #FFFFFF;font-size: 20px;">Added.</p>');  //$('<img class="u-flyer" src="'+img+'">');
            flyer2.clone().fly({
                start: {
                    left: e.clientX,
                    top: e.clientY
                },
                end: {
                    left: e.clientX+0,
                    top: e.clientY-10,
                    width: 0,
                    height: 0
                },
                speed: 0.4,
                vertex_Rtop: 10,
                onEnd: function(){
                    this.destory();
                }
            });
            this.destory();
        }
    });
}

function doeditqa(obj,ee){
    $("#edit_content_question").val("");
    $("#edit_content_answer").val("");
    var textt = obj.parent().prev().find('p:eq(0)').text();
    var q = textt;
    q = parseQa(textt)[0];
    var a = parseQa(textt)[1];
    $("#edit_content_question").val(q);
    $("#edit_content_answer").val(a);
    $( "#dialog-confirm" ).dialog({
        resizable: false,
        height:'auto',
        width: 850,
        modal: true,
        open : function(){
            $("#dialog-confirm").parent().find(".ui-dialog-titlebar").css({"background-color":"#194A95","color":"#FFFFFF"});
            $("#dialog-confirm").parent().find(".ui-dialog-buttonset button").removeClass();
            $("#dialog-confirm").parent().find(".ui-dialog-buttonset button").addClass('confirm-button');
            $("#dialog-confirm").parent().find(".ui-dialog-buttonset button").css({"font-size":"17.5px","border-radius":"6px",
                "box-shadow":"0px 0px 0px #888888"});
            $("#dialog-confirm").parent().css('left',($(window).width()-850)/2);
            try {
                $("#dialog-confirm").parent().draggable("destroy");
            } catch (e) {
            }
            $("#dialog-confirm").parent().find('.ui-dialog-titlebar').css('cursor','auto').removeClass('hover');
            $("#dialog-confirm").parent().find('.ui-dialog-title').css('cursor','auto').removeClass('hover');
        },
        buttons: {
            Save: function(e) {
                $(obj.parent().prev().find('p')[0]).text(generateQaPContent($("#edit_content_question").val(),$("#edit_content_answer").val()));
                $(obj.parent().prev().find('div:eq(0)')).html(generateQaInnerHtml($("#edit_content_question").val(), $("#edit_content_answer").val()));
                if($(obj.parent().prev().find('p')[0]).text() != ""){
                    $(obj.parent().prev()).css({"max-width":"500px","background-color":"#CCCCCC"});
                    enableA(getAAddCause(obj.parent()));
                    enableA(getAClearTd(obj.parent()));
                    $('#qaaddicon').css({"height":"0px","width":"0px", "opacity":0});
                }else {
                    $(obj.parent().prev()).css({"max-width":"500px","background-color":"#FFFFFF"});
                    disableA(getAAddCause(obj.parent()));
                    disableA(getAClearTd(obj.parent()));
                }
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}
function parseQa(textt){
    if(textt == ""){
        return ["",""]
    }
    var q = textt;
    if(textt.indexOf('\r\n') == -1){
        textt = textt.replaceAll('\n','\r\n');
    }
    if(textt.indexOf('Question:')>-1){
        if(textt.indexOf('Question:\r\n') == -1){
            textt = textt.replaceAll('Question:','Question:\r\n');
        }
        if(textt.indexOf('\r\nQuestion:')==0){
            textt = textt.replaceAll('\r\nQuestion:','Question:');
        }
    }
    if(textt.indexOf('Answer:')>-1){
        if(textt.indexOf('Answer:\r\n')==-1){
            textt = textt.replaceAll('Answer:','Answer:\r\n');
        }
        if(textt.indexOf('\r\nAnswer:')==-1){
            textt = textt.replaceAll('Answer:','\r\nAnswer:');
        }
        if(textt.indexOf('\r\n\r\nAnswer:')==-1){
            textt = textt.replaceAll('Answer:','\r\nAnswer:');
        }
    }
    if(textt.indexOf('Question:')==0){
        if(textt.indexOf('\r\nAnswer:\r\n')>0 ){
            q = textt.substring(textt.indexOf('\r\n')+2,textt.indexOf('\r\nAnswer:\r\n'));
        }
        if(textt.indexOf('\r\n\r\nAnswer:\r\n')>0 ){
            q = textt.substring(textt.indexOf('\r\n')+2,textt.indexOf('\r\n\r\nAnswer:\r\n'));
        }
        var a = "";
        if(textt.indexOf('\r\nAnswer:\r\n')>0 ){
            a = textt.substring(textt.indexOf('\r\nAnswer:\r\n')+11);
        }
    }else{
        if(textt.indexOf('\r\nAnswer:\r\n')>0 ){
            q = textt.substring(0,textt.indexOf('\r\nAnswer:\r\n')).replaceAll('Question:','');
        }
        if(textt.indexOf('\r\n\r\nAnswer:\r\n')>0 ){
            q = textt.substring(0,textt.indexOf('\r\n\r\nAnswer:\r\n')).replaceAll('Question:','');
        }
        var a = "";
        if(textt.indexOf('\r\nAnswer:\r\n')>0 ){
            a = textt.substring(textt.indexOf('\r\nAnswer:\r\n')+11);
        }
    }
    return [q,a];
}
function generateQaPContent(q, a){
    if(q == "" && a == ""){
        return "";
    }
    return "Question:\r\n"+q+"\r\n\r\nAnswer:\r\n"+a;
}
function generateQaInnerHtml(q, a){
    if(q == "" && a == ""){
        return "";
    }
    var question = "<div style=\"border-bottom:1px solid #FFFFFF;background-color:#CCCCCC\">" +
        '<div style="background-color:#194A95;color:#FFFFFF;font-size: 16px;margin: -1px 0px 0px -1px; width: auto;border-radius:0px 0px 12px 0px;height: 30px;float:left;top:0px;text-align: left;">' +
        '<p style="color:#ffffff;display:inline;margin: 1px 72px 0px -2px;top: 15%;position: relative;font-size: 11px;">QUESTION</p>' +
        //'<p class="iconfont" style="margin: 0px 0px 0px 11px;padding: 8px 16px 8px 13px;font-size: 14px;width: 30%;color:#194A95;display:inline;background-color: yellow;border-radius:0px 0px 10px 0px;height: 100%;top: 13%;position: relative;">'+questionicon+'</p>' +
        '</div>' +
        '<div style="background-color: #CCCCCC;display:inline-block;width:100%;"><p style="padding:0px 0px 0px 0px;">'+q+'</p></div>'+
        '</div>';
    var answer = '<div style=\"background-color:#CCCCCC\">' +
        '<div style="background-color:#194A95;color:#FFFFFF;font-size: 16px;width: auto;border-radius:0px 0px 12px 0px;height: 30px;float:left;top:0px;text-align: left;">' +
        '<p style="color:#ffffff;display:inline;margin: 1px 83px 0px -2px;top: 15%;position: relative;font-size: 11px;">ANSWER</p>' +
        //'<p class="iconfont" style="margin: 0px 0px 0px 11px;padding: 8px 14px 7.5px 13px;font-size: 16px;width: 30%;color:#194A95;display:inline;background-color: yellow;border-radius:0px 0px 10px 0px;height: 100%;top: 13%;position: relative;">'+answericon+'</p>' +
        '</div>' +
        '<div style="background-color: #CCCCCC;display:inline-block;width:100%;"><p style="width: 100%;padding: 0px 1px 0px 0px;">'+a+'</p></div>' +
        '</div>';
    //TODO html special char
    return question + answer;
}

function doeditcause(obj,ee){
    $("#edit_content_cause").val("");
    var textt = obj.parent().find('p').text();
    var q = textt;
    $("#edit_content_cause").val(q);
    $( "#dialog-confirm-cause" ).dialog({
        resizable: false,
        height:'auto',
        width: 600,
        modal: true,
        open : function(){
            $("#dialog-confirm-cause").parent().find(".ui-dialog-titlebar").css({"background-color":"#194A95","color":"#FFFFFF"});
            $("#dialog-confirm-cause").parent().find(".ui-dialog-buttonset button").removeClass();
            $("#dialog-confirm-cause").parent().find(".ui-dialog-buttonset button").addClass('confirm-button');
            $("#dialog-confirm-cause").parent().find(".ui-dialog-buttonset button").css({"font-size":"17.5px","border-radius":"6px",
                "box-shadow":"0px 0px 0px #888888"});
            $("#dialog-confirm-cause").parent().css('left',($(window).width()-600)/2);
            try {
                $("#dialog-confirm-cause").parent().draggable("destroy");
            } catch (e) {
            }
            $("#dialog-confirm-cause").parent().find('.ui-dialog-titlebar').css('cursor','auto').removeClass('hover');
            $("#dialog-confirm-cause").parent().find('.ui-dialog-title').css('cursor','auto').removeClass('hover');
            var td = obj.parent().parent().parent().find('tr:eq(0)').find('th:eq(6)');
            if(td.text().indexOf('Root') > -1){
                $("#dialog-confirm-cause").parent().find('.ui-dialog-title').text('Root Cause')
            }else {
                $("#dialog-confirm-cause").parent().find('.ui-dialog-title').text('Escape Cause');
            }
        },
        buttons: {
            Save: function(e) {
                $(obj.parent().find('p')[0]).text($("#edit_content_cause").val() );
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}

function doeditpanel(obj, ee){
    var thrca=['Action Proposal', 'Root Cause Category', 'Root Cause Subcategory', 'RCA Action Type', 'Assigned To','RCA AI ID', 'Completion Target Date'];
    var theda=['Action Proposal', 'Escape Cause Category', 'Escape Cause Subcategory', 'EDA Action Type', 'Assigned To','RCA AI ID', 'Completion Target Date'];
    var theda1=['Action Proposal', 'Escape Cause Category', 'Escape Cause Subcategory', 'EDA Action Type', 'Assigned To','RCA AI ID',  'Completion Target Date','Where Could Defect Have Been Detected'];
    var th = [];

    var s1list = [];
    var s2list = [];
    var s3list = [];
    var s4list = [];

    if(relframeid == 'edaradio2' || relframeid == 'edaradio3') {
        //$("#WhereCouldDefectHaveBeenDetectedTr").show();
        th = theda1;
        s1list = eDAValuesOps;
        s2list = eDASubValuesOps;
        s3list = eDAImprovementActionsOps;
        s4list = wherecouldDefecthaveBeenDetectedOps;
    }else {
        $('#dialog-confirm-panel').find('tr:gt(6)').each(function(){
           $(this).hide();
        });
        if(relframeid == 'edaradio1'){
            th = theda;
            s1list = eDAValuesOps;
            s2list = eDASubValuesOps;
            s3list = eDAImprovementActionsOps;
        }else if(relframeid == 'tab-radio-2'){
            th = thrca;
            s1list = rCAValuesOps;
            s2list = rCASubValuesOps;
            s3list = rCAImprovementActionsOps;
        }
    }
    var select1 = $('#dialog-confirm-panel tr').eq(1).find('td').eq(1).find('select');
    var select2 = $('#dialog-confirm-panel tr').eq(2).find('td').eq(1).find('select');
    var select3 = $('#dialog-confirm-panel tr').eq(3).find('td').eq(1).find('select');
    var select4 = $('#dialog-confirm-panel tr').eq(7).find('td').eq(1).find('select');
    select1.empty();select2.empty();select3.empty();
    fillSelect(select1, s1list);
    select1.on('change',function(){
        fillSelect(select2, findsubops(s2list,select1.val()));
    });
    fillSelect(select3, s3list);
    fillSelect(select4, s4list);
    for (var i=0;i<th.length;i++){
        $('#dialog-confirm-panel tr').eq(i).find('td').eq(0).html('<font style="font-weight: bold">' + th[i] + "</font>:");
        var pele = obj.parent().parent().find('td').eq(12+i).find('p');
        if(['Escape Cause Category','Escape Cause Subcategory','EDA Action Type','Root Cause Category','Root Cause Subcategory', 'RCA Action Type','Where Could Defect Have Been Detected'].indexOf(th[i])>-1){
            var ele = $('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("select");
            ele.val(pele.attr("dm"));
            if(i == 1){
                ele.change();
            }
        }else if(['Assigned To', 'RCA AI ID', 'Completion Target Date'].indexOf(th[i])>-1){
            $('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("input").val(pele.text());
        }else if(['Action Proposal'].indexOf(th[i])>-1){
            $('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("textarea").val(pele.text());
        }
    }

    $( "#dialog-confirm-panel" ).dialog({
        resizable: false,
        height: 'auto', //(relframeid == 'edaradio2' || relframeid == 'edaradio3') ? 700 : 650,
        width: 850,
        modal: true,
        open : function(){
            $("#dialog-confirm-panel").parent().find(".ui-dialog-titlebar").css({"background-color":"#194A95","color":"#FFFFFF"});
            $("#dialog-confirm-panel").parent().find(".ui-dialog-buttonset button").removeClass();
            $("#dialog-confirm-panel").parent().find(".ui-dialog-buttonset button").addClass('confirm-button');
            $("#dialog-confirm-panel").parent().find(".ui-dialog-buttonset button").css({"font-size":"17.5px","border-radius":"6px",
                "box-shadow":"0px 0px 0px #888888"});
            $("#dialog-confirm-panel").parent().css('left',($(window).width()-850)/2);
            $("#J_date_4").datepicker({
                dateFormat: "yy-mm-dd"
            });
            if(relframeid == 'edaradio2' || relframeid == 'edaradio3'){
                $("#dialog-confirm-panel").find('tr:eq(0)').find('td:eq(0)').css({'width':'30%'});
                $("#dialog-confirm-panel").find('tr:eq(0)').find('td:eq(1)').css({'width':'70%'});
            }else {
                $("#dialog-confirm-panel").find('tr:eq(0)').find('td:eq(0)').css({'width':'25%'});
                $("#dialog-confirm-panel").find('tr:eq(0)').find('td:eq(1)').css({'width':'75%'});
            }
            $("#dialog-confirm-panel").parent().find('.ui-dialog-titlebar').css('cursor','auto').removeClass('hover');
            $("#dialog-confirm-panel").parent().find('.ui-dialog-title').css('cursor','auto').removeClass('hover');
            try {
                $("#dialog-confirm-panel").parent().draggable("destroy");
            } catch (e) {
            }
            $("#dialog-confirm-panel").parent().find('.ui-dialog-buttonset').append('<button type="button" class="confirm-button" role="button" aria-disabled="false" style="font-size: 17.5px; border-radius: 6px; box-shadow: rgb(136, 136, 136) 0px 0px 0px;" id="ClearBtn"><span class="ui-button-text">Delete</span></button>');
            $("#ClearBtn").click(function(){
                for (var i=0;i<th.length;i++){
                    var pele = obj.parent().parent().find('td').eq(12+i).find('p');
                    if(['Escape Cause Category','Escape Cause Subcategory','EDA Action Type','Root Cause Category','Root Cause Subcategory', 'RCA Action Type','Where Could Defect Have Been Detected'].indexOf(th[i])>-1){
                        var ele = $('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("select");
                        ele.val("");
                        if(i == 1){
                            ele.change();
                        }
                    }else if(['Assigned To', 'RCA AI ID', 'Completion Target Date'].indexOf(th[i])>-1){
                        $('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("input").val("");
                    }else if(['Action Proposal'].indexOf(th[i])>-1){
                        $('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("textarea").val("");
                    }
                }
                $('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("textarea").val("");
            });
            $("#ClearBtn").hover(function(){
                $(this).css({'background-color':'#cccccc','color':'#000000'});
            },function(){
                $(this).css({'background-color':'#006DCC','color':'#FFFFFF'});
            });
            //$("#ClearBtn").hide();
        },
        buttons: {
            Save: function(e) {
                var asssignto = $('#dialog-confirm-panel tr').eq(4).find('td').eq(1).find("input").val();
                if(asssignto != '' && asssignto.indexOf('@') < 0){
                    alert('Assigned to must write email.');
                    return;
                }
                for (var i=0;i<th.length;i++){
                    var pele = obj.parent().prev().parent().find('td').eq(12+i).find('p');
                    if(['Escape Cause Category','Escape Cause Subcategory','EDA Action Type','Root Cause Category', 'Root Cause Subcategory', 'RCA Action Type','Where Could Defect Have Been Detected'].indexOf(th[i])>-1){
                        var ele = $('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("select");
                        pele.text(ele.find("option:selected").text());
                        pele.attr("dm",ele.find("option:selected").val());
                    } else if(['Assigned To', 'RCA AI ID', 'Completion Target Date'].indexOf(th[i])>-1){
                        pele.text($('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("input").val());
                    } else if(['Assigned To', 'RCA AI ID', 'Completion Target Date'].indexOf(th[i])>-1){
                        pele.text($('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("input").val());
                    } else {
                        pele.text($('#dialog-confirm-panel tr').eq(i).find('td').eq(1).find("textarea").val());
                    }
                }
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}

function doeditdetected(obj, ee){
    $( "#dialog-confirm-detected" ).dialog({
        resizable: false,
        height: 'auto', //(relframeid == 'edaradio2' || relframeid == 'edaradio3') ? 700 : 650,
        width: 850,
        modal: true,
        open : function(){
            var ele = $('#dialog-confirm-detected tr').eq(0).find('td').eq(1).find('select');
            fillSelect(ele, wherecouldDefecthaveBeenDetectedOps);
            var pele = obj.parent().parent().find('td').eq(18).find('p');
            ele.val(pele.attr("dm"));
            $("#dialog-confirm-detected").parent().find(".ui-dialog-titlebar").css({"background-color":"#194A95","color":"#FFFFFF"});
            $("#dialog-confirm-detected").parent().find(".ui-dialog-buttonset button").removeClass();
            $("#dialog-confirm-detected").parent().find(".ui-dialog-buttonset button").addClass('confirm-button');
            $("#dialog-confirm-detected").parent().find(".ui-dialog-buttonset button").css({"font-size":"17.5px","border-radius":"6px",
                "box-shadow":"0px 0px 0px #888888"});
            $("#dialog-confirm-detected").parent().css('left',($(window).width()-850)/2);
            $("#dialog-confirm-detected").find('tr:eq(0)').find('td:eq(0)').css({'width':'40%'});
            $("#dialog-confirm-detected").find('tr:eq(0)').find('td:eq(1)').css({'width':'60%'});
            $("#dialog-confirm-detected").parent().find('.ui-dialog-titlebar').css('cursor','auto').removeClass('hover');
            $("#dialog-confirm-detected").parent().find('.ui-dialog-title').css('cursor','auto').removeClass('hover');
            try {
                $("#dialog-confirm-detected").parent().draggable("destroy");
            } catch (e) {
            }
        },
        buttons: {
            Save: function(e) {
                var pele = obj.parent().parent().find('td').eq(18).find('p');
                var ele = $('#dialog-confirm-detected tr').eq(0).find('td').eq(1).find("select");
                pele.text(ele.find("option:selected").text());
                pele.attr("dm",ele.find("option:selected").val());
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}

function findsubops(selectops, val){
    var subarr = [];
    for(var i = 0;i < selectops.length;i++){
        if(selectops[i]["p_dm"] == val){
            subarr.push(selectops[i]);
        }
    }
    return subarr;
}

function filterSelect(alist, type, ptype){
    var newlist = [];
    if(type != "" && type != null){
        for(var i=0;i<alist.length;i++){
            if(alist[i]["type_id"] == type){
                newlist.push(alist[i]);
            }
        }
    }else if(ptype){
        for(var i=0;i<alist.length;i++){
            if(alist[i]["p_type_id"] == ptype){
                newlist.push(alist[i]);
            }
        }
    }
    return newlist;
}

function loadSelect(dmtype, ptype){
    var selectparam = {"type":dmtype, "ptype":ptype};
    var rstobj = [];
    $.ajax({
        type: 'POST',
        url: "/prontoweb/ajax_select",
        async: false,
        data: {
            'csrfmiddlewaretoken': '{{ csrf_token }}',
            'ajaxselectparam':JSON.stringify(selectparam)
        },
        success: function (data) {
            rstobj = data;
        }
    });
    return rstobj;
}

function fillSelect(selectobj, selectops){
    selectobj.empty();
    selectobj.append($("<option>").val("").text(""));
    $.each(selectops, function(index){
        selectobj.append($("<option>").val(selectops[index].dm).text(selectops[index].csz));
    });
}


var rootcols = ["why1", "why2", "why3", "why4", "why5", "rootcause", "actionproposal", "root_cause_category", "root_cause_subcategory", "rca_action_type", "assigned_to","ap_jiratask_id", "completion_target_date","","grading"];
var escapcols = ["why1","why2","why3","why4","why5","escape_cause","actionproposal","escape_cause_category","escape_cause_subcategory","eda_action_type","assigned_to","ap_jiratask_id", "completion_target_date","where_could_defect_have_been_detected","grading"];
function initForm(json){
    for(var key in json){
        if(key == "rcaformbase"){
            for(var kj in json[key]){
                try{
                    if($("#"+kj)[0]['type'] == 'select-one'){
                        $("#"+kj).val(json[key][kj]["dm"]);
                    }else {
                        $("#"+kj).val(json[key][kj]);
                    }
                }catch(e){

                }
            }
            pr_grade_dm = json[key]["pr_grade"] ? json[key]["pr_grade"]["dm"] : '-1';
        }else if(key == "rcaformrootcause"){
            for(var kj in json[key]){
                var tridx = 0;
                for(var km in json[key][kj]){
                    var kmidx = 0;
                    var firstsel = true;
                    for(var rcs in rootcols){
                        try{
                            if(rcs == ''){
                                kmidx++;
                                continue;
                            }
                            var curobj = $("[groupid="+kj+"]:eq("+tridx+")").find("[groupid=lindobj]:eq("+kmidx+")");
                            var curobjtype = checkTdInnerCellType(curobj);
                            if(curobjtype == 'select') {
                                var curobjsel = $(curobj).find(curobjtype);
                                if ($(curobjsel) && $(curobjsel)[0] && $(curobjsel)[0]['type'] == 'select-one') {
                                    curobjsel.val(json[key][kj][km][rootcols[rcs]]["dm"]);
                                    if (firstsel) {
                                        curobjsel.change();
                                        firstsel = false;
                                    }
                                }
                            } else if(curobjtype == 'textarea'){
                                var curobjtextarea = $(curobj).find(curobjtype);
                                curobjtextarea.val(json[key][kj][km][rootcols[rcs]]);
                            } else if(curobjtype == 'p'){
                                var curobjtextarea = $(curobj).find(curobjtype+':eq(0)');
                                if(typeof(json[key][kj][km][rootcols[rcs]]) == "object"){
                                    curobjtextarea.text(json[key][kj][km][rootcols[rcs]]["text"]);
                                    curobjtextarea.attr("dm", json[key][kj][km][rootcols[rcs]]["dm"]);
                                }else {
                                    curobjtextarea.text(json[key][kj][km][rootcols[rcs]]);
                                }
                                if(["why1", "why2", "why3", "why4", "why5"].indexOf(rootcols[rcs]) >= 0){
                                    var qa = parseQa(curobjtextarea.text());
                                    if(curobjtextarea.text().indexOf('Question:')>0){
                                        curobjtextarea.text('Question:\r\n'+qa[0]+'\r\nAnswer:\r\n'+qa[1]);
                                        qa = parseQa(curobjtextarea.text());
                                    }
                                    var innerHtml = generateQaInnerHtml(qa[0], qa[1]);
                                    if(innerHtml != ""){
                                        curobj.find("div:eq(0)").html(innerHtml);
                                        curobj.css({"max-width":"500px","background-color":"#CCCCCC"});
                                    }
                                }
                            }
                            kmidx++;
                        }catch (e){
                            //var a = 0;
                        }
                    }
                    var trobj = $("[groupid="+kj+"]:eq("+tridx+")");
                    trobj.attr("why_id",json[key][kj][km]["why_id"]);
                    trobj.attr("ap_id",json[key][kj][km]["ap_id"]);
                    tridx++;
                }
            }
        }else if(key == "rcaformescapedefect"){
            for(var kj in json[key]){
                var tridx = 0;
                for(var km in json[key][kj]){
                    var kmidx = 0;
                    var firstsel = true;
                    for(var rcs in escapcols){
                        try{
                            if(rcs == ''){
                                kmidx++;
                                continue;
                            }
                            var curobj = $("[groupid="+kj+"]:eq("+tridx+")").find("[groupid=lindobj]:eq("+kmidx+")");
                            var curobjtype = checkTdInnerCellType(curobj);
                            if(curobjtype == 'select'){
                                var curobjsel = $(curobj).find(curobjtype);
                                if($(curobjsel) && $(curobjsel)[0] && $(curobjsel)[0]['type'] == 'select-one'){
                                    curobjsel.val(json[key][kj][km][escapcols[rcs]]["dm"]);
                                    if(firstsel){
                                        curobjsel.change();
                                        firstsel = false;
                                    }
                                }
                            } else if(curobjtype == 'textarea'){
                                var curobjtextarea = $(curobj).find(curobjtype);
                                curobjtextarea.val(json[key][kj][km][escapcols[rcs]]);
                            } else if(curobjtype == 'p'){
                                var curobjtextarea = $(curobj).find(curobjtype+':eq(0)');
                                if(typeof(json[key][kj][km][escapcols[rcs]]) == "object"){
                                    curobjtextarea.text(json[key][kj][km][escapcols[rcs]]["text"]);
                                    curobjtextarea.attr("dm", json[key][kj][km][escapcols[rcs]]["dm"]);
                                }else {
                                    curobjtextarea.text(json[key][kj][km][escapcols[rcs]]);
                                }
                                if(["why1", "why2", "why3", "why4", "why5"].indexOf(escapcols[rcs]) >= 0){
                                    var qa = parseQa(curobjtextarea.text());
                                    if(curobjtextarea.text().indexOf('Question:')>0){
                                        curobjtextarea.text('Question:\r\n'+qa[0]+'\r\nAnswer:\r\n'+qa[1]);
                                        qa = parseQa(curobjtextarea.text());
                                    }
                                    var innerHtml = generateQaInnerHtml(qa[0], qa[1]);
                                    if(innerHtml != ""){
                                        curobj.find("div:eq(0)").html(innerHtml);
                                        curobj.css({"max-width":"500px","background-color":"#CCCCCC"});
                                    }
                                }
                            }
                            kmidx++;
                        }catch (e){
                            //var a = 0;
                        }
                    }
                    var trobj = $("[groupid="+kj+"]:eq("+tridx+")");
                    trobj.attr("why_id",json[key][kj][km]["why_id"]);
                    trobj.attr("ap_id",json[key][kj][km]["ap_id"]);
                    tridx++;
                }
            }
        }
　　}
}

function closeprocess(){
    $("#mask").hide();
}
function showprocess(sec){
 $("#mask").show();
    var pro=0;
    var update=setInterval(function(){
        pro += 1;
        $("#info").text("process："+pro+"%");
        $("#child").width(pro+"%");
        if(pro == 99){
            clearInterval(update);
        }
    },(sec*1000)/100);
}
function dosave(type){
    disabledAllBtn(true);
    showloading('', $("#SubmitToJira").offset().top-300);
    var formjson = {};
    try{
        formjson = makeformjson();
    }catch (e){
        alert(e);
        return;
    }
    var vacttype = $("#acttype").val();
    if (vacttype == "modify" || formjson["pronto_id"] == ''){
        formjson["pronto_id"] = rcaform_pronto_id;
    }
    // if(!emailValidate(formjson)){
    //     alert('Please check the correctness of email. ');
    //     return ;
    // }
    // alert('error.pass by .')
    hearttoken = sys_guid();
    $.ajax({
        type: 'POST',
        url: type == 'dev' ? "/prontoweb/prontoweb_add_todb_only" : "/prontoweb/prontoweb_add_todb",
        timeout : 15000,
        data: {
            'comname': 'test submit',
            'csrfmiddlewaretoken': '{{ csrf_token }}',
            'formjsonparam':JSON.stringify(formjson),
            'PRID':rcaform_pronto_id,
            'acttype' : vacttype,
            'btntype' : type == 'SubmitToJira' ? 'SubmitToJira' : 'RcaFactsGetFilled',
            'jiraissuetype' : jiraissuetype,
            'jiraissueid' : jiraissueid,
            "hearttoken" :hearttoken
        },
        success: function (data) {
            if(data && data["result"] == 'success'){
                if(type == 'SubmitToJira'){
                    alert('Success save.');
                }else if(type == 'RcaFactsGetFilled'){
                    alert('Success save, The system is creating jiratask in the background.');
                }
            } else if(data) {
                alert("Error.An error occurred, please contact the administrator. " + data["mes"]);
            }
            hideloading();
            disabledAllBtn(false);
        },
        complete : function(XMLHttpRequest,status){
           if(status=='timeout'){
               hideloading();
               disabledAllBtn(false);
           }else if(status=='error'){
               alert(status);
           }
           hideloading();
           disabledAllBtn(false);
        }
    });
}

$("#SubmitToJira-DEV").click(function(){
    dosave('dev');
});

$("#SubmitToJira").click(function(){
    dosave('SubmitToJira');
});

$("#RcaFactsGetFilled").click(function(){
    dosave('RcaFactsGetFilled');
});

$("#VersionHistory").click(function(){
    $("#versionhistorydiv").show();
});

$("#CreateJiraSubTaskForAp").click(function(){
    var rst = confirm('Confirm to Create AP?' );
    if(!rst){
        return;
    }
    disabledAllBtn(true);
    showloading('', $("#SubmitToJira").offset().top-300);
    var formjson = {};
    try{
        formjson = makeformjson();
    }catch (e){
        alert(e);
        return;
    }
    var vacttype = $("#acttype").val();
    if (vacttype == "modify" || formjson["pronto_id"] == ''){
        formjson["pronto_id"] = rcaform_pronto_id;
    }
    hearttoken = sys_guid();
    $.ajax({
        type: 'POST',
        url: "/prontoweb/CreateApFromSharePoint5WhyExcel",
        timeout : 15000,
        data: {
            'comname': 'test submit',
            'csrfmiddlewaretoken': '{{ csrf_token }}',
            'formjsonparam':JSON.stringify(formjson),
            'PRID':rcaform_pronto_id,
            'acttype' : vacttype,
            'jiraissuetype' : jiraissuetype,
            'jiraissueid' : jiraissueid,
            "hearttoken" :hearttoken
        },
        success: function (data) {
            if(data && data["result"] == 'success'){
                alert('Save Success, The System is creating AP in the background.')
            } else if(data){
                alert("Error.An error occurred, please contact the administrator");   // + data["mes"]
            }
            hideloading();
            $("#SubmitToJira").attr("disabled",false);
        },
        complete : function(XMLHttpRequest,status){
           if(status=='timeout'){
               hideloading();
               $("#SubmitToJira").attr("disabled",false);
           }else if(status=='error'){
               alert(status);
           }
           hideloading();
           disabledAllBtn(false);
        }
    });
});

$("#CreateJiraSubTaskForApFromSharePointExcel").click(function(){
    $("#CreateJiraSubTaskForAp").click();
});

function emailValidate(formjson){
    var emailList = []
    var passFlag = true;
    $.ajax({
        type: 'POST',
        async: false,
        url: "emailvalidate",
        data: {
            'comname': 'email validate',
            'csrfmiddlewaretoken': '{{ csrf_token }}',
            'emailList':JSON.stringify(emailList)
        },
        success: function (data) {
            if(data["result"] == 'success'){
                if (data['validaterst'] != 'true'){
                    alert('Email validate fail, ' + data['validaterst']);
                    passFlag = false;
                }
            } else {
                alert("Email validate error." + data["mes"]);
                passFlag = false;
            }
        }
    });
    return passFlag;
}

function disabledAllBtn(flag){
    if(flag){
        $("#SubmitToJira").attr("disabled",true);
        $("#RcaFactsGetFilled").attr("disabled",true);
        $("#CreateJiraSubTaskForAp").attr("disabled",true);
        $("#CreateJiraSubTaskForApFromSharePointExcel").attr("disabled",true);
        $("#CloseBtn").attr("disabled",true);
    }else {
        $("#SubmitToJira").attr("disabled",false);
        $("#RcaFactsGetFilled").attr("disabled",false);
        $("#CreateJiraSubTaskForAp").attr("disabled",false);
        $("#CreateJiraSubTaskForApFromSharePointExcel").attr("disabled",false);
        $("#CloseBtn").attr("disabled",false);
    }
}

$("#f_top").click(function(){
    $("html,body").animate({scrollTop:'0px'},300);
});

$("#f_rca").click(function(){
    $("html,body").animate({scrollTop:$("#RCADiv").position().top-60},500);
});

$("#f_bottom").click(function(){
    $("html,body").animate({scrollTop:bottomTop},500);
});

$('#RcaScrollFooter').scroll(function(){
    try{
        $("#RCADiv").scrollLeft($('#RcaScrollFooter').scrollLeft());
        $("#EDADiv").scrollLeft($('#RcaScrollFooter').scrollLeft());
        $("#EDADiv2").scrollLeft($('#RcaScrollFooter').scrollLeft());
        $("#EDADiv3").scrollLeft($('#RcaScrollFooter').scrollLeft());
    }catch (e){
        alert(e)
    }
});

$('#SummaryScrollFooter').scroll(function(){
    try{
        $("#summarydiv").scrollLeft($('#SummaryScrollFooter').scrollLeft());
    }catch (e){
        alert(e)
    }
});

function makeformjson(){
    var rcaformobj = {
    "pronto_id" : rcaform_pronto_id ? rcaform_pronto_id : "",
    "username" : $("#usernamehidden").val(),
    "rcaformbase": {
        "case_number": $("#case_number")[0].value,
        "product": $("#product")[0].value,
        "abstract_headline": $("#abstract_headline")[0].value,
        "assessors": $("#assessors")[0].value,
        "quality_reviewer": $("#quality_reviewer")[0].value,
        "issue_description": $("#issue_description")[0].value,
        "triggering_scenario": $("#triggering_scenario")[0].value,
        "triggering_scenario_category": {"dm":$("#triggering_scenario_category").find("option:selected").val(),
                                         "text":$("#triggering_scenario_category").find("option:selected").text()},
        "code_deficience": $("#code_deficience")[0].value,
        "correction_description": $("#correction_description")[0].value,
        "injection_type": {"dm":$("#injection_type").find("option:selected").val(),
                           "text":$("#injection_type").find("option:selected").text()},
        "injection_time": $("#injection_time")[0].value,
        "additional_facts": $("#additional_facts")[0].value,
        "inheritance_recommendation": $("#inheritance_recommendation")[0].value,
        "how_many_times": $("#how_many_times")[0].value,
        "pr_grade": {"dm":$("#pr_grade").find("option:selected").val(),
                     "text":$("#pr_grade").find("option:selected").text()}
    }};
    var rcaformrootcause={};
    rcaformobj["rcaformrootcause"] = {};
    rcaformobj["rcaformrootcause"]["why_was_the_fault_introduced"] = generatorLine("why_was_the_fault_introduced",rootcols);
    rcaformobj["rcaformrootcause"]["why_root_cause_was_not_found"] = generatorLine("why_root_cause_was_not_found",rootcols);
    rcaformobj["rcaformrootcause"]["why_correction_took_longer_than_fct_target"] = generatorLine("why_correction_took_longer_than_fct_target",rootcols);

    var rcaformescapedefect={};
    rcaformobj["rcaformescapedefect"] = {};
    rcaformobj["rcaformescapedefect"]["why_not_requirements_review"] = generatorLine("why_not_requirements_review",escapcols);
    rcaformobj["rcaformescapedefect"]["why_not_design_review"] = generatorLine("why_not_design_review",escapcols);
    rcaformobj["rcaformescapedefect"]["why_not_analysis_tools"] = generatorLine("why_not_analysis_tools",escapcols);
    rcaformobj["rcaformescapedefect"]["why_not_inspections"] = generatorLine("why_not_inspections",escapcols);
    rcaformobj["rcaformescapedefect"]["why_not_component_test"] = generatorLine("why_not_component_test",escapcols);
    rcaformobj["rcaformescapedefect"]["why_not_entity_test"] = generatorLine("why_not_entity_test",escapcols);
    //rcaformobj["rcaformescapedefect"]["why_not_et_auto"] = generatorLine("why_not_et_auto",escapcols);
    rcaformobj["rcaformescapedefect"]["why_not_system_test"] = generatorLine("why_not_system_test",escapcols);
    //rcaformobj["rcaformescapedefect"]["why_not_st_auto"] = generatorLine("why_not_st_auto",escapcols);
    rcaformobj["rcaformescapedefect"]["why_customer_opened_a_ticket_on_a_known_defect"] = generatorLine("why_customer_opened_a_ticket_on_a_known_defect",escapcols);
    return rcaformobj;
}

function checkTdInnerCellType(obj){
    var textareacellobjlist = $(obj).find("textarea");
    if(textareacellobjlist.length > 0 ){
        return "textarea";
    }

    var selectcellobjlist = $(obj).find("select");
    if(selectcellobjlist.length > 0 ){
        return "select";
    }

    var pcellobjlist = $(obj).find("p");
    if(pcellobjlist.length > 0 ){
        return "p";
    }
    return "other";
}

function generatorLine(objtrgroupdid, colstemp){
    var lineArr = [];
    var objtr = $("[groupid="+objtrgroupdid+"]");
    for(var i=0;i<objtr.length;i++){
        var trobj = objtr[i];
        var lineObj = {};
        var linobjlist = $(trobj).find("[groupid=lindobj]");
        for(var j=0;j<linobjlist.length;j++){
            if(colstemp[j] == ""){
                continue;
            }
            var objtype = checkTdInnerCellType(linobjlist[j]);
            if(objtype =='textarea'){
                var textareacellobjlist = $(linobjlist[j]).find(objtype);
                lineObj[colstemp[j]]= textareacellobjlist[0].value;
            }else if(objtype == 'select'){
                var cellobj = $(linobjlist[j]).find(objtype)[0];
                lineObj[colstemp[j]]= {"dm":$(cellobj).find("option:selected").val(),
                                       "text":$(cellobj).find("option:selected").text()};
            }else if(objtype == 'p'){
                var pcellobjlist = $(linobjlist[j]).find(objtype+":eq(0)");
                if(pcellobjlist.attr("dm") != "" && pcellobjlist.attr("dm") != undefined){
                    lineObj[colstemp[j]]= {"dm":pcellobjlist.attr("dm"),
                                       "text":pcellobjlist.text()};
                }else {
                    lineObj[colstemp[j]]= pcellobjlist.text();
                }
            }else {
                lineObj[colstemp[j]]= '';
            }
        }
        lineObj['why_id'] = $(trobj).attr('why_id') ? $(trobj).attr('why_id') : "why"+sys_guid();
        lineObj['ap_id'] = $(trobj).attr('ap_id') ? $(trobj).attr('ap_id') : "ap"+sys_guid();
        if (!$(trobj).attr('why_id')){
            $(trobj).attr('why_id',lineObj['why_id'] );
        }
        if (!$(trobj).attr('ap_id')){
            $(trobj).attr('ap_id',lineObj['ap_id'] );
        }
        lineArr.push(lineObj);
    }
    return lineArr;
}
function sys_guid(){
    return Math.round(Math.random()*9999999999);
}
$("#copyurla").click(function(e){
    copyurl(e)
});

$("#CloseBtn").click(function(e){
    try{
        closePage();
    }catch (e){

    }
});

function encodeframeid(frameid){
    switch (frameid){
        case "tab-radio-1":
            return "facts";
        case "tab-radio-2":
            return "rca";
        case "tab-radio-3":
            return "eda";
        case "tab-radio-4":
            return "summary";
        case "edaradio1":
            return "eda";
        case "edaradio2":
            return "eda";
        case "edaradio3":
            return "eda";
        default:
            return "facts";
    }
}

function decodeframeid(frameid){
    switch (frameid){
        case "facts":
            return "tab-radio-1";
        case "rca":
            return "tab-radio-2";
        case "eda":
            return "edaradio1";
        case "summary":
            return "tab-radio-4";
        default:
            return "tab-radio-1";
    }

}

function copyurl(e){
    copyText('https://rca-shark.int.nokia.com/online5why/'+jiraissueid+'/'+encodeframeid(relframeid));
    var flyer = $('<p style="background-color: gray;color: #FFFFFF;font-size: 20px;">URL Copied.</p>');
    flyer.clone().fly({
        start: {
            left: e.clientX+20,
            top: e.clientY
        },
        end: {
            left: e.clientX+20,
            top: e.clientY-5
        },
        speed: 0.5,
        vertex_Rtop: 10,
        onEnd: function(){
            this.destory();
        }
    });
}
function copyText(text) {
    var textarea = document.createElement("textarea");
    var currentFocus = document.activeElement;
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.focus();
    if (textarea.setSelectionRange)
        textarea.setSelectionRange(0, textarea.value.length);
    else
        textarea.select();
    try {
        var flag = document.execCommand("copy");
    } catch(eo){
        var flag = false;
    }
    document.body.removeChild(textarea);
    currentFocus.focus();
    return flag;
}
$("#commentbtn").click(function(e){
    $("#dialog-confirm-comment" ).dialog({
        resizable: false,
        height:'auto',
        width: 760,
        modal: true,
        open : function(){
            $("#edit_content_comment").val("");
            $("#dialog-confirm-comment").parent().find(".ui-dialog-titlebar").css({"background-color":"#194A95","color":"#FFFFFF"});
            $("#dialog-confirm-comment").parent().find(".ui-dialog-buttonset button").removeClass();
            $("#dialog-confirm-comment").parent().find(".ui-dialog-buttonset button").addClass('confirm-button');
            $("#dialog-confirm-comment").parent().find(".ui-dialog-buttonset button").css({"font-size":"17.5px","border-radius":"6px",
                "box-shadow":"0px 0px 0px #888888"});
            $("#dialog-confirm-comment").parent().css('left',($(window).width()-600)/2);
            try {
                $("#dialog-confirm-comment").parent().draggable("destroy");
            } catch (e) {
            }
            $("#dialog-confirm-comment").parent().find('.ui-dialog-titlebar').css('cursor','auto').removeClass('hover');
            $("#dialog-confirm-comment").parent().find('.ui-dialog-title').css('cursor','auto').removeClass('hover');
            $("#dialog-confirm-comment").parent().find('.ui-dialog-title').text('Add a comment');
        },
        buttons: {
            Save: function(e) {
                showloading('', $("#commenticon").offset().top+($("#commentlist").find("ul").length*30));
                savecomment($("#edit_content_comment").val(),'');
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });
});
function savecomment(comment, commentid){
    $.ajax({
        type: 'POST',
        url: "/prontoweb_comment_add",
        data: {
            'comname': 'test submit',
            'csrfmiddlewaretoken': '{{ csrf_token }}',
            'PRID':rcaform_pronto_id,
            'prcommentid':commentid,
            'comment' : comment
        },
        success: function (data) {
            if(data["result"] == 'success'){
                initComment(rcaform_pronto_id);
            } else {
                alert("Error.An error occurred, please contact the administrator. ");
            }
            hideloading();
        }
    });
}
function deletecomment(commentid){
    var rst = confirm('Confirm to delete?');
    if(rst == true){
        showloading('', $("#commentoutdiv").offset().top+($("#commentlist").find("ul").length*40));
        $.ajax({
            type: 'POST',
            url: "/prontoweb_comment_delete",
            data: {
                'comname': 'test submit',
                'csrfmiddlewaretoken': '{{ csrf_token }}',
                'PRID':rcaform_pronto_id,
                'prcommentid':commentid
            },
            success: function (data) {
                if(data["result"] == 'success'){
                    initComment(rcaform_pronto_id);
                } else {
                    alert("Error.An error occurred, please contact the administrator. ");
                }
                hideloading();
            }
        });
    }
}
function initComment(prid){
    var selectops = loadData("select t.pronto_comment_id,t.pronto_id,t.comment,t.username,t.create_time from rca_pronto_comment t where t.pronto_id = '#param#' and t.yxbz= 'Y' order by create_time desc".replaceAll("#param#",prid));
    if(selectops){
        $("#commentlist").html("");
        for(var i=0;i<selectops.length;i++){
            var widthwin = $(window).width();
            $("#commentlist").append('<ul id="'+selectops[i]['csz0']+'"><li style="list-style-type: none;"><span class="iconfont" style="font-size: 14px;margin-right: 5px;background: #CCCCCC;">&#xe619;</span>'+selectops[i]['csz3']+'&nbsp;&nbsp;add a comment&nbsp;-&nbsp;'+selectops[i]['csz4']+'<a style="cursor: pointer;text-decoration: none;left: '+(widthwin-60)+'px;position: absolute;" title="Edit" href="javascript:void(0);" ><span class="iconfont">&#xe6bf;</span></a><a style="cursor: pointer;text-decoration: none;left: '+(widthwin-40)+'px;position: absolute;" title="Delete" href="javascript:void(0);"><span class="iconfont">&#xe70b;</span></a></li><li style="list-style-type:none;padding-left: 20px;white-space: break-spaces;">'+selectops[i]['csz2']+'</li></ul>');
        }
        $("#commentlist").find('ul').each(function(e){
            $(this).find('a:eq(0)').click(function(e){
                editcomment($(this).parent().parent().attr("id"), $(this).parent().parent().find('li:eq(1)').text());
            });
            $(this).find('a:eq(1)').click(function(e){
                deletecomment($(this).parent().parent().attr("id"));
            });
        });
    }
}
function editcomment(commentid, comment){
    $("#dialog-confirm-comment" ).dialog({
        resizable: false,
        height:'auto',
        width: 760,
        modal: true,
        open : function(){
            $("#edit_content_comment").val(comment);
            $("#dialog-confirm-comment").parent().find(".ui-dialog-titlebar").css({"background-color":"#194A95","color":"#FFFFFF"});
            $("#dialog-confirm-comment").parent().find(".ui-dialog-buttonset button").removeClass();
            $("#dialog-confirm-comment").parent().find(".ui-dialog-buttonset button").addClass('confirm-button');
            $("#dialog-confirm-comment").parent().find(".ui-dialog-buttonset button").css({"font-size":"17.5px","border-radius":"6px",
                "box-shadow":"0px 0px 0px #888888"});
            $("#dialog-confirm-comment").parent().css('left',($(window).width()-600)/2);
            try {
                $("#dialog-confirm-comment").parent().draggable("destroy");
            } catch (e) {
            }
            $("#dialog-confirm-comment").parent().find('.ui-dialog-titlebar').css('cursor','auto').removeClass('hover');
            $("#dialog-confirm-comment").parent().find('.ui-dialog-title').css('cursor','auto').removeClass('hover');
            $("#dialog-confirm-comment").parent().find('.ui-dialog-title').text('Edit a comment');
        },
        buttons: {
            Save: function(e) {
                showloading('', $("#commenticon").offset().top+($("#commentlist").find("ul").length*40));
                savecomment($("#edit_content_comment").val(),commentid);
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });
}
$("#gradingicon").click(function(){
    if($("#gradingDivselect").css("display") == "none"){
        $("#gradingDivselect").show(500);
    }else {
        $("#gradingDivselect").hide(500);
    }
});
$("#commenticon").click(function(){
    if($("#commentDiv").css("display") == "none"){
        $("#commentDiv").show(500);
    }else {
        $("#commentDiv").hide(500);
    }
});
$("#mainscrollicon").click(function(){
    if($("#onlinediv").css("display") == "none"){
        $("#onlinediv").show(500);
    }else {
        $("#onlinediv").hide(500);
    }
});

setInterval(function(){
    if(hearttoken){
        var mes = heartLiense(hearttoken);
        if(mes && mes["dm"]){
            alert(mes["dm"]);
            hearttoken = '';
        }else if(mes && mes["log4"]){
            alert(mes["log4"]);
            hearttoken = '';
            location.href = "/?pridsearch2="+rcaform_pronto_id;
        }
    }
},10000);



