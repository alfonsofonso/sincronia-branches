
var bucleBombo="4n";
var bucleCharles="4n";
var bucleCaja="1m/2"
var velBombo=0.1;

var offsetBombo=0;
var offsetCharls=0.3;
var offsetSnare=0.56;

var duracionBombo="8n";

var notaBombo=25;
var notaCharles=32;
var notaCaja=-2;

var tiempos=["2m","1m","0:3","0:2","4n+8n","4n","4t","8n","8t","16n","16t","16n/2","16n/4","16n/8","32n"];

var freqFilterBombo=555;
var freqFilterCharles=5555;
var freqFilterCaja=1555;

var lofreq=400;
var hifreq=2500;
var caja,charles;

var bomboVol=-60;
var charlesVol=-40;
var cajaVol=-80;
var sinteVol=-30;
var sinte2Vol=-30



///////    CACHARROS

function bombea(time){
	//triggered every eighth note.
	bombo.triggerAttackRelease(notaBombo, duracionBombo,time + offsetBombo,velBombo);
	Tone.Draw.schedule(function(){ponVisual("b")}, time+offsetBombo);
}
var bombo=new Tone.MembraneSynth();
bombo.volume.value=bomboVol;
var bomb = new Tone.Loop(bombea, bucleBombo).start(0.005);

function charlea(time){
	charles.triggerAttackRelease("1m", time+offsetCharls);
	Tone.Draw.schedule(function(){ponVisual("c")}, time+offsetCharls);
}
var charles= new Tone.NoiseSynth()
charles.volume.value=charlesVol;
var charls=new Tone.Loop(charlea,bucleCharles).start(0.007);

function cajea(time){
	caja.triggerAttackRelease(notaCaja,"4n",time+offsetSnare)// (interval, duration[, time][, velocity])
	Tone.Draw.schedule(function(){ponVisual("s")}, time+offsetSnare);
}
var caja=new Tone.Sampler("caja.mp3");
caja.volume.value=cajaVol;
var caj=new Tone.Loop(cajea,bucleCaja).start(0.004);


pithBendArturia=function(d){
	var t=instLoops[inst-1];
	if(inst>3||inst==0){t= instLoops[0]}//afecta al bombo si no es hh o snare
	log("resolution "+t.interval+ " "+d)
	if(d==64){
		t.interval="4n";
	}else if(d<64){
		t.interval=tiempos[Math.round(d/16)];
	}else{
		t.interval=tiempos[Math.round(d/12)];
	}
	log("resolution "+t.interval+ " "+d)
}

pithBendOxygen=function(d){
	log("pitchbendoosxigben")
	var t=instLoops[inst-1];
	if(inst==3){t= instLoops[0]}//afecta al bombo si no es hh o snare

	if(d==64){
		t.interval="4n";
	}else if(d<64){
		t.interval=tiempos[Math.round(d/16)];
	}else{
		t.interval=tiempos[Math.round(d/12)];
	}
	log("resolution "+t.interval+ " "+d)
}

filtraBombo=function(a){
	freqFilterBombo+=a*2;
	if (freqFilterBombo<1) {freqFilterBombo=1}
	filtroBombo.frequency.value=freqFilterBombo;
	log("filtroBombo "+filtroBombo.frequency.value)
}

filtraCharles=function(a){
	freqFilterCharles+=a*2;
	if (freqFilterCharles<1) {freqFilterCharles=1}
	filtroCharles.frequency.value=freqFilterCharles;
	log("freqFilterCharles "+filtroCharles.frequency.value)
}

filtraCaja=function(a){
	freqFilterCaja+=a*2;
	if (freqFilterCaja<1) {freqFilterCaja=1}
	filtroCaja.frequency.value=freqFilterCaja;
	log("freqFilterCaja "+filtroCaja.frequency.value)
}

resuenaBombo=function(a){
	filtroBombo.Q.value+=a;
	if(filtroBombo.Q.value<0){filtroBombo.Q.value=0}
	log("resbombo "+filtroBombo.Q.value)
}

resuenaCharles=function(a){
	filtroCharles.Q.value+=a;
	if(filtroCharles.Q.value<0){filtroCharles.Q.value=0}
	log("resuenaCharles "+filtroCharles.Q.value)
}

resuenaCaja=function(a){
	filtroCaja.Q.value+=a;
	if(filtroCaja.Q.value<0){filtroCaja.Q.value=0}
	log("resSnare "+filtroCaja.Q.value)
}
