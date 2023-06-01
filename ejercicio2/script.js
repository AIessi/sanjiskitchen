window.addEventListener('DOMContentLoaded', documentLoaded, false);

var startTime;
var limit;
var timer;

function documentLoaded() {
  "use strict";

  var timerElement = document.getElementById("timer");
  timerElement.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      startTimer();
      timerElement.blur();
    }
  });
}

function startTimer() {
  startTime = new Date();
  limit = parseInt(document.getElementById("timer").innerHTML);

  clearInterval(timer);
  timer = setInterval(updateTime, 1000);
}

function updateTime() {
  var currentTime = new Date();
  var elapsed = (currentTime.getTime() - startTime.getTime()) / 1000;

  var minutes = Math.floor(elapsed / 60);
  var seconds = Math.floor(elapsed % 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  document.getElementById("timer").innerHTML = minutes + ":" + seconds;

  var totalSeconds = minutes * 60 + seconds;
  if (totalSeconds >= limit * 60) {
    document.getElementById("timer").classList.add("red");
    clearInterval(timer); // Stop the timer
  } else {
    document.getElementById("timer").classList.remove("red");
  }
}