var service_uuid = "0000180d-0000-1000-8000-00805f9b34fb";
var characteristic_uuid = "00002A37-0000-1000-8000-00805f9b34fb";
function startBLE() {
  ble.startScan([service_uuid], function(device) {
    ble.autoConnect(device.id, function() {
      app.bleId = device.id;
      alert("connected to BLE device");
    }, function() {});
  }, function() {
    alert("Device Not Found")
  });
}

function writeBLE(data, id) {
  ble.write(id, service_uuid, characteristic_uuid, stringToBytes(data), function() {}, function() {});
}

/* Drivers */
function stringToBytes(string) {
  var array = new Uint8Array(string.length);
  for (var i = 0, l = string.length; i < l; i++) {
    array[i] = string.charCodeAt(i);
  }
  return array.buffer;
}

function bytesToString(buffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
}
/* END Drivers */
