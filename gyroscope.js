//Gyroscopic Access
var deviceOrientationControlMethod = new DeviceOrientationControlMethod();
var enabled = false;
var toggleElement = document.querySelector('#toggleDeviceOrientation');
var controls = viewer.controls();
controls.registerMethod('deviceOrientation', deviceOrientationControlMethod);
var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);
var view = new Marzipano.RectilinearView(null, limiter);

function requestPermissionForIOS() {
window.DeviceOrientationEvent.requestPermission()
  .then(response => {
    if (response === 'granted') {
      enableDeviceOrientation()
    }
  }).catch((e) => {
    console.error(e)
  })
}

function enableDeviceOrientation() {
deviceOrientationControlMethod.getPitch(function (err, pitch) {
  if (!err) {
    view.setPitch(pitch);
  }
});
controls.enableMethod('deviceOrientation');
enabled = true;
autorotateToggleElement.classList.remove('enabled');
stopAutorotate();
toggleElement.className = 'enabled';
}

function enable() {
if (window.DeviceOrientationEvent) {
  if (typeof (window.DeviceOrientationEvent.requestPermission) == 'function') {
    requestPermissionForIOS()
  } else {
    enableDeviceOrientation()
  }
}
}

function disable(){
  controls.disableMethod('deviceOrientation');
  autorotateToggleElement.classList.add('enabled');
  startAutorotate();
  enabled = false;
  toggleElement.className = 'disabled';
}

function toggle(){
  if(enabled){
    disable();
  }
  else {
    enable();
  }
}

toggleElement.addEventListener('click',toggle);
