// Variables
const counter = document.querySelector('#counter');
const start = document.querySelector('#start');
const reset = document.querySelector('#reset');
const record = document.querySelector('#record');
const list = document.querySelector('#list');
const playSound = document.querySelector('#audio');
const alert = document.querySelector('#alert');
const duplicate = document.querySelector('#duplicate');

let time = 0;
let stopped = true;
let interval;
let lastrecord = null;
// start/Stop
function startStop() {
	if (stopped) {
		interval = setInterval(() => {
			time++;
			counter.innerHTML = time / 100;
		}, 10);
		stopped = false;
	} else {
		interval = clearInterval(interval);
		stopped = true;
	}
}
function resetCounter() {
	if (!stopped) {
		clearInterval(interval);
		stopped = true;
	}
	time = 0;
	list.innerHTML = '';
	counter.innerHTML = '0.00';
	alert.style.display = 'none';
	alert.style.animationName = '';
}
function recordTime() {
	if (time !== 0) {
		if (lastrecord === time) {
			duplicate.style.display = 'block';
			setTimeout(() => {
				duplicate.style.display = 'none';
			}, 900);

			return;
		} else {
			lastrecord = time;
			playSound.currentTime = 0;
			playSound.play();
			list.innerHTML += `<li>${time / 100}</li>`;
		}
	} else {
		alert.style.display = 'block';
		setTimeout(() => {
			alert.style.display = 'none';
		}, 900);
		return;
	}
}
start.addEventListener('click', startStop);
reset.addEventListener('click', resetCounter);
record.addEventListener('click', recordTime);
// keyboard events
document.addEventListener('keydown', ev => {
	switch (ev.key) {
		case 's':
			startStop();
			break;
		case 'r':
			resetCounter();
			break;
		case 't':
			recordTime();
			break;
	}
});
