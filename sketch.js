var trex,trexRunning,invisibleGround,ground,groundImage,score,gameState,PLAY,END,spawnClouds,spawnObstacles,cloudGroup,obstacleGroup,clouds,cloudImage,ob1,ob2,ob3,ob4,ob5,ob6,restart,restartImage,gameOver,gameOverImage,trexDead,die,jump,checkPoint;
localStorage["highestScore"]=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score,dist;
var flag=0;
function preload(){
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  flimg=loadImage("flimg.png");
  checkPoint=loadSound("checkPoint.mp3");
  trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexDead=loadImage("trex_collided.png");
  restartImage=loadImage("restart.png");
  gameOverImage=loadImage("gameOver.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
 
  ob1=loadImage("obstacle1.png");
   ob2=loadImage("obstacle2.png");
   ob3=loadImage("obstacle3.png");
   ob4=loadImage("obstacle4.png");
   ob5=loadImage("obstacle5.png");
   ob6=loadImage("obstacle6.png");
}
function setup() {
  createCanvas(displayWidth - 20,windowHeight);
  fl=createSprite(1400,125,10,10);
  fl.addAnimation("flagt",flimg);
   fl.scale=0.3
  trex=createSprite(30,145,10,10);
 
  invisibleGround=createSprite(displayWidth/2,175,4000,10);
  invisibleGround2=createSprite(displayWidth/2+invisibleGround.width/2,175,4000,10);
  ground=createSprite(200,163,10,10);
  ground2=createSprite(400,163,10,10);
  ground.addAnimation("ground",groundImage);
  ground2.addAnimation("ground",groundImage);
  dist=ground.width;
 // trex=createSprite(30,145,10,10);
  trex.addAnimation("trex",trexRunning);
  ground.scale=1.9;
  ground2.scale=1.9;
  trex.scale=0.5;
  invisibleGround2.visible=false;
  score=0;
  trex.setCollider("circle",0,0,31);
  

  gameOver=createSprite(trex.x+500,70,10,10);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale=0.4;
  gameOver.visible=false;
  restart=createSprite(trex.x+500,100,10,10);
  restart.addImage(restartImage);
  restart.scale=0.4;
  restart.visible= false;
  cloudGroup=new Group();
  obstacleGroup=new Group();
 
   
}

function draw() {
  background(230);
 
  //camera.position.y=trex.y;
 // if(keyIsDown(RIGHT_ARROW)){
   // trex.x=trex.x+10;
  //}
  fl.depth=trex.depth;
  fl.depth+=6
  if(gameState===PLAY){
   
  camera.position.x=trex.x+500
    trex.velocityX=5;
    if (trex.x >= dist-displayWidth){
      if(flag == 0){
        ground2.x = dist+ground.width/2;
        invisibleGround2.x = ground2.x;
        flag = 1;
      }
      else{
        ground.x = dist+ground.width/2;
        invisibleGround.x = ground.x;
        flag=0;
      }
      dist+=ground.width;
    }
    //camera.position.y=height/2;
    score=score+0.1;
     if(keyDown("space") && trex.y >= 146){
       jump.play();
      trex.velocityY = -13;
    }
    if (obstacleGroup.isTouching(trex)){
      die.play();
    gameState=END;
      trex.addImage("trex",trexDead);
      
  }
 
  
    if(Math.round(score) % 100=== 0 && Math.round(score) > 0){
      checkPoint.play();
      
    }
    trex.velocityY=trex.velocityY+1;
    trex.velocityY = trex.velocityY + 0.1;
    trex.velocityX=(6+3*Math.round(score)/100);
    //ground.x=trex.x;
  
    spawnClouds();
    spawnObstacles();
  }
  else if(gameState===END){
    gameOver.x = trex.x+500;
    restart.x = trex.x+500;
    restart.visible=true;
    gameOver.visible=true;
    ground.velocityX=0;
    trex.velocityY=0;
    trex.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-5);
    cloudGroup.setLifetimeEach(-5);  
  }
  if(mousePressedOver(restart)){
  reset();
  }
  text("SCORE:"+Math.round(score),trex.x+500,30);
  text("Highest Score:"+localStorage["highestScore"],trex.x+600,30);
  invisibleGround.visible=false; 
  trex.collide(invisibleGround);
  trex.collide(invisibleGround2);
  createEdgeSprites();
  drawSprites();
}
function spawnClouds(){
  if (frameCount%60===0){
    clouds = createSprite(trex.x+displayWidth-100,120,40,10);
    clouds.addImage("abc",cloudImage);
   // clouds.velocityX=-6;
    clouds.y= random(50,100);
    clouds.lifetime = 500;
    trex.depth=clouds.depth;
    trex.depth=trex.depth+4;
    gameOver.depth=clouds.depth;
    gameOver.depth=gameOver.depth+4;
    restart.depth=clouds.depth;
    restart.depth=restart.depth+6;
    cloudGroup.add(clouds);
  }
}
function spawnObstacles(){
  if (frameCount%60===0){
    obstacles=createSprite(trex.x+1500,146,10,10);
   // obstacles.velocityX=-(6+3*Math.round(score)/100);
    var obj=Math.round(random(1,6));
    switch(obj){
      case 1:obstacles.addImage("a1",ob1);
        break;
        case 2: obstacles.addImage("a2",ob2);
        break;
        case 3:obstacles.addImage("a3",ob3);
        break;
        case 4:obstacles.addImage("a4",ob4);
        break;
        case 5:obstacles.addImage("a5",ob5);
        break;
        case 6:obstacles.addImage("a6",ob6);
        break;
        default:break;
    }
    obstacles.lifetime = 500;
    obstacles.scale=0.4;
    obstacleGroup.add(obstacles);
  }
}
function reset(){
  gameState=PLAY;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  restart.visible=false;
  gameOver.visible=false;
  trex.addAnimation("trex",trexRunning);
  if(localStorage["highestScore"]<Math.round(score)){
  localStorage["highestScore"]=Math.round(score);
  }
  console.log(localStorage["highestScore"]);
   score=0;
}
  
  
