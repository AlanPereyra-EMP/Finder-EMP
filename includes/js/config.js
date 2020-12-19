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
