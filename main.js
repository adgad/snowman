(function() {

	var canvas = document.getElementById('container');
	var canvasWidth = canvas.offsetWidth;
	var canvasHeight = canvas.offsetHeight;
	var animatedEls;
	function randomIntBetween(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min; 
	}


function generateSnow(variant) {
		var cloud = document.createElement('div');
		cloud.classList.add('snow');
		cloud.classList.add(variant);
		cloud.style.left = randomIntBetween(0, 100) + '%';
		cloud.style.animationDelay = randomIntBetween(0, 10000) + 'ms';
		canvas.appendChild(cloud);
	}

	function init() {
		var i;
		// for(i=0;i<10;i++) {
		// 	generateMountain('variant-' +(parseInt(i % 5) + 1));
		// }

			for(i=0;i<200;i++) {
				generateSnow('variant-' +(parseInt(i % 5) + 1));
			}
		animatedEls = document.querySelectorAll('.snowman__right-hand, .snowman__left-hand, .snowman__body, .snowman__legs .cloud, .snow, body, .moon');
	}

	//PLAYING
	var TIMER = 4000;
	var current = -1;
	var isPlaying = true;
	var to;
	var textContainer = document.querySelector('.text');

	function togglePlay() {
		var audio = document.getElementById('audio');
		if(isPlaying) {
			pause();
			document.getElementById('audio').pause();
		} else {
			play();
			document.getElementById('audio').play();
		}
	}
	function play() {
		toggleAnimationState();
		isPlaying = true;
		document.getElementById('togglePlay').textContent = 'Pause'; 
		next();
	}


	function toggleAnimationState() {
		var style;
    for ( var i = 0; i < animatedEls.length; i++ ) {
        style = animatedEls[i].style;
        if ( style.webkitAnimationPlayState === 'paused' ) {
        		style.webkitAnimationPlayState = 'running';
            document.body.classList.remove('paused'); 
            
        } else {
            style.webkitAnimationPlayState = 'paused';
            document.body.classList.add('paused');      
        }
    }   
	}

	function pause() {
		isPlaying = false;
		toggleAnimationState();
		current = parseInt(document.body.getAttribute('data-step'));
		document.getElementById('togglePlay').textContent = 'Play';
		
		clearTimeout(to);
	}
	

	function restart() {
		document.body.setAttribute('class', steps[0].classes);
		current = 0;
		step();
	}

	document.getElementById('restart').addEventListener('click', restart);
	document.getElementById('togglePlay').addEventListener('click', togglePlay);

	function next() {
		
		current++;
		var delay=steps[current] && steps[current].delay || TIMER;
		if(isPlaying === true) {
			to = setTimeout(next, delay);
		}

		if(current === steps.length) {
			isPlaying = false;
		} else {
			step();
		}
	}

	function step() {
		if(typeof steps[current] === 'function') {
			steps[current]();
		} else if (steps[current].classes){
			document.body.setAttribute('data-step', current);
			updateScene(steps[current]);
		} else if (steps[current].text) {
			textContainer.textContent = steps[current].text;
		}
	}

	function updateScene(step) {
		document.body.classList.add(step.classes);
	}

	var steps = [

		{ classes: 'animate-snow', delay: 0 },
		{ text: 'Hello', delay: 2000 },
		{ text: 'My name is Carlos!', delay: 3000 },
		{ text: 'Isn\'t the fall great...', delay: 0 },
		{ classes: 'animate-clouds', delay: 3000 },
		{ text: 'HAPPY HALLOWEENxoxoxox', delay: 1000 },
		{ classes: 'animate-right-arm-falling', delay: 0 },
		{ text: 'F*** ME THAT HURTS', delay: 0 },

		{ text: 'Hey, could you, er, pop that back in for me??', delay: 5000 },
		{ text: 'Please?', delay: 2000 },
		{ text: 'SERIOUSLY!?', delay: 3000 },
		{ text: 'Fine.', delay: 1000 },
		{ classes: 'animate-left-arm-falling', delay: 1000 },
		{ text: 'OWWWEEEEEEEEE.', delay: 4000 },
		{ text: 'holy mother of snow my F**@** arms!!!.', delay: 1000 },
		{ classes: 'animate-day-passing', delay: 2000 },
		{ classes: 'animate-legs-melt', delay: 2000 },
		{ text: 'fuckkkkkkkkkk.', delay: 6000 },
		{ text: 'kkkkkkkkkkkkkkkkk.', delay: 6000 },
 		{ classes: 'animate-body-melt', delay: 4000 },
		{ text: 'k thx bye xoxo.', delay: 6000 }

	]
	init();
	next();
}());