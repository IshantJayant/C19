var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage("ghost",ghostImg);
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();

  
}

function draw() {
  background(0);
  if(gameState==="play"){

  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(tower.y > 400){
      tower.y = 300
    }
    drawSprites();
    spawnDoors();
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;

    }
  }
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
}
function spawnDoors(){

  if(frameCount % 240===0){
    var door=createSprite(200,-50);
    var climber=createSprite(200,10);
    var invisibleBlock=createSprite(200,15);
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisibleBlock.x=door.x;
    invisibleBlock.width=climber.width;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    invisibleBlock.visible=false;
    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    

  }
  
}

