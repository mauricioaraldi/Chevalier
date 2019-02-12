App.SpriteSheets = {
	red_horse : (function() {
		var data = {
			images: ["resources/images/sprite_horse.png"],
			frames: {width:202, height:184},
			animations: {run:[0, 1, 2, 3]}
		};
		 
		return new createjs.SpriteSheet(data);
	})(),
	
	blue_horse : (function() {
		var data = {
			images: ["resources/images/sprite_horse2.png"],
			frames: {width:200, height:184},
			animations: {run:[3, 2, 1, 0]}
		};
		
		return new createjs.SpriteSheet(data);
	})(),
}