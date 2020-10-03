let stepsArray;
$.getJSON("https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=?",function(json){
    getCSSContent(json);
    stepsArray = json.data.structure.steps;
    setTips(stepsArray, json.data.tiplates);    
    console.log(json);
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
    showTip(stepsArray[0]);
    
}
// displaying a certain tip (content and location)
function showTip(tipJson){
    if (findPrevTipAux(tipJson.id) === undefined){
        $('button[data-iridize-role="prevBt"]').prop('disabled', true);
    } else {
        $('button[data-iridize-role="prevBt"]').prop('disabled', false);
    }
    if (tipJson.action.contents!==undefined){
        $('div[aria-label="Steps"]').css("float: " + tipJson.action.placement);
        $('div[data-iridize-id="content"]').html(tipJson.action.contents["#content"]); 
        $('div[data-iridize-id="content"]').attr("step_id",tipJson.id); 
    }
}
// setting the click handlers for next and back buttons
function setButtonsHandlers(){
    $('button[data-iridize-role="closeBt"]').click(closeTips);
    $('button[data-iridize-role="prevBt"]').click(back);
    $('a[data-iridize-role="nextBt"]').click(next);
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
        showTip(prevTipJson);
    } else {
        $('button[data-iridize-role="prevBt"]').prop('disabled', true);
    }
}
// returns the tip following tipJson
function findNextTip(){
    const currTipId =$('div[data-iridize-id="content"]').attr("step_id");
    let nextTip;
    stepsArray.forEach(step => {
        if(step.id===currTipId){
            if (step.followers.length !== 0){
                const nextId = step.followers[0].next;
                stepsArray.forEach(possibleNext => {
                    if(possibleNext.id===nextId){
                        nextTip = possibleNext;
                    }
                });
            }
        }
    });
    return nextTip;
}
// next button click handler
function next(){
    const nextTipJson = findNextTip();
    if (nextTipJson!==undefined){
        $('a[data-iridize-role="nextBt"]').prop('disabled', false);
        showTip(nextTipJson);
    } else {
        $('a[data-iridize-role="nextBt"]').prop('disabled', true);
    }
}


