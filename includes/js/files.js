const fempUrlStartAudio = fempUrl +'/includes/sounds/WoodPlankFlicks.mp3';
const fempUrlNextAudio = fempUrl +'/includes/sounds/MetallicClank.mp3';
const fempUrlWinAudio = fempUrl +'/includes/sounds/456966__funwithsound__success-fanfare-trumpets.mp3';
const audioStart = new Audio(fempUrlStartAudio);
const audioNext = new Audio(fempUrlNextAudio);
const audioWin = new Audio(fempUrlWinAudio);


// Load Target
const fempUrlTarget = fempUrl +'/includes/images/target.svg';
const target = new Image();
target.src = fempUrlTarget;

// Load no target
var noTarget = [];
var fempUrlNoTarget = [];

function fempFiles(data) {
  for(var i = 0; i<= data.imgNumb; i++){
    fempUrlNoTarget[i] = fempUrl + '/includes/images/no-target-' + i + '.svg';
    noTarget[i] = new Image();
    noTarget[i].src = fempUrlNoTarget[i];
  }
}
