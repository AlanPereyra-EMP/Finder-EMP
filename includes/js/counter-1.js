var ms = 0;
var s = 0;
var m = 0;
var msFinal = 00;
var sFinal = 00;
var mFinal = 00;
var fempCounter;
var msDisplay = document.getElementById('femp-mili');
var sDisplay = document.getElementById('femp-sec');
var mDisplay = document.getElementById('femp-min');

// Reset counter
function resetCounter() {
  ms = 0;
  s = 0;
  m = 0;
  msFinal = 00;
  sFinal = 00;
  mFinal = 00;
  displayCounter();
}

// Star counter
function counter(){
  fempCounter = setInterval(() => {
    ms++;
    msFinal = ('0' + ms).slice(-2);
    msDisplay.innerHTML = msFinal;
    if(ms>99){
      ms = 0;
      s++;
      sFinal = ('0' + s).slice(-2);
      sDisplay.innerHTML = sFinal;
    }
    if(s>59){
      s = 0;
      m++;
      mFinal = ('0' + m).slice(-2);
      mDisplay.innerHTML = mFinal;
    }
  }, 10);
}

// Print nombers on counter display
function displayCounter() {
  msDisplay.innerHTML = ('0' + ms).slice(-2);
  sDisplay.innerHTML = ('0' + s).slice(-2);
  mDisplay.innerHTML = ('0' + m).slice(-2);
}
displayCounter();
