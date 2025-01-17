// var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);
let stepsArray;
$.getJSON("https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=?",function(json){
    getCSSContent(json);
    stepsArray = json.data.structure.steps;
    setTips(stepsArray, json.data.tiplates);    
    console.log('done reading player.js!');
    });

// adding a style element to the document's head
function getCSSContent(json){
    $("<style type='text/css'>" + json.data.css + "</style>").appendTo("head");
}
// displaying all tips
function setTips(stepsArray, tipsTemplates){
    const tipElement = tipsTemplates.tip;
    $(tipElement).appendTo("body");
    setButtonsHandlers();
    showTip(stepsArray[0],"");
    
}
// displaying a certain tip (content and location)
function showTip(tipJson, classesToRemove){
    $('div[aria-label="Steps"]').css("position","relative"); /// for the buttons not to be hidden by other google page elements.
    $('div[aria-label="Steps"]').removeClass(classesToRemove);
    $('div[aria-label="Steps"]').addClass(tipJson.action.classes);
    if (findPrevTipAux(tipJson.id) === undefined){
        $('button[data-iridize-role="prevBt"]').prop('disabled', true);
    } else {
        $('button[data-iridize-role="prevBt"]').prop('disabled', false);
    }
    if (tipJson.action.contents!==undefined){
        // $('div[aria-label="Steps"]').css("float", tipJson.action.placement);
        $('div[aria-label="Steps"]').css("top","0");
        $('div[data-iridize-id="content"]').html(tipJson.action.contents["#content"]); 
        $('div[data-iridize-id="content"]').attr("step_id",tipJson.id); 
    }
    $('span[data-iridize-role="stepCount"]').html(FindTipInStepsArray(tipJson.id).index + 1);
    $('span[data-iridize-role="stepsCount"]').html(stepsArray.length - 1);
}

// return the tip JSon that have tipId and it's index in the steps array
function FindTipInStepsArray(tipId){
    let tip;
    let tip_index = 0
    for (let i = 0 ; i < stepsArray.length ; i++){
        const step = stepsArray[i];
        if(step.id===tipId){
            tip = step;
            tip_index = i;
        }
    }
    return {element: tip, index: tip_index};
}

// setting the click handlers for next and back buttons
function setButtonsHandlers(){
    $('a[data-iridize-role="nextBt"]').attr("id","NextBt");
    $('button[data-iridize-role="prevBt"]').attr("id","PrevBt");
    $('button[data-iridize-role="closeBt"]').attr("id","CloseBt");
    $('#CloseBt').click(function () {closeTips();});
    $('#PrevBt').click(function () {back();});
    $('#NextBt').click(function(){next();});   
}

// handles the tips 'x' button
function closeTips(){
    $('div[aria-label="Steps"]').css('display','none');
}

// returns the tip preceding current tip
function findPrevTip(){
    const currTipId =$('div[data-iridize-id="content"]').attr("step_id");
    return findPrevTipAux(currTipId);
}

//an auxilary function, returns the previous tip of the tip with currTipId
function findPrevTipAux(currTipId){
    let prevTip;
    stepsArray.forEach(step => {
        if(step.followers.length > 0 && step.followers[0].next===currTipId){
            prevTip = step;
        }
    });
    return prevTip;
}
// back button click handler
function back(){
    const prevTipJson = findPrevTip();
    if (prevTipJson!==undefined){
        $('button[data-iridize-role="prevBt"]').prop('disabled', false);
        showTip(prevTipJson, $('div[aria-label="Steps"]').attr("class"));
    } else {
        $('button[data-iridize-role="prevBt"]').prop('disabled', true);
    }
}
// returns the tip following tipJson
function findNextTip(){
    const currTipId =$('div[data-iridize-id="content"]').attr("step_id");
    const currTip = FindTipInStepsArray(currTipId).element;
    let nextTip = currTip.followers.length === 0 ? undefined : FindTipInStepsArray(currTip.followers[0].next).element;
    return nextTip;
}
// next button click handler
function next(){
    const nextTipJson = findNextTip();
    if (nextTipJson.action.type === 'tip'){
        showTip(nextTipJson, $('div[aria-label="Steps"]').attr("class"));
    } else { // type is closeScenario (the only other type as seen in the json example)
        closeTips();
    }
}
