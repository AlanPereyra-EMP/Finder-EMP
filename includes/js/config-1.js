function fempConfig() {
  fetch(fempUrl+'/includes/json/config.json')
    .then(data => data.json())
    .then(data => {
      fempFiles(data);
      femp(data);
      resetCounter();
    });
}
fempConfig();

// Global variables
const canvas = document.getElementById('femp-bg');
var fempForm = document.getElementById('femp-form');
var ctx;
var imgSize;
var yCenter;
var xCenter;
var touchCount;
