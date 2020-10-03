
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var invisbleGround;
var gameState = 0;
var PLAY = 0;
var END = 1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityx = -4;
  groundx = ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score, 275, 50);
  
  stroke("black"); 
  textSize(20)
  fill("black");
  if (gameState == PLAY){
    survivalTime = Math.round(frameCount/60)
  }
  text("Survival Time: "+ survivalTime, 100, 50);
  
  if(gameState == PLAY) {
    if(keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY = -13;
    }
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(invisibleGround);
  
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score + 2;
    }
    
    if(obstacleGroup.isTouching(monkey)){
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      gameState = END;
    }
    
    bananaSpawn();
    obstacleSpawn();
  }
  
  if(gameState == END) {
    monkey.collide(invisibleGround);
    textAlign("center");
    textSize(20); 
    text("GAME OVER",200,200);
  }
  
  drawSprites();
}

function bananaSpawn () {
  if (frameCount % 85 === 0){
    banana = createSprite(450, 200, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -6.5;
    banana.scale = 0.1;
    banana.lifetime = 150;
    foodGroup.add(banana);
    banana.depth = monkey.depth - 10;
  }
}

function obstacleSpawn () {
  if (frameCount % 300 === 0){
    obstacle = createSprite(450, 315, 20, 20);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}