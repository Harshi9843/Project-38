var trex, trex_running, trex_collided;
var ground;
var gameState = "play";
var obs1, obs2, obs3, obs4;
var score = 0;

function preload(){
	trex_running = loadAnimation("images/trex1.png", "images/trex3.png", "images/trex4.png");
	trex_collided = loadAnimation("images/trex_collided.png");

	obs1 = loadImage("images/obstacle1.png");
	obs2 = loadImage("images/obstacle2.png");
	obs3 = loadImage("images/obstacle3.png");
	obs4 = loadImage("images/obstacle6.png");

}

function setup(){
	createCanvas(displayWidth, displayHeight);

	trex = createSprite(100, 700);
	trex.addAnimation("running", trex_running);
	trex.addAnimation("collided", trex_collided);
	trex.scale = 0.6;

	ground = createSprite(700, 735, 2000000000000, 15);

	
}

function draw(){
	background("black");

	camera.position.x = trex.x;
	camera.position.y = trex.y;

	trex.collide(ground);

	if(gameState == "play"){
		if(keyDown("SPACE") && trex.y > 699){
			trex.velocityY = -16;
		}

		trex.velocityY = trex.velocityY + 0.8;

		spawnObstacles();

		if(frameCount % 60 == 0){
			score = score + 50;
		}
	}

	textSize(24);
	fill("red");
	text("Score: "+ score, 600, 300);

	drawSprites();
}

function spawnObstacles(){
	if(frameCount % 60 == 0){
		var obstacle = createSprite(800, 700);
		obstacle.velocityX = -10;

		var rand = Math.round(random(1, 4));
		switch(rand) {
			case 1: obstacle.addImage(obs1);
					break;
			case 2: obstacle.addImage(obs2);
					break;
			case 3: obstacle.addImage(obs3);
					break;
			case 4: obstacle.addImage(obs4);
					break;
			default: break;
		}

		obstacle.scale = 0.8;	
		obstacle.lifetime = 300;
	}
}