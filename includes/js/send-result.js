// Gives the username and time, then send the data to the server
var fempForm;
function printForm(data){
  var xCoord = event.layerX;
  var yCoord = event.layerY;
  fempStarted = false;// Reset game

  fempForm = document.getElementById('femp-form');
  fempForm.addEventListener('submit', function(e){
    e.preventDefault();
  });

  var name = `<p><input type="text" name="name" placeholder="Nombre" required minlength="3" maxlength="60"></p>`;
  var chrono = `<input id="femp-hidden" name="chrono" type="hidden">`;
  var touches = `<input id="femp-touches" name="touches" type="hidden">`;
  if(data.phone){
    var contact = `<p><input type="number" name="contact" placeholder="Teléfono" required></p>`;
  }else {
    var contact = `<input name="contact" type="hidden" value="">`;
  }
  var button = `<button class="femp-btn-success" type="submit" onclick="fempPost();">Enviar</button>`;
  var reset = `<button onclick="fempConfig();">Volver a intentar</button>`;
  fempForm.innerHTML = `${name}${contact}${chrono}${touches}<span>${button}${reset}</span>`;
}

function fempPost() {
  fempHidden = document.getElementById('femp-hidden');
  fempHidden.value = `${mFinal}${sFinal}${msFinal}`;
  fempTouches = document.getElementById('femp-touches');
  fempTouches.value = `${touchCount}`;
  fempForm = document.getElementById('femp-form');

  var fempResult = new FormData(fempForm);
  fempResult.append( 'action', 'femp_send_data' );

  // TODO: Add charge animation
  fempForm.innerHTML = '';
  fempResetCanvas();
  fempTextCanvas('#262626', 'center', '30px', 'Cargando...', 30, 10);


  fetch(fempAjax.url, {
    method: 'POST',
    mode: 'same-origin',
    body: fempResult,
  })
    .then(res => res.json())
    .then(data => {

      fempForm.innerHTML = '';
      fempResetCanvas();

      fempTextCanvas('#262626', 'center', '30px', 'Top 5', 28, -100);

      ctx.textAlign = "left";
      ctx.font = "20px Varela Round";

      console.log(data);
      var space = -35;
      for(var i = 0; i < 5; i++){
        if(data[i]){
          var chrono = data[i].chrono;
          chrono = ('00000' + chrono).slice(-6)
          mChrono = chrono.substring(0, 2);
          sChrono = chrono.substring(2, 4);
          msChrono = chrono.substring(4, 6);

          ctx.fillText((i+1)+') '+data[i].name, (xCenter - 115), (yCenter+(space-15)));
          ctx.fillText(mChrono+':'+sChrono+':'+msChrono, (xCenter + 75), (yCenter+(space-15)));
          space = (space+50);
        }
      }
    })
    .then(res => {
      ctx.font = "15px Varela Round";
      ctx.textAlign = "center";
      ctx.fillText("Volver a intentarlo", (xCenter + 28), (yCenter * 2.2));
      canvas.addEventListener("mousedown", fempTableReset);
      function fempTableReset(){
        var xCoord = event.layerX;
        var yCoord = event.layerY;
        if(((xCoord > (xCenter - 115)) && (xCoord < (xCenter + 75))) && (yCoord > (yCenter * 2.1))){
          fempConfig();
          canvas.removeEventListener("mousedown", fempTableReset);
        }
      }
    });
}
