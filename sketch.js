var PLAY = 1;
var END = 0;
var gameState = PLAY;


var gameOver, restart;
var monkey , monkey_running;
// monkey_collided;
var bananaImage, obstacleImage;
var bananaGroup, obstacleGroup;
var background, backgroundImage;
var survivalTime = 0, score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImage = loadImage("backgroundmonkey.jpg");
  gameOverImg = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  
  //monkey_collided = loadImage("sprite_3.png");
}



function setup() {
  
  createCanvas(600,300);
  
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 7;
  
  monkey = createSprite(80,250,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(400,300,900,10);
  ground.shapeColor = "brown";
  ground.velocityX = -(6 + 2*6 /10);
  ground.x = ground.width/2;
  console.log(ground.x);
  ground.visible = true;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  survivalTime = 0;
  score = 0;
  
}


function draw() {
  
  //background("lightgreen");
    banana();
    obstacle();
    
  if(keyDown("space") && monkey.y >= 140){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.6;
  
  if(ground.x >0){
    ground.x = ground.width/2;
  }
  monkey.collide(ground);
   
    
    
 if(monkey.isTouching(bananaGroup)){
   bananaGroup.destroyEach();
   score = score +1;
 }
    
    
  drawSprites();
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50)
  
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,300,50);
  
  
}





function banana(){
  
  if(World.frameCount%120 ===0){
    var banana = createSprite(600,Math.round(random(120,200)),20,20);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  
  
  }
}

function obstacle(){
  
  if(World.frameCount % 300 === 0){
   var obstacle=createSprite(600,270,10,10);
  obstacle.addImage("obstacle",obstaceImage)
  obstacle.velocityX = -(5 +2*score /5);
  obstacle.scale= 0.15;
    obstacle.lifetime = 200;
  obstaclesGroup.add(obstacle);

  
  }
}
