const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const audioElement = document.querySelector('audio');
const track = audioContext.createMediaElementSource(audioElement);

//AUDIO ANALYSER
const analyser = audioContext.createAnalyser();

//CANVAS
let canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
let canvasCtx = canvas.getContext('2d');

//CONNECTIONS
track.connect(analyser);
track.connect(audioContext.destination);

//FFT - FAST FOURIER TRANSFORM
analyser.fftSize = 256;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

//CIRCLE
let centerX = WIDTH / 2;
let centerY = HEIGHT / 2;

//BAR LOCATION
let deg = (Math.PI * 2 / bufferLength);
let radius = 60;

function renderFrame() {
    requestAnimationFrame(renderFrame);

    //Put Sound Data into dataArray
    analyser.getByteFrequencyData(dataArray);

    //Background
    canvasCtx.fillStyle = "#000000";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    //Draw the Circle
    canvasCtx.beginPath();
    canvasCtx.arc(centerX, centerY, radius, 0, 2*Math.PI);
    canvasCtx.fill();

    for (var i = 0; i < bufferLength; i++) {
        let bar_height = dataArray[i]*2;

        //Start of each bar and the end
        let x = centerX + Math.cos(deg*i)* (radius);
        let y = centerY + Math.sin(deg*i) * (radius);
        let x_end = centerX + Math.cos(deg*i)*(radius + bar_height);
        let y_end = centerY + Math.sin(deg*i)*(radius + bar_height);    
        
        drawBar(x, y, x_end, y_end, 6, dataArray[i]);
    }

}

// for drawing a bar
function drawBar(x1, y1, x2, y2, width,frequency){
    var lineColor = "rgb(" + frequency + ", " + 220 + ", " + 255 + ")";
    canvasCtx.strokeStyle = lineColor;
    canvasCtx.lineWidth = width;

    canvasCtx.beginPath();
    canvasCtx.moveTo(x1,y1);
    canvasCtx.lineTo(x2,y2);
    canvasCtx.stroke();
    
}

//USER UPLOAD AUDIO

document.getElementById('uploadedAudio').addEventListener('change', function(event){
    let file = this.files[0];
    const fileURL = URL.createObjectURL(file);

    audioElement.src = fileURL;
});

// Play button functionality
const playButton = document.querySelector('button');
playButton.addEventListener('click', function() {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
        this.innerHTML = 'Pause';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
        this.innerHTML = 'Play';
    }

}, false);

renderFrame();

