
// the rest
var NOTABASE=69;
var A,B,C,D,E,F,G;
var baseNotes=[];
var basicNotes=[];
var numPistas=0;
var reverbe=false;
var delai=false;
var mel=[];
var melo=[];
var v;
var vel=4;
var oct=1;


melodica=function(long,suma){
  if(long==undefined||long==null){
    if (mel.length==0){l=4}else{l=mel.length}
  }else{
    l=long;
  }

  var stilo=stilo||0;

  if(suma==undefined || suma== null){
    mel=[];
    melo=[];
  }

  for(var i=0;i<l;i++){
    var rand=Math.floor(Math.random()*8);

    mel.push(baseNotes[rand]);
    melo.push(basicNotes[rand])
  }
  console.log("melodia:",melo);
  v.notes(mel);
  v.mel=melo;

  return v
}

ritmia=function(){}

alarga=function(){
  console.log(mel.length);
  melodica(mel.length,true);
  document.getElementById("tronco").style.display="block";
}

acorta=function(){
    mel.length=mel.length/2;
    melo.length=melo.length/2;
    v.notes(mel);
    console.log(melo);
}

reversa=function(){
  melo.reverse();
  mel.reverse();
  v.notes(mel);
  console.log(melo);
}
acelera=function(){

  v.beat(Math.ceil(vel/=2));
}
frena=function(){

  v.beat(vel*=2);
}
reverbera=function(){
  if(!reverbe){v.reverb(3);reverbe=true;
    document.getElementById("reverb").innerHTML = "No_Reverb";
    v.vol+=2;
  }else{v.reverb();reverbe=false;
    v.vol-=2;
  document.getElementById("reverb").innerHTML = "Reverb"}
}
delaya=function(){
    if(!delai){v.delay(3);delai=true;
    document.getElementById("delay").innerHTML = "No_Delay";
  }else{v.delay(0);delai=false;document.getElementById("delay").innerHTML = "Delay";}
}

sube=function(){
  v.trans(12);
  for(var i=0;i<mel.length;i++){
    mel[i]+=12;
  }
  NOTABASE+=12;
  designa();
  //oct++;
}
baja=function(){
  v.trans(-12);
  for(var i=0;i<mel.length;i++){
    mel[i]-=12;
  }
  NOTABASE-=12;
  designa();
  //oct--;
}
//function para crear pistas
var pista=function(name){

  v=new track();
  v.vol(0.3).adsr(0.1,1,0.7,1);
  vel=4;
  v.beat(vel);
  v.melodica=melodica;
  melodica(2)

  console.log("creo pista ");
  var element=document.getElementById("pista");
  element.parentNode.removeChild(element);
  document.getElementById("melodica").style.display="block";
  document.getElementById("shorter").style.display="block";
  document.getElementById("reverb").style.display="block";
  document.getElementById("longer").style.display="block";
  return v//necesario?
}

var designa=function(nota){

  var base;
  if(nota==undefined||nota==null){base=NOTABASE}else{base=nota};

  A=base;
  B=base+2;
  C=base+3;
  D=base+5;
  E=base+7;
  F=base+8;
  G=base+10;
  Z=1;
  baseNotes=[A,B,C,D,E,F,G,Z];
  basicNotes=["La","Si","Do","Re","Mi","Fa","Sol","-"];

}
