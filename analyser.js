var loop;
var canvasContext=document.getElementById("micanvas");

var pulseAnalyser = new Tone.Analyser("waveform", 1024);
var pulseContext = document.querySelector('#micanvas').getContext('2d');

//var pulseGradient = pulseContext.createLinearGradient(0, 0, canvasWidth, canvasHeight);
//pulseGradient.addColorStop(0, '#322982');
//pulseGradient.addColorStop(1, '#B742CB');

function espectra(a){
  drawWave(pulseContext, pulseAnalyser.analyse());
  loop=requestAnimationFrame(espectra);
  if(visualActivo!=1){cancelAnimationFrame(loop)}
}

function drawWave(context, values){
  context.clearRect(0, 0, amp, alt);
  context.beginPath();
  context.lineJoin = "round";
  context.lineWidth = 1;
  context.strokeStyle = "green";//gradient
  context.moveTo(0, (values[0] / 255) * alt);
  for (var i = 1, len = values.length; i < len; i++){
    var val = values[i] / 255;
    var x = amp * (i / len);
    var y = val * alt;
    context.lineTo(x, y);
  }
  context.stroke();
}
sinte.fan(pulseAnalyser);
