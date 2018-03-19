var estiraH=10;
var estiraV=4;
var altitud=0;
// valores no ajustables
var moviment=1;
var horizon=0;
var  analyser=Tone.context.createAnalyser();
var canvas = canvasContext;
canvas.width=amp;
canvas.height=alt-20;

var canvasCtx=canvas.getContext("2d");

function spectra(a){
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 1;
  sinte.connect(analyser);
}

//canvasCtx.clearRect(0, 0, canvasCtx.width, canvasCtx.height);

function estiraHf(a){
  estiraH+=a/10;
  if(estiraH>40){estiraH=40}else if(estiraH<1){estiraH=1}
  log("h: "+estiraH)
}
function estiraVf(a){
  estiraV+=a/10;
  if(estiraV>40){estiraV=40}else if(estiraV<0.1){estiraV=0.1}
  log("v: "+estiraV)
}

function altitudf(a){
  altitud-=a*10;
  if(altitud>alt*12){altitud=alt*12}else if(altitud<-alt){altitud=-alt}
  //log("height: "+altitud)
  log("altitud: "+altitud)
}



function draw() {// draw an oscilloscope of the current audio source
  var now=new Date().getTime();
  if(now-before>50){log("NOT DRAWING THIS ONE");return}
  drawVisual = requestAnimationFrame(draw);

    //if(arrNotas.length==0&&arrMotive.length==0){return}
  var bufferLength = analyser.fftSize;
  var dataArray = new Uint8Array(bufferLength);

  analyser.getByteTimeDomainData(dataArray);
  //canvasCtx.clearRect(0, 0, canvasCtx.width, canvasCtx.height);
  //horizon+=moviment;
  //canvasCtx.fillStyle = 'rgba(0,0,0,0.4)';
  //canvasCtx.fillRect(0, 0, amp, alt);
  canvasCtx.lineWidth = 6;
  canvasCtx.strokeStyle = 'rgb(256, 0, 0)';
  canvasCtx.beginPath();

  var sliceWidth = amp * 1.0 / bufferLength;
  var x = 0;

  for(var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 128.0;
    var y = v * alt +altitud;

    if(i === 0) {
      canvasCtx.moveTo(x*estiraH, y*estiraV);
    } else {
      canvasCtx.lineTo(x*estiraH, y*estiraV);
    }
    x += sliceWidth;
  }
  canvasCtx.lineTo(canvas.width+24, canvas.height);
  canvasCtx.lineTo(0, canvas.height);
  canvasCtx.fillStyle="green";//"rgba(126,104,3,.9)";
  canvasCtx.fill();
  var before = now
};
draw();


function visual(n){
 visualActivo=n;
 if(visualActivo==1){
   draw()
 }else{
   cancelAnimationFrame(drawVisual)}
}
