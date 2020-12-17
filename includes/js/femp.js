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
ctx.fillText("El objeto a encontrar es el siguiente:", (xCenter + 28), (yCenter /1.5));
ctx.fillText("Tocá el objeto para comenzar", (xCenter + 28), (yCenter * 1.7));

// Load target in the center as start button
var target = new Image();
target.src = fempUrlTarget;
target.addEventListener("load", loadStartButton);

function loadStartButton() {
  ctx.drawImage(target, xCenter, yCenter);
}

// Load audio
var audioStart = new Audio(fempUrlStartAudio);
var audioNext = new Audio(fempUrlNextAudio);
var audioWin = new Audio(fempUrlWinAudio);

// preLoad all images
var noTarget = [];
var targetClicked = false;
// Put all no target images on array
for(var i = 0; i < 5; i++){
  noTarget[i] = new Image();
  noTarget[i].src = fempUrlNoTarget[i];
}

function preLoad(){

  loadNoTarget();
  loadTarget();
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
    // Do start counter
    fempStarted = true;
    fempResetCanvas();
    preLoad();
    audioStart.play();
  }
}
function fempResetCanvas(){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = '#FDF8EA';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
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
  for(var l = 0; l < 35; l++){
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
var touchCount = 0;
var touchCounter = document.getElementById('femp-touch');
touchCounter.innerHTML = touchCount;
var remainingLevels = 10;// Do get shortcode value
var remainingCounter = document.getElementById('femp-remaining');
remainingCounter.innerHTML = remainingLevels - fempLevel;
var remainingCounterP = document.getElementById('femp-remaining-p');

function detectTouchedTarget(event){
  // Record number of touches
  touchCount++;
  touchCounter.innerHTML = touchCount;

  var xCoord = event.layerX;
  var yCoord = event.layerY;
  if((xCoord >= tCoordX && xCoord <= (tCoordX + fempImgsSize))&&(yCoord >= tCoordY && yCoord <= (tCoordY + fempImgsSize))){
    fempResetCanvas();
    if(remainingLevels <= 1){
      // Do stop counter
      remainingCounterP.classList.add('femp-d-none');
      audioWin.currentTime = 0;
      audioWin.play();
      fempResetCanvas();
    }else{
      targetClicked = true;
      preLoad();
      remainingLevels--;
      fempLevel++;
      remainingCounter.innerHTML = remainingLevels;
      audioNext.currentTime = 0;
      audioNext.play();
    }
  }
}

// Add fade in animation class
window.onload = function(){
  var fempFadeIn = document.getElementById('femp-page');
  fempFadeIn.classList.add("femp-faded");
  var fempFadeIn = document.getElementById('femp-bg');
  fempFadeIn.classList.add("femp-faded");
  var fempFadeIn = document.getElementById('femp-counter');
  fempFadeIn.classList.add("femp-faded");
}
