// Init the app after page loaded.
window.onload = initPage;

var debug = true;

var config = {
  text: {
    "message": "Guest The Letter From a (lowser) to z (higher)",
    "guess": "Guesses:",
    "hint": "Higher Or Lower:",
    "guessed": "Letters Guessed:",
    "export": "Export Canvas Image",
    "inValidChar": "That is not a letter",
    "higher": "Higher",
    "lower": "Lower",
    "gameover": "You got it!",
    "export": "Export Canvas Image",
    "replay": "Play Again"
  }
};

// The entry function.
function initPage() {
  if (!canvasSupport()) { // If Canvas is not supported on the browser, do nothing but tell the user.
    alert("Sorry, your browser does not support HTML5 Canvas");
    return false;
  }
  canvasApp();
}

function canvasApp() {
  var canvas = document.getElementById("theCanvas"),
      ctx = canvas.getContext("2d"),
      gameOver,
      higherOrLower,
      guessedCount,
      guessedChars,
      allowedChars = range("a", "z"),
      userInputChar,
      correctCharIndex,
      correctChar;

  var exportBtn = document.getElementById("exportBtn"),
      replayBtn = document.getElementById("replayBtn");
        

  exportBtn.innerHTML = t("export");
  replayBtn.innerHTML = t("replay");

  addEventListeners();

  initGame();


  function initGame() {
    gameOver = false;
    higherOrLower = "";
    guessedCount = 0;
    guessedChars = [];
    userInputChar = null;
    correctCharIndex = null;
    correctChar = getRandomChar();
    drawScreen();
    log("The correct char:", correctChar);
  }



  function drawScreen() {
    // Background color
    ctx.fillStyle = "rgb(255, 255, 170)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // box border
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    // Date
    ctx.fillStyle = "gray";
    ctx.font = "12px Sans-Serif";
    ctx.fillText((new Date()).toLocaleString(), 200, 25);

    // Message
    ctx.fillStyle = "red";
    ctx.font = "14px Sans-Serif";
    ctx.fillText(t("message"), 100, 45);

    // Guesses
    ctx.fillStyle = "green";
    ctx.font = "16px Sans-Serif";
    ctx.fillText(t("guess") + guessedCount, 210, 70);

    // Higher Or Lower 
    ctx.fillStyle = "black";
    ctx.font = "16px Sans-Serif";
    ctx.fillText(t("hint") + higherOrLower, 150, 130);

    // Letters Guessed
    ctx.fillStyle = "red";
    ctx.font = "16px Sans-Serif";
    ctx.fillText(t("guessed") + guessedChars.join(','), 10, 250);
    
    if (gameOver) {
      ctx.fillStyle = "red";
      ctx.font = "40px Sans-Serif";
      ctx.fillText(t("gameover"), 150, 190);
    }
  }

  function addEventListeners() {
    document.addEventListener("keydown", function(event) {
      if (gameOver) return;
      var userInputChar = String.fromCharCode(event.keyCode).toLowerCase();
      guessedCount++;
      guessedChars.push(userInputChar);
      
      if (userInputChar === correctChar) {
        gameOver = true;
      } else {
        // Is it a allowed char ?
        var letterIndex = allowedChars.indexOf(userInputChar);
        if (letterIndex === -1) {
          higherOrLower = t("inValidChar");
        } else if (letterIndex > correctCharIndex) {
          higherOrLower = t("lower");
        } else {
          higherOrLower = t("higher");
        }
      }
      drawScreen();
    }, false);

    exportBtn.addEventListener("click", function(event){
      debugger; 
      var ts = (new Date()).valueOf();
      downloadWithName(canvas.toDataURL(), "canvas" + ts + ".png");
    }, false);

    replayBtn.addEventListener("click", function(event) {
      initGame();
    }, false);
  }

  function getRandomChar() {
    var random = rand(0, allowedChars.length - 1);
    correctCharIndex = random;
    return allowedChars[random];
  }

  function t(text) {
    return typeof config["text"][text] !== "undefined" ? config["text"][text] : "";
  }

  function downloadWithName(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;

    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(evt);
  }

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

//http://phpjs.org/functions/range/
function range(low, high, step) {

  var matrix = [];
  var inival, endval, plus;
  var walker = step || 1;
  var chars = false;

  if (!isNaN(low) && !isNaN(high)) {
    inival = low;
    endval = high;
  } else if (isNaN(low) && isNaN(high)) {
    chars = true;
    inival = low.charCodeAt(0);
    endval = high.charCodeAt(0);
  } else {
    inival = (isNaN(low) ? 0 : low);
    endval = (isNaN(high) ? 0 : high);
  }

  plus = ((inival > endval) ? false : true);
  if (plus) {
    while (inival <= endval) {
      matrix.push(((chars) ? String.fromCharCode(inival) : inival));
      inival += walker;
    }
  } else {
    while (inival >= endval) {
      matrix.push(((chars) ? String.fromCharCode(inival) : inival));
      inival -= walker;
    }
  }

  return matrix;
}
//http://phpjs.org/functions/rand/
function rand(min, max) {
  var argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  } else if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
