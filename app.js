const myCanvas = document.getElementById("drawing-canvas");
const clearButton = document.getElementById("clear-canvas");
const colorSelector = document.getElementById("color-selector");
const myButton1 = document.getElementById("lines");
const myButton2 = document.getElementById("circle");
const myButton3 = document.getElementById("rectangle");

const ctx = myCanvas.getContext("2d"); // giving the canvas 2d context
myCanvas.addEventListener('mousedown', startDraw);
myCanvas.addEventListener('mouseup', stopDraw);
clearButton.addEventListener('click', clearCanvas);
colorSelector.addEventListener('change', colorSelection);
myButton1.addEventListener('click',lineMode);
myButton2.addEventListener('click',circleMode);
myButton3.addEventListener('click',rectangleMode);

let drawing = false;
let currentColor = 'black'; // Default color

function startDraw(event) {
    drawing = true;
    const rect = myCanvas.getBoundingClientRect();
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
}

function stopDraw() {
    drawing = false;
    ctx.beginPath(); // Reset path for the next line
}
function clearCanvas(event) {
    event.preventDefault(); 
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // Clear the canvas
}

function colorSelection(event) {
    currentColor = event.target.value; // Set selected color
}

function lineMode(){ 
    myCanvas.addEventListener('mousemove', drawLine);
    function drawLine(event) {
        if (drawing===false) return;
        ctx.lineWidth = 5; // Set the line width
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
}
function circleMode(){
    myCanvas.addEventListener('mousemove', drawCircle);
    function drawCircle(event) {
        if (drawing===false) return;
        const rect = myCanvas.getBoundingClientRect();//circle drawing parameters
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const radius = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
}}
function rectangleMode(){
    myCanvas.addEventListener('mousemove', drawRectangle);
    function drawRectangle(event) {
        if (drawing===false) return;//rectangle drawing parameters
        const rect = myCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.rect(startX, startY, x - startX, y - startY);
        ctx.stroke();
        ctx.closePath();
            
}}