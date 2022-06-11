function loadData(selectsql){
    var selectparam = {"selectsql":selectsql};
    var rstobj = [];
    $.ajax({
        type: 'POST',
        url: "/common_ajax_select",
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
function heartLiense(heart_token){
    var token = heart_token;
    var rstobj = [];
    $.ajax({
        type: 'POST',
        url: "/heart_listen",
        async: false,
        data: {
            'csrfmiddlewaretoken': '{{ csrf_token }}',
            'ajaxselectparam':JSON.stringify(token)
        },
        success: function (data) {
            rstobj = data;
        }
    });
    return rstobj;
}
function initSelect(selectobjid, selectsql, selectdefaultval=""){
    $("#"+selectobjid).empty();
    $("#"+selectobjid).append($("<option>").val("").text(""));
    selectops = loadData(selectsql);
    $.each(selectops, function(index){
        $("#"+selectobjid).append($("<option>").val(selectops[index].dm).text(selectops[index].csz));
    });
};
function openLink(url){
    window.open(url);
};
function closePage(){
    try{
        window.close();
    }catch (e){

    }
    try{
        window.open("about:blank","_top").close()
    }catch (e){

    }
}
function showloading(left, top){
    $("#loadingpiccommon").css({
        "display": "",
        "position": "fixed",
        "left": left ? left : ($(window).width() - 280) / 2,
        "top": "300px",
        "z-index": 9999
    });
}
function hideloading(){
    $("#loadingpiccommon").css({
        "display": "none"
    });
}
function getwebsitevisitcount(){
    $.ajax({
        type: 'POST',
        url: "/webvisitcount",
        async: false,
        data: {
            'csrfmiddlewaretoken': '{{ csrf_token }}'
        },
        success: function (data) {
            rstobj = [data["total"],data["today"]];
        }
    });
    return rstobj
}



