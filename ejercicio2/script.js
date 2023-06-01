// when the document is loaded, trigger the "documentLoaded" function
window.addEventListener('DOMContentLoaded', documentLoaded, false);

var startTime;
var limit;
var timer;

function documentLoaded() {
    "use strict";

    // listen for mouse clicks on the clock
    document.getElementById("clock").addEventListener("click", clockClicked, false);

    console.log("Document uploaded");
}

function clockClicked(evt) {
    // get the clock element and check if it is not in editing mode
    var clock = document.getElementById("clock");

    if (!clock.classList.contains("editing")) {
        // enter editing mode
        clock.classList.add("editing");

        // create an input element and replace the clock content with it
        var input = document.createElement("input");
        input.type = "text";
        input.value = clock.textContent;
        input.classList.add("clock-input");
        clock.textContent = "";
        clock.appendChild(input);

        // set focus on the input element
        input.focus();

        // listen for Enter key press to start the timer
        input.addEventListener("keydown", function keydown(evt) {
            if (evt.key === "Enter") {
                evt.preventDefault();
                startTimer();
            }
        });

        // listen for focus out event to cancel editing mode if the input loses focus
        input.addEventListener("focusout", function focusout(evt) {
            cancelEditing();
        });
    }
}

function cancelEditing() {
    var clock = document.getElementById("clock");
    var input = clock.querySelector(".clock-input");
    clock.textContent = input.value;
    clock.classList.remove("editing");
}

function startTimer() {
    startTime = new Date();
    limit = parseInt(document.getElementById("txtTempo").value);

    clearInterval(timer);
    timer = setInterval(updateTime, 1000);

    cancelEditing();
}

function updateTime() {
    // read the current time
    var currentTime = new Date();

    // calculate how many seconds passed since the start of the timer
    var elapsed = (currentTime.getTime() - startTime.getTime()) / 1000;

    // convert seconds to minutes and seconds (below 60)
    var minutes = Math.floor(elapsed / 60);
    var seconds = Math.floor(elapsed % 60);

    // pad with zeroes on the left to look better
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // show the elapsed time
    document.getElementById("clock").innerHTML = minutes + ":" + seconds;

    // check if we are above the time limit and set the color of the timer accordingly
    if (minutes >= limit) {
        document.getElementById("clock-container").className = "red";
    } else {
        document.getElementById("clock-container").className = "blue";
    }
}