// Gives the username and time, then send the data to the server
function printForm(data){
  fempStarted = false;// Reset game

  var fempForm = document.getElementById('femp-form-div');
  fempForm.addEventListener('submit', function(e){
    e.preventDefault();
  });

  var name = `<p><input type="text" name="name" placeholder="Nombre"></p>`;
  var hidden = `<input id="femp-hidden" name="hidden" type="hidden">`;
  if(data.competition){
    var dni = `<p><input type="number" name="dni" placeholder="DNI" min="1000000" max="60000000"></p>`;
  }else {
    var dni = `<input name="dni" type="hidden" value="">`;
  }
  var button = `<button class="femp-btn-success" type="submit" onclick="fempPost();">Enviar</button>`;
  var reset = `<button onclick="fempConfig();">Volver a intentar</button>`;
  fempForm.innerHTML = `<form id="femp-form">${name}${hidden}${dni}<span>${button}${reset}</span></form>`;
}

function fempPost() {
  fempHidden = document.getElementById('femp-hidden');
  fempHidden.value = `${m}:${s}:${ms}`;
  var fempForm = document.getElementById('femp-form');
  var fempResult = new FormData(fempForm);
  fetch(fempUrl+'/includes/json/json.php', {
    method: 'POST',
    body: fempResult
  })
    .then(res => {
      alert('ok');
      // Do create position table with json data
      // Do print top 5 position table on canvas
    })
}
