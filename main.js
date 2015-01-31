(function() {

	var canvas = document.getElementById('container');
	var canvasWidth = canvas.offsetWidth;
	var canvasHeight = canvas.offsetHeight;
	var animatedEls;
	function randomIntBetween(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min; 
	}

function generateMountain(variant) {
		var mountain = document.createElement('div');
		mountain.classList.add('mountain');
		mountain.classList.add(variant);
		mountain.style.borderLeftWidth = randomIntBetween(50, 100);
		mountain.style.borderRightWidth = randomIntBetween(50, 100);
		mountain.style.borderBottomWidth = randomIntBetween(50, parseInt(canvasHeight/3)) ;
		mountain.style.marginRight = randomIntBetween(-25, -120) + '%';
		canvas.appendChild(mountain);
	}


function generateSnow(variant) {
		var cloud = document.createElement('div');
		cloud.classList.add('snow');
		cloud.classList.add(variant);
		cloud.style.left = randomIntBetween(0, 100) + '%';
		cloud.style.webkitAnimationDelay = randomIntBetween(0, 10000);
		canvas.appendChild(cloud);
	}

	function init() {
		var i;
		for(i=0;i<10;i++) {
			generateMountain('variant-' +(parseInt(i % 5) + 1));
		}

			for(i=0;i<200;i++) {
			generateSnow('variant-' +(parseInt(i % 5) + 1));
		}
		animatedEls = document.querySelectorAll('.mountain, .bird, .wing-l, .wing-r, .letter, .cloud, .snow, body, .moon');
	}

	//PLAYING
	var TIMER = 4000;
	var current = -1;
	var isPlaying = true;
	var to;

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
		} else if (steps[current]){
			document.body.setAttribute('data-step', current);
			updateScene(steps[current]);
		}
	}

	function updateScene(step) {
		document.body.classList.add(step.classes);
	}

	var steps = [
		{
			classes: 'animate-bird',
			delay: 2000
		},
		{
			classes: 'animate-clouds',
			delay: 1000
		},
		{
			classes: 'animate-mountains',
			delay: 8000
		},
		{
			classes: 'animate-falling',
			delay: 1500
		},
		{
			classes: 'animate-rising',
			delay: 8000
		},
		{
			classes: 'show-bird-mate',
			delay: 8000
		},
		{
			classes: 'animate-day-passing',
			delay: 10000
		},
		{
			classes: 'animate-snow',
			delay: 10000
		},
		{
			classes: 'animate-getting-old',
			delay: 20000
		},
		{
			classes: 'animate-guy-getting-old',
			delay: 0
		},{
			classes: 'animate-guy-falling',
			delay: 5000
		},{
			classes: 'show-him',
			delay: 5000
		},
	{
			classes: 'batman',
			delay: 5000
		}
	]
	init();
	next();
}());