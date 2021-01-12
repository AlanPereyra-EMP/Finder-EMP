// Star counter
function counter(){
  countdown(Date.now(), 'femp-counter-p');
}

const getTime = deadline => {
  let now = new Date(),
      time = (new Date(deadline) - now) / 17,
      miliSeconds = ('0' + Math.abs(Math.floor(time % 59))).slice(-2),
      seconds = ('0' + Math.abs(Math.floor(time / 60 % 59))).slice(-2),
      minutes = ('0' + Math.abs(Math.floor(time / 3600) + 1)).slice(-2)

  return {
    now,
    miliSeconds,
    seconds,
    minutes
  }
};

var fempCounter;
var t;

const countdown = (deadline,elem) => {
  const el = document.getElementById(elem);

  fempCounter = setInterval( () => {
    t = getTime(deadline);
    el.innerHTML = `${t.minutes}:${t.seconds}:${t.miliSeconds}`;

  }, 10)
};
