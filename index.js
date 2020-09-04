import { Game } from "./src/Game.js";


function end(fps, panic) {
    fpsCounter.textContent = Math.round(fps) + ' FPS';
    if (panic) {
        var discardedTime = Math.round(MainLoop.resetFrameDelta());
        console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
    }
}


// Set up the canvas.
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const fpsCounter = document.getElementById('fpscounter');
const fpsValue = document.getElementById('fpsvalue');

//hard code canvas width and height
canvas.width = 320;
canvas.height = 568;

const game = new Game();

canvas.addEventListener('mousemove', function(evt) {
    game.getMousePos(canvas.getBoundingClientRect(), evt);
}, false);

// Start the main loop.
//call game.update directly? 
MainLoop.setUpdate(game.update).setDraw(game.draw).setEnd(end).start();

// Update the slider value label while the slider is being dragged.
document.getElementById('fps').addEventListener('input', function() {
    fpsValue.textContent = Math.round(this.value);
});
// Throttle the FPS when the slider value is set.
document.getElementById('fps').addEventListener('change', function() {
    var val = parseInt(this.value, 10);
    MainLoop.setMaxAllowedFPS(val === 60 ? Infinity : val);
});