document.addEventListener('deviceready', startApp, false);

var app = {
  view: 1,
  bleId:'',
  initialize: function() {
    return new Promise(function(resolve) {
      resolve();
    })
  },
  onDeviceReady: function() {
    app.loadView(1).then(app.initButtons);
    this.connectToBLE();
    $('.icon-settings').on('click', () => app.loadView((app.view === 1? 2:1)).then(app.initButtons()));
  },
  initButtons: function() {
    $('button[name="on"]').on('click', () => {
      console.log("Turning on ", $('input[name="relays"]').val());
      writeBLE('r,hani,' + $('input[name="relays"]').val() +',1' ,this.bleId);
    });
    $('button[name="off"]').on('click', () => {
      console.log("Turning off ", $('input[name="relays"]').val());
      writeBLE('r,hani,' + $('input[name="relays"]').val() +',0' ,this.bleId);
    });
    $('button[name="sendSettings"]').on('click', () => {
      console.log("Sending Settings ", $('input[name="password"]').val(), $('input[name="longititude"]').val(), $('input[name="lantitude"]').val(), $('input[name="jd"]').val());
    })
  },
  loadView: function(id) {
    app.view = id;
    switch (id) {
      case 1:
        $('.app').html('<img src="./img/logo.png"><input type="number" name="relays" min="1" max="42" value="1"><div class="inline-buttons"><button name="on">Turn On</button><button name="off">Turn Off</button></div>')
        break;
      case 2:
        $('.app').html('<input type="text" name="password" placeholder="Password"><input type="number" name="long" placeholder="Longitude"><input type="number" name="lat" placeholder="Latitude"><input type="number" name="jd" placeholder="Julian Date"><button name="sendSettings">Send Settings</button>')
        break;
    }
    return new Promise(function(resolve, reject) {
      resolve(app.mode);
    });
  },
  connectToBLE: function() {
    ble.enable(function() {}, function() {});
    ble.stopScan(function() {}, function() {});
    startBLE();
  },
  pad: function(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  },
};
function startApp() {
  app.initialize().then(app.onDeviceReady);
}
