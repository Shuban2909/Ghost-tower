//creating variables
var towerImg,tower;
var DoorImg,door;
var climberImg,climber;
var ghostImg,ghost;
var Play=1;
var End=0;
var GameState=Play;
var invisibleground,invisibleground2;
var doorGroup;
var ClimberG;
var IG1,IG2;
var GameOver,gameover;
var distance=0; score=0;


function preload(){
  
  //loading Images
  towerImg=loadImage("tower.png");
  
  DoorImg=loadImage("door.png");
  
  climberImg=loadImage("climber.png");
  
  ghostImg=loadImage("ghost-standing.png");
  
  GameOver=loadImage("gameover.jpg");
}

function setup(){
  //creating canva
  createCanvas(600,400);
  
  //creating edges
  edge = createEdgeSprites();
  
  //creating the tower
  tower=createSprite(300,200,20,20);
  tower.addImage(towerImg);
  tower.velocityY=+5;
  
  //creating gameover sign
  gameover=createSprite(300,200,20,20);
  gameover.addImage(GameOver);
  gameover.scale=0.2;
  gameover.visible=false;
  
  //making groups
  doorGroup=new Group();
  ClimberG=new Group();
  IG1=new Group();
  IG2=new Group();
  
  //spawning ghost
  ghostmaker();
}

function draw(){
   
  //coloring the background
  background("blue");
  
  //drawing sprites
  drawSprites();
  
  //creating the score and distance
  textSize(20);
  fill("yellow");
  text("Distance: "+ distance,350,30);
  text("Score: "+ score,350,50);
  
 if(GameState==Play){  

  ghost.collide(IG2);
  
  ghost.collide(edge[2]);
  
  //rebuilding the tower
  if(tower.y>height){
    tower.y=height/2;
  }
  
  //moving the ghost
  if(keyDown("SPACE")){
      ghost.velocityY=-10;
    } 
  ghost.velocityY=ghost.velocityY+0.5;
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+30;
  }
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-30;
  }
  
  //spawning door
  if(frameCount%60==0){
  Spawndoor();
  }
  
   //ending the game
  if(ghost.y>410){
    GameState=End;
  }
  if(ghost.isTouching(IG1)){
    GameState=End;
  }
   
  //making the distance and score 
   distance=distance+Math.round(getFrameRate()/55);
   score=Math.round(distance/10);
}  
  
  //Gamestate end
  if(GameState==End){
    tower.velocityY=0;
    
    gameover.visible=true;
    
    doorGroup.destroyEach();
    ClimberG.destroyEach();
    ghost.destroy();
    
    //resetting the game
    if(keyWentDown("R")){
      reset();
    }
  }
  
}
function Spawndoor(){
  
  //making doors
  door=createSprite(Math.round(random(100,500)),0,50,50);
  door.addImage(DoorImg);
  door.velocityY=+5;
  door.lifetime=200;
  //door.debug=true;
  door.depth=ghost.depth-1;
  doorGroup.add(door);
  
  //making climbers
  climber=createSprite(200,200,50,50);
  climber.addImage(climberImg);
  climber.velocityY=+5;
  climber.x=door.x;
  climber.y=door.y+50;
  climber.lifetime=150;
  climber.depth=ghost.depth-1;
  ClimberG.add(climber);
  
  //making the invisible grounds
  
  invisibleground=createSprite(200,200,100,10);
  invisibleground.velocityY=+5;
  invisibleground.x=door.x;
  invisibleground.y=door.y+65;
  invisibleground.debug=true;
  invisibleground.lifetime=200;
  invisibleground.visible=false;
  IG1.add(invisibleground);
  
  invisibleground2=createSprite(200,200,100,10);
  invisibleground2.velocityY=+5;
  invisibleground2.x=door.x;
  invisibleground2.y=door.y+45;
  invisibleground2.lifetime=200;
  invisibleground2.visible=false;
  IG2.add(invisibleground2);
  
}

function ghostmaker(){
  ghost=createSprite(110,280,20,20);
  ghost.addImage(ghostImg);
  ghost.scale=0.5;
  //ghost.debug=true;
  ghost.setCollider("circle",-30,30,130);
}

function reset(){
  
  //spawning ghost
  ghostmaker();
  
  GameState=Play;
  
  tower.velocityY=+5;
  
  doorGroup.destroyEach();
  ClimberG.destroyEach();
  
  gameover.visible=false;
  
  distance=0;
  
  score=0;
}


