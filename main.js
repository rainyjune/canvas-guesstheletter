// Init the app after page loaded.
window.onload = initPage;

var debug = true;

var config = {
  text: {
    "message": "Guest The Letter From a (lowser) to z (higher)",
    "guess": "Guesses:",
    "hint": "Higher Or Lower:",
    "guessed": "Letters Guessed:",
    "export": "Export Canvas Image"
  }
};

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

  // Background color
  ctx.fillStyle = "rgb(255, 255, 170)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // box border
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

  // Message
  ctx.fillStyle = "red";
  ctx.font = "14px Sans-Serif";
  ctx.fillText(t("message"), 100, 50);

  // Guesses
  ctx.fillStyle = "green";
  ctx.font = "16px Sans-Serif";
  ctx.fillText(t("guess"), 210, 70);

  // Higher Or Lower 
  ctx.fillStyle = "black";
  ctx.font = "16px Sans-Serif";
  ctx.fillText(t("hint"), 170, 170);

  // Letters Guessed
  ctx.fillStyle = "red";
  ctx.font = "16px Sans-Serif";
  ctx.fillText(t("guessed"), 10, 370);
}

function t(text) {
  return typeof config["text"][text] !== "undefined" ? config["text"][text] : "";
}

// Does the browser support HTML5 Canvas ?
function canvasSupport() {
  var canvas = document.createElement("canvas");
  return !!(canvas.getContext && canvas.getContext("2d"));
} 

// A simple debugging tool.
function log() {
  if (!debug) return ;
  var args = Array.prototype.slice.call(arguments);
  if (window.console && window.console.log) {
    console.log.apply(console, args);
  } else {
    alert(args.join("\n"));
  }
}
