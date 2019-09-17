if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

var getJSON = function(url, callback) {
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', url, true);
  req.onload  = function() {
    callback(null, req.response);
  };
  req.send(null);
};

function takeTip() {
  getJSON('src/tips.json', function(err, data) {
    if (err !== null) {
      console.log('Ocorreu um erro' + err);
    } else {
      var min=0; 
      var max=19; 
      var random = Math.floor(Math.random() * (+max - +min)) + +min;    
      document.getElementById("tip-content").innerHTML = data[random].value;
    }
  });
}