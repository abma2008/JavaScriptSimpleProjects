$(function(){
    // we will be writing our functionality in this part:
//This is for showing and hiding the data-show div:
$(`.data-show`).on(`dblclick`, ()=>{
    $(`.data-show`).slideUp(3000);
    $(`#showHideButton`).slideDown(3000);
})
$(`#showHideButton`).on(`click`, function(){
    $(`.data-show`).slideDown(3000);
    $(`#showHideButton`).slideUp(3000);
})








    // This is the end of the jquery 
})