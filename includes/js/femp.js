function femp(data) {
  // Get canvas
  const canvas = document.getElementById('femp-bg');

  // Detects center of canvas
  const imgSize = data.imgSize;
  const yCenter = (canvas.height/2)-(imgSize/2);
  const xCenter = (canvas.width/2)-(imgSize/2);

  // Draws start message with target in the center
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FDF8EA';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#262626';
  ctx.font = "15px Varela Round";
  ctx.textAlign = "center";
  ctx.fillText("El objeto a encontrar es el siguiente:", (xCenter + 28), (yCenter /1.5));
  ctx.fillText("Tocá el objeto para comenzar", (xCenter + 28), (yCenter * 1.7));

  ctx.drawImage(target, xCenter, yCenter);
  target.addEventListener("load", renderTargetStart);
  function renderTargetStart() {
    ctx.drawImage(target, xCenter, yCenter);
  }

  // Detects clicks position on canvas
  canvas.addEventListener("mousedown", ifFempStated);

  // Detect if game was started
  var fempStarted = false;

  function ifFempStated(){
    let x = event.layerX;
    let y = event.layerY;
    if (fempStarted) {
      detectTouchedTarget(event);
    }else if(((x >= xCenter && x <= (xCenter + imgSize))&&(y >= yCenter && y <= (yCenter + imgSize)))){
      counter();
      fempStarted = true;
      fempResetCanvas();
      loadAllImgs();
      audioStart.play();
    }
  }


  function fempResetCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FDF8EA';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Get random position with separation between images
  function getRandomPositionX(){
    var ctxMaxWidth = canvas.width - imgSize;
    var maxNumberImg = ctxMaxWidth/imgSize;
    var random = (Math.floor(Math.random() * (maxNumberImg - 0 + 1) + 0))* imgSize;
    return random;
  }
  function getRandomPositionY(){
    var ctxMaxHeight = canvas.height - imgSize;
    var maxNumberImg = ctxMaxHeight/imgSize;
    var random = (Math.floor(Math.random() * (maxNumberImg - 0 + 1) + 0))* imgSize;
    return random;
  }

  // Render all images on random position
  function loadAllImgs(){
    for(var l = 0; l < 35; l++){
      for(var i = 0; i <= data.imgNumb; i++){
        let x = getRandomPositionX();
        let y = getRandomPositionY();
        ctx.drawImage(noTarget[i], x, y);
      }
    }
    let x = getRandomPositionX();
    let y = getRandomPositionY();
    setTimeout(renderTarget, 50);
    function renderTarget() {
      ctx.drawImage(target, x, y)
    }
    // Saves the target coordinates in previus created variables
    tCoordX = x;
    tCoordY = y;
  }

  // Detects if the target has been touched and reset the level
  var touchCount = 0;
  var touchCounter = document.getElementById('femp-touch');
  touchCounter.innerHTML = touchCount;

  var fempLevel = 0;
  var remainingCounter = document.getElementById('femp-remaining');
  remainingCounter.innerHTML = data.levels - fempLevel;

  var remainingCounterP = document.getElementById('femp-remaining-p');

  var winner = false;
  function detectTouchedTarget(event){
    // Saves number of touches
    if(!winner){
      touchCount++;
    }
    touchCounter.innerHTML = touchCount;

    var xCoord = event.layerX;
    var yCoord = event.layerY;
    if((xCoord >= tCoordX && xCoord <= (tCoordX + imgSize))&&(yCoord >= tCoordY && yCoord <= (tCoordY + imgSize))){
      if(data.levels <= 1 && !winner){
        winner = true;
        clearInterval(fempCounter);// Stops counter
        remainingCounterP.classList.add('femp-d-none');
        // Win sound
        audioWin.currentTime = 0;
        audioWin.play();
        // Win message
        fempResetCanvas();
        ctx.fillStyle = '#262626';
        ctx.font = "25px Varela Round";
        ctx.textAlign = "center";
        ctx.fillText("Felicidades,", (xCenter + 28), (yCenter/2.4));
        ctx.fillText("Completaste el juego!!", (xCenter + 28), (yCenter/1.7));
        ctx.font = "15px Varela Round";
        ctx.fillText("Tu tiempo fue:", (xCenter + 28), (yCenter * 2.2));
        // Do give the username and time, then send the data to the server
        printForm(data);
      }else if(data.levels > 1){
        fempResetCanvas();
        loadAllImgs();
        data.levels--;
        fempLevel++;
        remainingCounter.innerHTML = data.levels;
        audioNext.currentTime = 0;
        audioNext.play();
      }
    }
  }

  // Prevent form display when game is starting
  var fempForm = document.getElementById('femp-form-div');
  fempForm.innerHTML = '';

  // Add fade in animation class
  window.onload = function(){
    var fempFadeIn = document.getElementById('femp-page');
    fempFadeIn.classList.add("femp-faded");
    fempFadeIn.classList.remove("femp-d-none");
    var fempFadeIn = document.getElementById('femp-bg');
    fempFadeIn.classList.add("femp-faded");
    var fempFadeIn = document.getElementById('femp-counter');
    fempFadeIn.classList.add("femp-faded");
  }
}
