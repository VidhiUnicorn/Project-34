var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var height;
var bird,birdImage;
var bg,bgI,birdsG;
var gamestate = 0;

function preload(){
   bgI =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png",
   "hotairballoon2.png","hotairballoon3.png");
   birdImage = loadImage("birdCute.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  bg = createSprite (750,350);
  bg.addImage(bgI);
  bg.scale = 0.7;
  bg.velocityX = -2

  

  balloon=createSprite(150,450,150,150);
  balloon.addAnimation("hotAir",balloonImage1);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.changeAnimation("hotAir");
  balloon.scale=0.5;

database.ref("balloon/height").on("value",readHeight,showError);

  textSize(20); 

  birdsG = new Group();

}

// function to display UI
function draw() {
 
  if (gamestate === 0){
if(bg.x <= 300){
    bg.x = 750
  }
  
  if(keyDown(UP_ARROW)){
    //balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,-5);
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
   // balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,5);
    //write code to move air balloon in down direction
  }

  spawnBirds();

  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  

  if(birdsG.collide(balloon)){
   
 //
  
    gamestate = 1;}}
  
if(gamestate == 1){
  bg.destroy()
  birdsG.destroyEach();
  balloon.destroy();
  background(255)
  fill(0)
  textSize (250)
  text("GAME OVER !!!")

}

  drawSprites();
  
}
function readHeight(h){
  height = h.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;

}
function updateHeight(a,b){
  database.ref("balloon/height").update({
    x : height.x +a,
    y : height.y +b,
  })
}
function showError (){

}

function spawnBirds(){
  if(frameCount % 150 === 0){
    bird = createSprite (1500,random(100,600));
    bird.addImage(birdImage);
    bird.scale = 0.2;
    bird.velocityX = -2;
    bird.lifetime = 750;

    birdsG.add(bird)
  }
}