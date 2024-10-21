const myCanvas = document.getElementById("drawing-canvas");
const clearButton = document.getElementById("clear-canvas");
const colorSelector = document.getElementById("color-selector");
const myButtons = document.getElementsByName("radio-list");

const ctx = myCanvas.getContext("2d"); // giving the canvas 2d context
myCanvas.addEventListener('mousedown', startDraw);
myCanvas.addEventListener('mouseup', stopDraw);
myCanvas.addEventListener('mousemove', draw);
clearButton.addEventListener('click', clearCanvas);
colorSelector.addEventListener('change', colorSelection);

let drawing = false;
let currentColor = 'black'; // Default color
let lineWidth = 5; // Increase line width for visibility

function startDraw(event) {
    drawing = true;
    draw(event);
}

function stopDraw() {
    drawing = false;
    ctx.beginPath(); // Reset path for the next line
}

function draw(event) {
    if (!drawing) return;

    ctx.lineWidth = lineWidth; // Set the line width
    ctx.lineCap = 'round'; 
    ctx.strokeStyle = currentColor; 

    
    const rect = myCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineTo(x, y); // Draw a line to the current position
    ctx.stroke(); // Render the line
    ctx.beginPath(); 
    ctx.moveTo(x, y); 
}

function clearCanvas(event) {
    event.preventDefault(); 
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // Clear the canvas
}

function colorSelection(event) {
    currentColor = event.target.value; // Set selected color
}