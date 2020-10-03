function getCSSContent(json){
    $("<style type='text/css'>" + json.data.css + "</style>").appendTo("head");
}
$.getJSON("https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=?",function(json){
    getCSSContent(json);    
    console.log(json);
    });

