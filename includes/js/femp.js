// Get canvas context
var canvas = document.getElementById('femp-bg');

// Defines canvas and images sizes
var canvasHeight = canvas.height;
var canvasWidth = canvas.width;
var fempImgsSize = 50;//50x50px

var ctx = canvas.getContext('2d');
ctx.fillStyle = '#FDF8EA';
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

var targetClicked = false;

// Load all images
var noTarget = [];
function preLoadNoTarget(){
  for(var i = 0; i < 5; i++){
    noTarget[i] = new Image();
    noTarget[i].src = fempUrlNoTarget[i];
    if(targetClicked==false){
      noTarget[i].addEventListener("load", loadNoTarget);
    }else{
      loadNoTarget();
    }
  }
}
preLoadNoTarget();

// Get random position (min/max) with separation between images
function getRandomPositionX() {
  var ctxMaxWidth = canvasWidth - fempImgsSize;//600x600px - img = 550px
  var maxNumberImg = ctxMaxWidth/fempImgsSize;
  var random = (Math.floor(Math.random() * (maxNumberImg - 0 + 1) + 0))* fempImgsSize;
  return random;
}
function getRandomPositionY() {
  var ctxMaxHeight = canvasHeight - fempImgsSize;
  var maxNumberImg = ctxMaxHeight/fempImgsSize;
  var random = (Math.floor(Math.random() * (maxNumberImg - 0 + 1) + 0))* fempImgsSize;
  return random;
}

// Render all no target images
function loadNoTarget(){
  for(var l = 0; l < 24; l++){
    for(var i = 0; i < 5; i++){
      var x = getRandomPositionX();
      var y = getRandomPositionY();
      ctx.drawImage(noTarget[i], x, y);
    }
  }
}

var target = new Image();
target.src = fempUrlTarget;
target.addEventListener("load", loadTarget);

var targetCoordX;
var targetCoordY;

// Render the target
function loadTarget(){
  var x = getRandomPositionX();
  var y = getRandomPositionY();
  setTimeout(preLoadTarget, 50);
  function preLoadTarget() {
    ctx.drawImage(target, x, y)
  }
  // Saves the target range coordinates in previus created variables
  targetCoordX = x;
  targetCoordY = y;
}

// Detects if the target has been touched
canvas.addEventListener("mousedown", detectTouchedTarget);

// Detects if the target has been touched and reset the level
function detectTouchedTarget(event){
  var xCoord = event.layerX;
  var yCoord = event.layerY;
  if((xCoord >= targetCoordX && xCoord <= (targetCoordX + fempImgsSize))&&(yCoord >= targetCoordY && yCoord <= (targetCoordY + fempImgsSize))){
    coverPreviusTarget();
    targetClicked = true;
    preLoadNoTarget();
    loadTarget();
  }
}

function coverPreviusTarget() {
  ctx.drawImage(noTarget[1], targetCoordX, targetCoordY);
}
