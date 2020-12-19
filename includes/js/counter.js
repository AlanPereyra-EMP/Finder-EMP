var ms = 0;
var s = 0;
var m = 0;
var fempCounter;
var msDisplay = document.getElementById('femp-mili');
var sDisplay = document.getElementById('femp-sec');
var mDisplay = document.getElementById('femp-min');

// Reset counter
function resetCounter() {
  ms = 0;
  s = 0;
  m = 0;
  displayCounter();
}

// Star counter
function counter(){
  fempCounter = setInterval(() => {
    ms++;
    msDisplay.innerHTML = ('0' + ms).slice(-2);
    if(ms>99){
      ms = 0;
      s++;
      sDisplay.innerHTML = ('0' + s).slice(-2);
    }
    if(s>59){
      s = 0;
      m++;
      mDisplay.innerHTML = ('0' + m).slice(-2);
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
