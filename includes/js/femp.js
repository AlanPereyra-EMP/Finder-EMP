// Get canvas context
const canvas = document.getElementById('femp-bg');

// Defines canvas and images sizes
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const fempImgsSize = 50;//50x50px

// Detects center of canvas
var yCenter = (canvasHeight/2)-(fempImgsSize/2);
var xCenter = (canvasWidth/2)-(fempImgsSize/2);

var ctx = canvas.getContext('2d');
ctx.fillStyle = '#FDF8EA';
ctx.fillRect(0, 0, canvasWidth, canvasHeight);
ctx.fillStyle = '#262626';
ctx.font = "15px Varela Round";
ctx.textAlign = "center";
ctx.fillText("El objeto a encontrar es el siguiente:", (xCenter + 28), (yCenter /2));
ctx.fillText("Tocá el objeto para comenzar", (xCenter + 28), (yCenter * 1.7));

// Load star button
var startButton = new Image();
startButton.src = fempUrlButton;
startButton.addEventListener("load", loadStartButton);

function loadStartButton() {
  ctx.drawImage(startButton, xCenter, yCenter);
}

// preLoad all images
var target = new Image();
target.src = fempUrlTarget;

var noTarget = [];
var targetClicked = false;

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
function preLoadTarget(){
  if(targetClicked == false){
    target.addEventListener("load", loadTarget);
    loadTarget();
  }else{
    loadTarget();
  }
}

// Start mousedown event
canvas.addEventListener("mousedown", ifFempStated);
var fempStarted = false;

function ifFempStated() {
  var xCoord = event.layerX;
  var yCoord = event.layerY;
  if (fempStarted) {
    detectTouchedTarget(event);
  }else if(((xCoord >= xCenter && xCoord <= (xCenter + fempImgsSize))&&(yCoord >= yCenter && yCoord <= (yCenter + fempImgsSize)))){
    fempResetCanvas();
    fempStart();
    fempStarted = true;
  }
}
function fempResetCanvas(){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = '#FDF8EA';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

// Wait for the user touch in star button, then star game
function fempStart() {
  preLoadNoTarget();
  preLoadTarget();
}

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
  for(var l = 0; l < 7; l++){
    for(var i = 0; i < 5; i++){
      var x = getRandomPositionX();
      var y = getRandomPositionY();
      ctx.drawImage(noTarget[i], x, y);
    }
  }
}

// Render the target
var targetCoordX;
var targetCoordY;

function loadTarget(){
  var x = getRandomPositionX();
  var y = getRandomPositionY();
  setTimeout(renderTarget, 50);
  function renderTarget() {
    ctx.drawImage(target, x, y)
  }
  // Saves the target coordinates in previus created variables
  tCoordX = x;
  tCoordY = y;
}

// Detects if the target has been touched and reset the level
var fempLevel = 0;
function detectTouchedTarget(event){
  var xCoord = event.layerX;
  var yCoord = event.layerY;
  if((xCoord >= tCoordX && xCoord <= (tCoordX + fempImgsSize))&&(yCoord >= tCoordY && yCoord <= (tCoordY + fempImgsSize))){
    fempResetCanvas();  
    targetClicked = true;
    preLoadNoTarget();
    loadTarget();
    fempLevel++;
    console.log(fempLevel);
  }
}
