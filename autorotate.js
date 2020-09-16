
// Initialize viewer.
var panoElement = document.querySelector('#pano');
var data = window.APP_DATA;
// Viewer options.
var viewerOpts = {
  controls: {
    mouseViewMode: data.settings.mouseViewMode
  }
};
var viewer = new window.Marzipano.Viewer(panoElement, viewerOpts);
var autorotateToggleElement = document.querySelector('#autorotateToggle');


// Set up autorotate, if enabled.
var autorotate = Marzipano.autorotate({
  yawSpeed: 0.03,
  targetPitch: 0,
  targetFov: Math.PI/2
});
if (data.settings.autorotateEnabled) {
  autorotateToggleElement.classList.add('enabled');
}


function toggleAutorotate() {
    if (autorotateToggleElement.classList.contains('enabled')) {
      autorotateToggleElement.classList.remove('enabled');
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add('enabled');
      startAutorotate();
    }
  }

// Set handler for autorotate toggle.
autorotateToggleElement.addEventListener('click', toggleAutorotate);

function startAutorotate() {
  if (!autorotateToggleElement.classList.contains('enabled')) {
    return;
  }
  viewer.startMovement(autorotate);
  viewer.setIdleMovement(3000, autorotate);
}

function stopAutorotate() {
  viewer.stopMovement();
  viewer.setIdleMovement(Infinity);
}
