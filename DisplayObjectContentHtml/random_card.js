
/**
 * This is a JavaScript Exercise where we are using a card
 * and displaying random data from a list created
 * we will be using three buttons and also, initiate the
 * onload to display the first item inside a list.
 * please keep this as a reference in the future.
 */

// =================================================
// Creating an list of objects to display on the html page:
const cards =[
    {
        card_title: `I am card one`,
        card_body: `This is the Description of The first card. Do you see it or not?`,
        card_image: `./images/card1.png`,
    },
    {
        card_title: `I am card two`,
        card_body: `This is the Description of the second card. Do you see it or not?`,
        card_image: `./images/card2.png`,
    },
    {
        card_title: `I am card three`,
        card_body: `This is the description of the third card. Do you see it or not?`,
        card_image: `./images/card3.png`,
    },
    {
        card_title: `I am card four`,
        card_body: `I am the card body`,
        card_image: `./images/card4.png`,
    },
    {
        card_title: `I am card five`,
        card_body: `I am the card body`,
        card_image: `./images/card5.png`,
    },
    {
        card_title: `I am card six`,
        card_body: `I am the card body`,
        card_image: `./images/card6.png`,
    }
];

// =================================================

let title = document.querySelector(`#title`);
let img = document.querySelector(`#img`)
let body = document.querySelector(`#body`);
let prevBtn = document.getElementById(`previous`);
let nextBtn = document.getElementById(`next`);
let randomBtn = document.getElementById(`random`);

// defining a variable that will hold the initial index value: 0
let currentCard = 0;




// Testing DOMContentLoaded trigger on windows:
window.addEventListener(`DOMContentLoaded`, ()=>{
    cardDisplay(currentCard);
});
// Creating a function that display the card fields into the html page:
const cardDisplay = ()=>{
    let card_list = cards[currentCard];
    title.innerHTML = card_list.card_title;
    body.innerHTML = card_list.card_body;
    img.src = card_list.card_image;
}

// adding event listener to next:
nextBtn.addEventListener(`click`, ()=>{
    if(currentCard >= (cards.length - 1)){
        Swal.fire({
            title: `Last Record`,
            text: `Please click Previous Record`,
        });
    }
    else{
        currentCard+=1;
        cardDisplay();
        // inspect the page and go to console to watch the action:
        console.log(`The next Page Index given is: ${currentCard}`)
    }
});

// Creating another event listener to display the previous cards on the html page:
prevBtn.addEventListener(`click`, ()=>{
    if(currentCard <= 0){
        Swal.fire({
            title: `First Record`,
            text: `This is the first record`,
        })
    }
    else{
        currentCard-=1;
        cardDisplay();
        // inspect the page and view the console to watch the action:
        console.log(`The Previous Index is: ${currentCard}`)
    }
});

// Creating the random event for th random button:
randomBtn.addEventListener(`click`, ()=>{
    currentCard =Math.floor(Math.random()*cards.length);
    cardDisplay();
    // inspect the page and view the console to watch the action:
    console.log(`The random index choice is: ${currentCard}`)
})