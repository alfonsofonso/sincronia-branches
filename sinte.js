// sinte
var sinte=new Tone.PolySynth(12,Tone.Synth);
var volSynth=-30;
var ondas=["sine","sine2","sine4","sine6","sine8", "triangle","triangle4", "square", "sawtooth","sawtooth4","sawtooth6","sawtooth8"];

var numOnda=0;
var freqSinte=555;
var portamentoOxygen=0;
var arrNotas=[];
var arrMotive=[];//
var historyMotive=[];

var subdivision="4n";//velocidad loop
var longNoteRec="8n";//duración de la nota
var grabacionSeq;
var notica;

sinte.set({ "oscillator" : {
        "type" : "sine"  //)"modulationFrequency" : 0.2
}});
sinte.set({
	"envelope" : {
		"attack" : 0.001,
		"decay": 2.5,
		"sustain":0.7,
		"release":0.01
}});
sinte.volume.value=volSynth;

grabacionSeq=new Tone.Sequence(function(time,note){
  sinte.triggerAttackRelease(note,longNoteRec,time);
  ponVisual("z");
}, [],subdivision).start(Tone.Time(Tone.Transport.now()).quantize("4n"));



tocanota=function(a,b){
	notica=Tone.Frequency(a, "midi").toNote();
  var v=Math.round((b/256+0.5)*1000)/1000;
  //notica=Math.round(notica * 100) / 100;
	sinte.triggerAttack(notica,Tone.Transport.now()+0.01,v);

  console.log(a+" S1: "+notica+" v: "+v);
	ponVisual(notica);
  if(arrNotas.indexOf(notica)==-1){ arrNotas.push(notica)};
}

paranota=function(a){
	let n=Tone.Frequency(a, "midi").toNote();
  //if(arrMotive.indexOf(n)!=-1){return}//si la nota ESTÁ en arrMotive--> return
  sinte.triggerRelease(n);
  arrNotas.splice(arrNotas.indexOf(n),1);
}

tocanotaAxiom=function(d){

	if (d[0]==144){
		if(d[2]>0){
			let n=Tone.Frequency(d[1], "midi").toNote();
			sinte.triggerAttack(n,Tone.Transport.now);
			ponVisual(n);
			log("toco "+n)
		} else {
			let n=Tone.Frequency(d[1], "midi").toNote();
			sinte.triggerRelease(n)
			log("intenta parar "+n)
		}
	}else if(d[0]==176){

	}
}
tocanotaOxygen=function(d){
  if (d[0]==144){
    let n=Tone.Frequency(d[1], "midi").toNote();
		if(d[2]>0){
      sinte.triggerAttack(n,Tone.Transport.now,(d[2]/127)*0.8+0.20);
      ponVisual(n);
      log("x1 "+n)
    } else {
      sinte.triggerRelease(n)

    }
  } else if(d[0]==176){
    switch (d[1]) {
      case 5:// C7 knob
        glissa(d[2])
        break;
      case 6:// C8
        //resuenaSinte(d[2]); va mal
        break;
      case 33:// C6 knob
        break;
      case 71:// C1 knob

        break;
      case 21:// C12 knob
        tuneUp(-1)
        break;
      case 22:  //C13 knob
        tuneUp(1)
        break;

      default:
        log("default Oxygen note")

    }

	}else if(d[0]==224){
      pithBendOxygen(d[2])
  }
};

cambiaOnda=function(a){
  sinte.volume.exponentialRampToValue(-51,0.01);
	if(a>0&&numOnda<ondas.length-1){
		numOnda++;
		sinte.set({
    	"oscillator" : {
        "type" : ondas[numOnda]}
    });
	}else if(a<0&&numOnda>0){
		numOnda--;
		sinte.set({
    	"oscillator" : {
        "type" : ondas[numOnda]}
  	});
	}
	log(ondas[numOnda]+" vol= "+volSynth);
  sinte.volume.exponentialRampToValue(volSynth,1);
}


portamenta=function(a){
  if (a==undefined) { portamentoOxygen=0 }
  else { portamentoOxygen=a/12 }

  sinte.set({
    "portamento":portamentoOxygen
  });
  log("portamento: "+portamentoOxygen)
}

atackSynth=function(a){
		var at=sinte.get(["envelope"]).envelope.attack+a/100; /////   attack
		if(at<0.001){at=0.001}else if(at>5){at=5}
		sinte.set({
    "envelope" : {
        "attack" : at
    	}
		});
		log("SynthAttack "+at)
}
decae=function(a){
		var at=sinte.get(["envelope"]).envelope.decay+a/100; /////   attack
		if(at<0){at=0}else if(at>5){at=5}
		sinte.set({
    "envelope" : {
        "decay" : at
    	}
		});
		log("SynthDecay "+at)
}
sosten=function(a){
		var at=sinte.get(["envelope"]).envelope.sustain+a/100;
		if(at<0){at=0}else if(at>1){at=1}
		sinte.set({
    "envelope" : {
        "sustain" : at
    	}
		});
		log("synthSustain "+at)
}
relaja=function(a){
	var at=sinte.get(["envelope"]).envelope.release+a/100;
	if(at<0){at=0}else if(at>29){at=29}
	sinte.set({
	"envelope" : {
			"release" : at
		}
	});
	log("SynthRelease "+at)
}

glissa=function(a){
  log("glisso: "+a)
}

filtraSinte=function(a){
  if(a<0){freqSinte-=40}else{freqSinte+=40}
	//freqSinte+=a*40;
	if (freqSinte<1) {freqSinte=1}else if(freqSinte>20000){freqSinte=20000}
  //filtroSinte.frequency.linearRampToValue(freqSinte,0.01)
	filtroSinte.frequency.value=freqSinte;
	log("synthF "+filtroSinte.frequency.value+" a= "+a)
}
resuenaSinte=function(a){
  filtroSinte.Q.value+=a;
  if(filtroSinte.Q.value<0){filtroSinte.Q.value=0}
  log("synthRes "+filtroSinte.Q.value)
}

//

hold=function(){
    arrMotive=arrNotas.slice();//llena motivo de las notas pulsadas y deja las mismas en arrNotas
    record(arrMotive);
    restructArrMotiveLong()
}

record=function(mot){
  log("r="+mot);
  grabacionSeq.removeAll();
  grabacionSeq.dispose();
  grabacionSeq=new Tone.Sequence(function(time,note){
    sinte.triggerAttackRelease(note,longNoteRec,time);
    ponVisual("r");
  }, mot,subdivision).start(0);
}
