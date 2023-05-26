/**
 * Creating variables to hold the position
 * of each element we will be using for this
 * project
 */

let seconds = document.querySelector(`#seconds`);
let milliseconds = document.querySelector(`#milliseconds`);
let startTimer = document.querySelector(`#start`);
let stopTimer = document.querySelector(`#stop`);
let resetTimer = document.querySelector(`#reset`);

let secs = 0;
let millisecs = 0;
// creating a variable named timeinterval:
let timeinterval;
const timer = ()=>{
    millisecs++;
    millisecs < 9 ? milliseconds.innerHTML="0"+millisecs: milliseconds.innerHTML = millisecs;
    if(millisecs > 99){
        secs++;
        seconds.innerHTML = "0"+secs;
        millisecs = "0"+0;
    }
    secs > 9? seconds.innerHTML=secs: seconds.innerHTML = "0"+secs;
}


// adding event listeners to the buttons: start, stop, and reset:

startTimer.addEventListener("click", ()=>{
    // 10 for milliseconds and 1000 for seconds
    timeinterval = setInterval(timer, 10);
});
stopTimer.addEventListener("click", ()=>{
    clearInterval(timeinterval);
})
resetTimer.addEventListener("click", ()=>{
    clearInterval(timeinterval);
    secs=0;
    millisecs =0;
    seconds.innerHTML="00";
    milliseconds.innerHTML="00";    
})