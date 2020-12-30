function fempResetCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FDF8EA';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function fempTextCanvas(color, txtAlign, fSize, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = fSize+" Varela Round";
  ctx.textAlign = txtAlign;
  ctx.fillText(text, (xCenter + x), (yCenter + y));
}

function femp(data) {
  // Detects center of canvas
  imgSize = data.imgSize;
  yCenter = (canvas.height/2)-(imgSize/2);
  xCenter = (canvas.width/2)-(imgSize/2);

  // Draws start message with target in the center
  ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FDF8EA';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#262626';
  ctx.font = "15px Varela Round";
  ctx.textAlign = "center";
  ctx.fillText("Tocá el objeto para comenzar", (xCenter + 28), (yCenter /1.4));
  // ctx.fillText("Tocá el objeto para comenzar", (xCenter + 28), (yCenter * 1.7));
  ctx.font = "20px Varela Round";
  ctx.textAlign = "center";
  ctx.fillText("Ver top 5", (xCenter + 28), (yCenter * 2.2));

  // TODO: Add fetch and get top 5 positions then add button to use this data
  function startTop5(){
    fempResetCanvas();
    fempTextCanvas('#262626', 'center', '30px', 'Cargando...', 30, 10);

    var fempResult = new FormData(fempForm);
    fempResult.append( 'action', 'femp_top5' );

    fetch(fempAjax.url, {
      method: 'POST',
      mode: 'same-origin',
      body: fempResult,
    })
      .then(res => res.json())
      .then(data => {
        winner = true;
        fempTop(data);
      })
  }

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

    }else if (((x > (xCenter - 135)) && (x < (xCenter + 95))) && (y > (yCenter * 2.1))) {
      fempStarted = true;

      startTop5();
    }
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
  var tCoordX;
  var tCoordY;
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
  touchCount = 0;
  var touchCounter = document.getElementById('femp-touch');
  touchCounter.innerHTML = touchCount;

  var fempLevel = 0;
  var remainingCounter = document.getElementById('femp-remaining');
  remainingCounter.innerHTML = data.levels - fempLevel;

  var remainingCounterP = document.getElementById('femp-remaining-p');

  var winner = false;
  function detectTouchedTarget(){
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
  var fempForm = document.getElementById('femp-form');
  fempForm.innerHTML = '';

}

// Add fade in animation class
window.onload = function(){
  var fempFadeIn = document.getElementById('femp-page');
  fempFadeIn.classList.add("femp-faded");
  fempFadeIn.classList.remove("femp-d-none");
  var fempFadeIn = document.getElementById('femp-bg');
  fempFadeIn.classList.add("femp-faded");
  var fempFadeIn = document.getElementById('femp-counter');
  fempFadeIn.classList.add("femp-faded");

  // Disable user-scalable attribute in iOS
  document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
  });
}
