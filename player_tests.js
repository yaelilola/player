function initTest(){
    const display_value = $('div[aria-label="Steps"]').css('display');
    if (display_value !== 'none'){
        const currTipStep =$('div[data-iridize-id="content"]').attr("step_id");
        const currTipContent =$('div[data-iridize-id="content"]').html();
        if (currTipContent !== stepsArray[0].action.contents['#content']){
            console.log("Error: First step was not loaded correctly");
            return 0;
        } if (currTipStep !== "1") {
            console.log("Error: problem with step counting");
            return 0;
        } else {
            return 1;
        }
    } else {
        console.log("Error: tips did not appear.");
        return 0;
    }      
}

function nextBtnTest(){
    const nextBtn = document.getElementById("NextBt");  
    if (nextBtn === undefined){
        console.log("Error: next button was not found");
        return 0;
    }
    let curr_tip =   $('div[data-iridize-id="content"]').html();
    for (let i = 0 ; i < stepsArray.length -1 ; i++) { // the last tip has no content
        if (curr_tip !== stepsArray[i].action.contents['#content']){
            console.log("Error: next button is not forwarding correctly");
            return 0;
        } else {
            nextBtn.click();
            curr_tip =   $('div[data-iridize-id="content"]').html();
        }
    }
    // check that after the last click on 'next' the tips disappeared 
    nextBtn.click();
    const display_value = $('div[aria-label="Steps"]').css('display');
    if (display_value !== 'none'){
        console.log("Error: clicking next on the last element did not close the tips.");
        return 0;
    }
    else {
        return 1;
    }
}
function closeBtnTest(){
    $('div[aria-label="Steps"]').css('display','block');
    const closeBtn = document.getElementById("CloseBt");  
    if (closeBtn === undefined){
        console.log("Error: close ('x') button was not found");
        return 0;
    }
    $('#CloseBt').click();
    const display_value = $('div[aria-label="Steps"]').css('display');
    if (display_value !== 'none'){
        console.log("Error: clicking the 'x' button did not work.");
        return 0;
    }
    else {
        return 1;
    }
}
function backBtnTest(){
    $('div[aria-label="Steps"]').css('display','block');
    const backBtn = document.getElementById("PrevBt");  
    if (backBtn === undefined){
        console.log("Error: back button was not found");
        return 0;
    }
    else{
        let curr_tip =   $('div[data-iridize-id="content"]').html();
        for (let i = stepsArray.length -2 ; i >= 0 ; i--) { // the last tip has no content
            if (curr_tip !== stepsArray[i].action.contents['#content']){
                console.log("Error: back button is not going backwards correctly");
                return 0;
            } if (i  === 0 && backBtn.disabled !== true) {
                console.log("Error: back button is enabled for first tip but it should not be");
                return 0;
            } if (i  > 0 && backBtn.disabled === true) {
                console.log("Error: back button is disabled but it should be enabled");
                return 0;
            }else {
                backBtn.click();
                curr_tip =   $('div[data-iridize-id="content"]').html();
            }
        }
        return 1;
    }
}
const init_test_res = initTest();
const next_btn_test_res = nextBtnTest();
const back_btn_test_res = backBtnTest();
const close_btn_test_res = closeBtnTest();
if (init_test_res === 1 && next_btn_test_res === 1 && back_btn_test_res === 1 && close_btn_test_res === 1){
    console.log("All of the tests had passed!!!");
}else {
    console.log("Some tests had failed. See notes above.");
}