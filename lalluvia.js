//cancion1
var tempoBPM=100;
var inst=0;
var instrumentos=[bombo,charles,caja,sinte,sinte2];
var lastSynth;
var instLoops=[bomb,charls,caj]
var instVols=[bomboVol,charlesVol,cajaVol,sinteVol,sinte2Vol];
var sonando=0;
var quantization=["2n","4n","4t","8n","8t","16n","16t","32n","64n","128n"];
var delayando=true;
Tone.Transport.bpm.value=tempoBPM;
Tone.Transport.latencyHint="interactive";
//set the attributes using the set interface
//sinte.set("detune", -1200);


//////////////////////////////////////////     EFECTOS  excepto delays i reverbs  //////////
var limitador=new Tone.Limiter(-3).toMaster();
var limitBombo=new Tone.Limiter(-3);
var limitCharles=new Tone.Limiter(-3);
var limitCaja=new Tone.Limiter(-3);
var limitSinte=new Tone.Limiter(-3);
var limitSinte2=new Tone.Limiter(-3);
var filtroBombo=new Tone.Filter(freqFilterBombo);
var filtroCharles=new Tone.Filter(freqFilterCharles);
var filtroCaja=new Tone.Filter(freqFilterCaja);
var filtroSinte=new Tone.Filter(freqSinte);
var filtroSinte2=new Tone.Filter(freqSinte2)


//////////////////////////////////////////     CONEXIONES
sinte.connect(delaySinte);
delaySinte.connect(filtroSinte)
filtroSinte.connect(reverbSinte);
reverbSinte.connect(limitSinte);
limitSinte.connect(limitador);

sinte2.connect(delaySinte2);
delaySinte2.connect(filtroSinte2)
filtroSinte2.connect(reverbSinte2);
reverbSinte2.connect(limitSinte2);
limitSinte2.connect(limitador);

charles.connect(delayCharles);
delayCharles.connect(filtroCharles);
filtroCharles.connect(reverCharls);
reverCharls.connect(limitCharles);
limitCharles.connect(limitador);

caja.connect(delayCaja);
delayCaja.connect(filtroCaja)
filtroCaja.connect(reverCaj);
reverCaj.connect(limitCaja);
limitCaja.connect(limitador);

bombo.connect(delayBombo);
delayBombo.connect(filtroBombo);
filtroBombo.connect(reverbomb);
reverbomb.connect(limitBombo);
limitBombo.connect(limitador);
// visuals connections
limitSinte.connect(analyser);


//////////////////////////////////////    FUNCIONES   ··················
//knob1
modVol=function(a){
	if(inst==0){
		log("afecta a todos");
	}else if(inst<6){

  	instrumentos[inst-1].volume.value+=a;
  	if(instrumentos[inst-1].volume.value>0){
			instrumentos[inst-1].volume.value=0;

		}else if(instrumentos[inst-1].volume.value<-100){
			instrumentos[inst-1].volume.value=-100}

		instVols[inst-1]=instrumentos[inst-1].volume.value;
		log(instrumentos[inst-1]+" "+instVols[inst-1])
	}else if(inst==6){
		log("vol menu struct")
	}else if(inst==7){
		log("volumen menu visuals")
	}
}
//knob3
modFreq=function(a){
	if(inst==0){
		log("Pitch afecta a todos");
	}else if(inst==1){
		notaBombo+=a;
    if(notaBombo<0){notaBombo=0}else if(notaBombo>880){notaBombo=880}
    log("notaBombo = "+notaBombo);
	}else if(inst==2){
		if(a<0){charles.set("noise.type", "brown");
		}else if(a>0){charles.set("noise.type", "pink");}
		log("color HiHat");
	}else if(inst==3){
		notaCaja+=a;
		if(notaCaja<-50){notaCaja=-50}else if(notaCaja>50){notaCaja=50}
		log("notaCaja = "+notaCaja);
	}else if(inst==4){
		cambiaOnda(a);
	}else if(inst==5){
		cambiaOnda2(a);
	}else if(inst==6){
		tuneUp(a);
	}else if(inst==7){
		log("visualPitch")
	}
}
//knob 10
filtra=function(a){
	switch (inst) {
		case 0:
			log("filtra todo")
			break;
		case 1:
			filtraBombo(a)
			break;
		case 2:
			filtraCharles(a);
			break;
		case 3:
			filtraCaja(a);
			break;
		case 4:
			filtraSinte(a);
			break;
		case 5:
			filtraSinte2(a)
			break;
		case 7:
			velSpaceControl(a);
			break;
		default:
			log("def filtr")
	}

}
//knob 11
resuena=function(a){
	switch (inst) {
		case 0:
			log("res all");
			break;
			case 1:
				resuenaBombo(a);
				break;
				case 2:
					resuenaCharles(a);
					break;
					case 3:
						resuenaCaja(a);
						break;
						case 4:
							resuenaSinte(a)
							break;
							case 5:
								resuenaSinte2(a)
								break;
								case 7:
								cercaniaPlanetas(a);
								break;
		default:
			log("def res")
	}
}

//knob 5
attack=function(a){
	switch (inst) {
				case 1://voy a poner aqui el charles
					log("attack "+inst)
					break;
				case 4:
					atackSynth(a);
					break;
				case 5:
					atackSynth2(a)
					break;
				case 6:
					subeybaja(a)
					break;
				case 7:
					log("visual attack")
					break;
		default:
		log("def attack")
	}
}
decay=function(a){
	switch (inst) {

		case 4:
			decae(a);
				break;
			case 5:
				decae2(a);
				break;
			case 6:
				veloLoop(a)
				break;
			case 7:
				estiraHf(a);
				break;
		default:
		log("def decay")
	}
}
sustain=function(a){
	switch (inst) {
		case 4:
			sosten(a);
			break;
		case 5:
			sosten2(a);
			break;
		case 6:
			duraNotaLoop(a);
			break;
		case 7:
			estiraVf(a);
			break;
		default:
		log("def sustain")
	}
}
release=function(a){
	switch (inst) {
		case 4:
			relaja(a);
			break;
		case 5:
			relaja2(a);
			break;
		case 6:
			lengthMotive(a)
			break;
		case 7:
			altitudf(a);
			break;
		default:
		log("def release")
	}
}

//knob 4
mueve=function(a){
	switch (inst) {
		case 0:
			log("mueve todo")
			break;
		case 1:
			if(offsetBombo!=="number"){offsetBombo=Tone.Time(offsetBombo).eval()}
			offsetBombo+=a/1000;
			if(offsetBombo<0){offsetBombo=0}else if(offsetBombo>1){offsetBombo=1}
			log("offsetBombo: "+offsetBombo)
			break;
		case 2:
			if(offsetCharls!=="number"){offsetCharls=Tone.Time(offsetCharls).eval()}
				offsetCharls+=a/1000;
				if(offsetCharls<0){offsetCharls=0}else if(offsetCharls>1){offsetCharls=1}
				log("offsetCharls: "+offsetCharls)
			break;
		case 3:
			if(offsetSnare!=="number"){offsetSnare=Tone.Time(offsetSnare).eval()}
			offsetSnare+=a/1000;
			if(offsetSnare<0){offsetSnare=0}else if(offsetSnare>1){offsetSnare=1}
			log("offsetSnare: "+offsetSnare)
			break;
		case 4:
			log("mueve sinz?")
			break;
		case 5:
			log("mueve sinz 2 ?")
			break;
		case 6:
			log("mueve struckt")
			break;
		case 7:
			log("mueve visuals")
			break;
		default:
			log("default Mueve")
	}
}
//knob 2
limita=function(a){
	switch (inst) {
		case 0:
		 	let l=limitador.threshold.value;
			if(a>0&&l<0){limitador.threshold.linearRampToValue(l+1,0.1)}
			else if(a<0&&l>-50){limitador.threshold.linearRampToValue(l-1,0.1)}
			log("limita todo: "+l);
			break;
		case 1:
			if(a>0&&limitBombo.threshold.value<0){limitBombo.threshold.value++}
			else if(a<0&&limitBombo.threshold.value>-100){limitBombo.threshold.value--}
			log("limit drum: "+limitBombo.threshold.value);
			break;
		case 2:
			if(a>0&&limitCharles.threshold.value<0){limitCharles.threshold.value++}
			else if( a<0 && limitCharles.threshold.value>-100){limitCharles.threshold.value--}
			log("limit charls: "+limitCharles.threshold.value);
			break;
		case 3:
			if(a>0&&limitCaja.threshold.value<0){limitCaja.threshold.value++}
			else if(a<0&&limitCaja.threshold.value>-100){limitCaja.threshold.value--}
			log("limit snare: "+limitCaja.threshold.value);
			break;
		case 4:
			if(a>0&&limitSinte.threshold.value<0){limitSinte.threshold.value++}
			else if(a<0&&limitSinte.threshold.value>-100){limitSinte.threshold.value--}
			log("limit synth: "+limitSinte.threshold.value);
			break;
		case 5:
			if(a>0&&limitSinte2.threshold.value<0){limitSinte2.threshold.value++}
			else if(a<0&&limitSinte2.threshold.value>-100){limitSinte2.threshold.value--}
			log("limit synth2: "+limitSinte2.threshold.value);
			break;
		case 6:
			log("limit structure");
			break;
		case 7:
			log("limit visuals");
			break;
		default:
			log("def limit")
	}

}
//continues at delayador.js


function dale(){// play
	if(!sonando){
		Tone.Transport.start();
		sonando=1;
		log("go!")
	}else{
		Tone.Transport.stop();
		sonando=0;
		log("stop!")
	}
}


tempo=function(a){
	tempoBPM=a;
	if (tempoBPM<1) {
		tempoBPM=1
	}else if(tempoBPM>1000){tempoBPM=4000}
	Tone.Transport.bpm.value=tempoBPM;
	log("tempoBPM= "+tempoBPM)
}


onload=function(){
	initVisual();
	visual(0)
}
