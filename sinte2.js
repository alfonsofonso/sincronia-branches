//sinte2 -  releaseAll()
var sinte2=new Tone.PolySynth(12,Tone.Synth);
var volSynth2=-30;
var numOnda2=0;
var freqSinte2=556;
var portamentoOxygen2=0;
var arrNotas2=[];
var arrMotive2=[];//

var subdivision2="4n";
var longNoteRec2="8n";
var grabacionSeq2;

sinte2.set({ "oscillator" : {
        "type" : "sine"  //)"modulationFrequency" : 0.2
}});
sinte2.set({
	"envelope" : {
		"attack" : 0.01,
		"decay": 2.5,
		"sustain":0.7,
		"release":0.1
}});
sinte2.volume.value=volSynth2;

grabacionSeq2=new Tone.Sequence(function(time,note){
  sinte2.triggerAttackRelease(note,longNoteRec2,time);
  ponVisual("z");
}, [],subdivision2).start(Tone.Time(Tone.Transport.now()).quantize("4n"));

tocanota2=function(a,b){
	let n=Tone.Frequency(a, "midi").toNote();
	sinte2.triggerAttack(n,Tone.Transport.now,b/254+0.5);
  log("S2: "+n);
	ponVisual(n);
  if(arrNotas2.indexOf(n)==-1){ arrNotas2.push(n)};
}
paranota2=function(a){
	let n=Tone.Frequency(a, "midi").toNote();
  //if(arrMotive.indexOf(n)!=-1){return}//si la nota ESTÁ en arrMotive--> return
  sinte2.triggerRelease(n);
  arrNotas2.splice(arrNotas2.indexOf(n),1);
}


cambiaOnda2=function(a){
  sinte2.volume.exponentialRampToValue(-51,0.01);
	if(a>0&&numOnda2<ondas.length-1){
		numOnda2++;
		sinte2.set({
    	"oscillator" : {
        "type" : ondas[numOnda2]}
    });
	}else if(a<0&&numOnda2>0){
		numOnda2--;
		sinte2.set({
    	"oscillator" : {
        "type" : ondas[numOnda2]}
  	});
	}
	log(ondas[numOnda2]+" vol2= "+volSynth2);
  sinte2.volume.exponentialRampToValue(volSynth2,1);
}

filtraSinte2=function(a){
	freqSinte2+=a*40;
	if (freqSinte2<1) {freqSinte2=1}else if(freqSinte2>20000){freqSinte2=20000}
	filtroSinte2.frequency.exponentialRampToValue(freqSinte2,0.01);
	log("synthF "+filtroSinte2.frequency.value+" a= "+a)
}

resuenaSinte2=function(a){
  filtroSinte2.Q.exponentialRampToValue(filtroSinte2.Q.value+a,0.01);
  if(filtroSinte2.Q.value<0){filtroSinte2.Q.value=0}
  log("synthRes2 "+filtroSinte2.Q.value)
}

portamenta2=function(a){
  if (a==undefined) { portamentoOxygen2=0 }
  else { portamentoOxygen2=a/12 }

  sinte2.set({
    "portamento":portamentoOxygen2
  });
  log("portamento2: "+portamentoOxygen2)
}

atackSynth2=function(a){
		var at=sinte2.get(["envelope"]).envelope.attack+a/100; /////   attack
		if(at<0.001){at=0.001}else if(at>5){at=5}
		sinte2.set({
    "envelope" : {
        "attack" : at
    	}
		});
		log("SynthAttack2 "+at)
}
decae2=function(a){
		var at=sinte2.get(["envelope"]).envelope.decay+a/100; /////   attack
		if(at<0){at=0}else if(at>5){at=5}
		sinte2.set({
    "envelope" : {
        "decay" : at
    	}
		});
		log("SynthDecay2 "+at)
}
sosten2=function(a){
		var at=sinte2.get(["envelope"]).envelope.sustain+a/100;
		if(at<0){at=0}else if(at>1){at=1}
		sinte2.set({
    "envelope" : {
        "sustain" : at
    	}
		});
		log("synthSustain2 "+at)
}
relaja2=function(a){
	var at=sinte2.get(["envelope"]).envelope.release+a/100;
	if(at<0){at=0}else if(at>29){at=29}
	sinte2.set({
	"envelope" : {
			"release" : at
		}
	});
	log("SynthRelease2 "+at)
}

hold2=function(){
    arrMotive2=arrNotas2.slice();//llena motivo de las notas pulsadas y deja las mismas en arrNotas
    record2(arrMotive2);
    restructArrMotiveLong2();
}

record2=function(mot){
  log("record2: "+mot);
  grabacionSeq2.removeAll();
  grabacionSeq2.dispose();
  grabacionSeq2=new Tone.Sequence(function(time,note){
    sinte2.triggerAttackRelease(note,longNoteRec2,time);
    ponVisual("r");
  }, mot,subdivision2).start(0);
}
