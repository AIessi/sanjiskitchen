// when the document is loaded, trigger the "documentLoaded" function
window.addEventListener('DOMContentLoaded', documentLoaded, false);

var startTime;
var limit;
var timer;

function documentLoaded() {
	"use strict";

	// listen for mouse clicks on the button
	document.getElementById("btnStart").addEventListener("click", botaoClicked, false);

	console.log("Document uploaded");
}

// when we click on the button, we save the current time, and the time limit. We then
// create a timer to execute the "updateTime" function once a second.
function botaoClicked() {
	"use strict";

	startTime = new Date();

	limit = parseInt(document.getElementById("txtTempo").value);

	clearInterval(timer);
	timer = setInterval(updateTime, 1000);
}

function updateTime() {
	"use strict";

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
		document.getElementById("clock").className = "red";
	} else {
		document.getElementById("clock").className = "blue";
	}

}