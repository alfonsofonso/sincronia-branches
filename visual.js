//visual.js

var displaying=true;
var keys=true;
var consola=document.getElementById("console");
var arr=[];
var amp=0;
var alt=0;
var radio=0;//hipotenusa del canvas
var margen=100;

var stage = new createjs.Stage("micanvas");
var canvasContext=document.getElementById("micanvas");
stage.mouseEnabled=false;
var funVisuals=[];////// visuales
var visualActivo=0;
var lines=0;
var arrTeclas=[];

createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.setFPS=60;
createjs.Ticker.addEventListener("tick", tick);


ponVisual=function(a){
  funVisuals[visualActivo](a);
}

escribe=function(t){/// input orders
  log(t);
  var i=document.getElementById("consola");
  i.value="";
  eval(t);
}

////// on init
function initVisual(){
  ajustaCanvas();
  funVisuals=[ponEstrella,spectra,ponPalabra,ponRayo];
  creaPalabras();
  window.document.onkeypress=function(){
    if(!keys){return}
    var n=Math.random()*44+44;
    tocanota(n,n);
    arrTeclas.push(n);log("keydown")
  }
  window.document.onkeyup=function(){
    for(var i=0;i<arrTeclas.length;i++){paranota(arrTeclas[i])}
  }
}

/////     HELPERS
function tick(event) {
  stage.update()}

window.onresize = function(event) {
  ajustaCanvas()
}

ajustaCanvas=function(){
  amp=canvasContext.width  = window.innerWidth;
  alt=canvasContext.height = window.innerHeight;
  radio= Math.round(Math.sqrt(amp*amp+alt*alt)/2);
  document.getElementById("pantalla").style.width=amp;
}

displayData=function(t){
	for (var i =0;i<arguments.length;i++){
		consola.value+="\n"+t[i]+" ";
		consola.scrollTop = consola.scrollHeight;
	}
  lines = consola.value.split('\n');

  if (lines.length>8){
    lines.shift();
    consola.value=lines.join("\n");
  }
}

function handleComplete(dispon) {
  dispon.removeAllEventListeners();
  stage.removeChild(dispon);
  dispon=null;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function log(args) {
  console.log(args);
  //console.info(arguments.callee.caller)
  if(displaying){displayData(arguments)}

}
