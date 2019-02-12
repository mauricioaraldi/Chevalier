$(function() {
	showPreparationScreen();
	
	redHorseAnimation = new createjs.Sprite(App.SpriteSheets.red_horse, "run"),
	blueHorseAnimation = new createjs.Sprite(App.SpriteSheets.blue_horse, "run");
	App.stage.addChild(redHorseAnimation, blueHorseAnimation);
});

function showPreparationScreen() {
	$('#preparation-screen').removeClass('hidden');
	
	$('#red-image').on('click', function(ev) {
		var shield = $('#shield'),
			x = ev.clientX - $(this).offset().left,
			y = ev.clientY - $(this).offset().top,
			imgX = ev.clientX - shield.width()/2,
			imgY = ev.clientY - shield.height()/2;
			
		App.Values.RedHorse.Defense.x = x;
		App.Values.RedHorse.Defense.y = y;
		
		shield.css({
			left: imgX,
			top: imgY
		})
		.removeClass('hidden');
	});
	
	$('#blue-image').on('click', function(ev) {
		var aim = $('#aim'),
			x = ev.clientX - $(this).offset().left,
			y = ev.clientY - $(this).offset().top,
			imgX = ev.clientX - aim.width()/2,
			imgY = ev.clientY - aim.height()/2;
			
		App.Values.RedHorse.Attack.x = x;
		App.Values.RedHorse.Attack.y = y;
		
		aim.css({
			left: imgX,
			top: imgY
		})
		.removeClass('hidden');
	});
	
	$('#go-button').on('click', go);
}

function go() {
	generateRandomDefenseAndAttack();
	calculateHit();
	$('#preparation-screen, #aim, #shield').addClass('hidden');
	startRunning();
}

function calculateHit() {
	var redHorseDefenseChance = calculateRedHorseDefenseChance(),
		blueHorseDefenseChance = calculateBlueHorseDefenseChance();
		
	if (redHorseDefenseChance == App.Constants.Defense.NO_DEFENSE) {
		console.log('Red Horse No Defense');
	} else if (redHorseDefenseChance == App.Constants.Defense.FAR_DEFENSE) {
		console.log('Red Horse Far Defense');
	} else if (redHorseDefenseChance == App.Constants.Defense.MIDDLE_DEFENSE) {
		console.log('Red Horse Middle Defense');
	} else if (redHorseDefenseChance == App.Constants.Defense.FULL_DEFENSE) {
		console.log('Red Horse Full Defense');
	}
	
	if (blueHorseDefenseChance == App.Constants.Defense.NO_DEFENSE) {
		console.log('Blue Horse No Defense');
	} else if (blueHorseDefenseChance == App.Constants.Defense.FAR_DEFENSE) {
		console.log('Blue Horse Far Defense');
	} else if (blueHorseDefenseChance == App.Constants.Defense.MIDDLE_DEFENSE) {
		console.log('Blue Horse Middle Defense');
	} else if (blueHorseDefenseChance == App.Constants.Defense.FULL_DEFENSE) {
		console.log('Blue Horse Full Defense');
	}
	
	if (redHorseDefenseChance > blueHorseDefenseChance) {
		console.log('=== === === Red Horse Wins === === ===');
	} else if (blueHorseDefenseChance > redHorseDefenseChance) {
		console.log('=== === === Blue Horse Wins === === ===');
	} else {
		console.log('=== === === Draw === === ===');
	}
}

function calculateBlueHorseDefenseChance() {
	var attackChance = 0,
		resultX = App.Values.RedHorse.Attack.x - App.Values.BlueHorse.Defense.x,
		resultY = App.Values.RedHorse.Attack.y - App.Values.BlueHorse.Defense.y,
		result = Math.abs(resultX + resultY);
		
	if ( result < 31 ) {
		return App.Constants.Defense.FULL_DEFENSE;
	} else if ( result < 62 ) {
		return App.Constants.Defense.MIDDLE_DEFENSE;
	} else if ( result < 94 ) {
		return App.Constants.Defense.FAR_DEFENSE;
	}
	
	return App.Constants.Defense.NO_DEFENSE;
}

function calculateRedHorseDefenseChance() {
	var attackChance = 0,
		resultX = App.Values.BlueHorse.Attack.x - App.Values.RedHorse.Defense.x,
		resultY = App.Values.BlueHorse.Attack.y - App.Values.RedHorse.Defense.y,
		result = Math.abs(resultX + resultY);
		
	if ( result < 31 ) {
		return App.Constants.Defense.FULL_DEFENSE;
	} else if ( result < 62 ) {
		return App.Constants.Defense.MIDDLE_DEFENSE;
	} else if ( result < 94 ) {
		return App.Constants.Defense.FAR_DEFENSE;
	}
	
	return App.Constants.Defense.NO_DEFENSE;
}

function generateRandomDefenseAndAttack() {
	var attackX = Math.floor(Math.random() * (302-5)) + 5,
		attackY = Math.floor(Math.random() * (153-85)) + 85,
		defenseX = Math.floor(Math.random() * (302-5)) + 5,
		defenseY = Math.floor(Math.random() * (153-85)) + 85;
	
	App.Values.BlueHorse.Defense.x = attackX;
	App.Values.BlueHorse.Defense.y = attackY;
	App.Values.BlueHorse.Attack.x = defenseX;
	App.Values.BlueHorse.Attack.y = defenseY;
}

function ticker(event) {
	if (createjs.Ticker.getPaused()) {
		return;
	}

	App.Values.RedHorse.running = true;
	App.Values.BlueHorse.running = true;

	if ( redHorseAnimation.x < App.stage.canvas.width - redHorseAnimation.spriteSheet._frameWidth ) {
		redHorseAnimation.advance();
		redHorseAnimation.x += 30;
	} else {
		redHorseAnimation.gotoAndStop(0);
		App.Values.RedHorse.running = false;
	}

	if ( blueHorseAnimation.x > 0 ) {
		blueHorseAnimation.advance();
		blueHorseAnimation.x -= 30;
	} else {
		blueHorseAnimation.gotoAndStop(3);
		App.Values.BlueHorse.running = false;
	}

	if ( !App.Values.RedHorse.running 
		 && !App.Values.BlueHorse.running ) {
		createjs.Ticker.removeEventListener('tick', ticker);
		$('#preparation-screen').removeClass('hidden');
	}

	App.stage.update();
}

function startRunning() {
	redHorseAnimation.stop();
	blueHorseAnimation.stop();
	
	redHorseAnimation.y = App.stage.canvas.height - redHorseAnimation.spriteSheet._frameHeight;
	blueHorseAnimation.y = App.stage.canvas.height - redHorseAnimation.spriteSheet._frameHeight;
	
	redHorseAnimation.x = 0;
	blueHorseAnimation.x = App.stage.canvas.width - blueHorseAnimation.spriteSheet._frameWidth;
	
	createjs.Ticker.addEventListener('tick', ticker);
	
	createjs.Ticker.setFPS(24);
}