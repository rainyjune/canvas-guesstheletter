// Init the app after page loaded.
window.onload = initPage;

var debug = true;

// The entry function.
function initPage() {
  if (!canvasSupport()) { // If Canvas is not supported on the browser, do nothing but tell the user.
    alert("Sorry, your browser does not support HTML5 Canvas");
    return false;
  }
  drawScreen();
}

function drawScreen() {
  var canvas = document.getElementById("theCanvas");
  if (!canvas) {
    throw new Error("The canvas element does not exists!");
  }
  var ctx = canvas.getContext("2d");
}

// Does the browser support HTML5 Canvas ?
function canvasSupport() {
  var canvas = document.createElement("canvas");
  return !!(canvas.getContext && canvas.getContext("2d"));
} 

function log() {
  if (!debug) return ;
  var args = Array.prototype.slice.call(arguments);
  if (window.console && window.console.log) {
    console.log.apply(console, args);
  } else {
    alert(args.join("\n"));
  }
}
