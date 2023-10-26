// use DOM to get a refernce to the UI element 
const button = document.getElementById("play-pause-button");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const seekBar = document.getElementById("seek-bar");
const audio = new Audio("audio/Soft-Background-for-Interview.webm");
// seek state - are we seeking?
let seeking = false;

// listen to button click using arrow function
button.onclick = (event) => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
// audio object listeners
audio.onplay = (event) => {
    button.src = "images/pause.svg"

}

audio.onpause = (event) => {
    button.src = "images/play.svg"
}
audio.onloadedmetadata = (event) => {
    currentTime.innerHTML = formatTime(0);
    totalTime.innerHTML = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
    seekBar.value = 0;
}

audio.oncanplaythrough = (event) => {
    seekBar.disabled = false;
}
audio.ontimeupdate = (event) => {
    currentTime.innerHTML = formatTime(audio.currentTime)
    if (!seeking) {
        seekBar.value = Math.floor(audio.currentTime)

    }
}
// seekBar listeners
seekBar.oninput = (event) =>{
    seeking = true;
}
seekBar.onchange = (event) =>{
    audio.currentTime = seekBar.value;
    if(!audio.paused){
        audio.play();
    }
    seeking = false;
}


// helper functions
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}