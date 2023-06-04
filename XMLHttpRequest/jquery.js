$(function(){
    // SlideToggling the first div explaining the tutorial.
    $(`#info-button`).on(`click`, function(){
            $(`#message`).slideToggle(1000);
        })
    // This for toggling the display class and showing the data-display button:
    $(`.display`).on(`click`, function(){
        $(`.display`).slideToggle(3000);
        $(`#show-display`).slideDown(3000);
    });
    // this is for displaying the data and hiding the data-display button:
    $(`#show-display`).on(`click`, ()=>{
        $(`#show-display`).fadeOut(1000);
        $(`.display`).slideDown(3000);
    });
    $(`#h1`).on(`mouseout`, function(){
        $(this).css(`minHeight`,`50px`);
        $(this).css(`transition`, `0.5s`);
    });
    $(`#h1`).on(`mouseover`, function(){
        $(this).css(`minHeight`,`100px`);
        $(this).css(`transition`, `0.5s`);
    })
})