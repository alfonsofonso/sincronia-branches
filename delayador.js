//delayador

var tiemposD=["0:2","4n+8n","4n","4t","8n","8t","16n","16t","16n/2","16n/4","16n/8"];

var delayTimeBombo=0.1;
var delayTimeCharles=0.1;
var delayTimeCaja=0.1;
var delayTimeSinte=0.1;
var delayTimeSinte2=0.1;

var delayTimeBomboQ=1;
var delayTimeCharlesQ=1;
var delayTimeCajaQ=1;
var delayTimeSinteQ=1;
var delayTimeSinte2Q=1;

var feedbackBombo=0.1;
var feedbackCharles=0.1;
var feedbackCaja=0.1;
var feedbackSinte=0.1;
var feedbackSinte2=0.1;


var wetDelayBombo=0;
var wetDelayCharles=0;
var wetDelayCaja=0;
var wetDelaySinte=0;
var wetDelaySinte2=0;

var delayBombo=new Tone.FeedbackDelay(delayTimeBombo, feedbackBombo);
	delayBombo.wet.value=0;
var delayCharles=new Tone.FeedbackDelay(delayTimeCharles, feedbackCharles);
	delayCharles.wet.value=0;
var delayCaja=new Tone.FeedbackDelay(delayTimeCaja, feedbackCaja);
	delayCaja.wet.value=0;
var delaySinte=new Tone.FeedbackDelay(delayTimeSinte, feedbackSinte);
	delaySinte.wet.value=0;
var delaySinte2=new Tone.FeedbackDelay(delayTimeSinte2, feedbackSinte2);
	delaySinte2.wet.value=0;

var reverbomb=new Tone.Freeverb(0);
	reverbomb.wet.value=0.01;
var reverCharls=new Tone.Freeverb(0);
	reverCharls.wet.value=0.01;
var reverCaj=new Tone.Freeverb(0);
	reverCaj.wet.value=0.01;
var reverbSinte=new Tone.Freeverb(0);
	reverbSinte.wet.value=0.01;
var reverbSinte2=new Tone.Freeverb(0);
	reverbSinte2.wet.value=0.01;



delaya=function(a){
		switch (inst) {
			case 0:
				log("delay time global ")
				break;
			case 1:
				delayTimeBombo+=a/1000;
				if(delayTimeBombo<0){  delayTimeBombo=0;  }else if (delayTimeBombo>1){delayTimeBombo=1}
				delayBombo.delayTime.value=delayTimeBombo;
				log(delayTimeBombo+" drum dtime" );
				break;
			case 2:
				delayTimeCharles+=a/1000;
				if(delayTimeCharles<0){ delayTimeCharles=0 }else if (delayTimeCharles>1){delayTimeCharles=1}
				delayCharles.delayTime.value=delayTimeCharles;
				log(delayTimeCharles+"hh dtime");
				break;
			case 3:
				delayTimeCaja+=a/1000;
				if(delayTimeCaja<0){delayTimeCaja=0}else if (delayTimeCaja>1){delayTimeCaja=1}
				delayCaja.delayTime.value=delayTimeCaja;
				log(delayTimeCaja+"snare dtime");
				break;
			case 4:
				delayTimeSinte+=a/1000;
				if(delayTimeSinte<0){delayTimeSinte=0}else if (delayTimeSinte>1){delayTimeSinte=1}
				delaySinte.delayTime.value=delayTimeSinte;
				log(delayTimeSinte+"synth dtime");
				break;
			case 5:
				delayTimeSinte2+=a/1000;
				if(delayTimeSinte2<0){delayTimeSinte2=0}else if (delayTimeSinte2>1){delayTimeSinte2=1}
				delaySinte2.delayTime.value=delayTimeSinte2;
				log(delayTimeSinte2+"synth2 dtime");
				break;
			default:
				log("default delay time")
		}
}

delayaQ=function(a){
	switch (inst) {
		case 0:
			log("delaytimeTodosQ");
			break;
		case 1:

			if( a>0 &&tiemposD.indexOf(delayTimeBomboQ)+1<tiemposD.length){
					delayBombo.delayTime.value=tiemposD[tiemposD.indexOf(delayTimeBomboQ)+1];
					delayTimeBomboQ=tiemposD[tiemposD.indexOf(delayTimeBomboQ)+1];

			}else if( a<0 &&tiemposD.indexOf(delayTimeBomboQ)>0){
					delayBombo.delayTime.value=tiempos[tiemposD.indexOf(delayTimeBomboQ)-1];
					delayTimeBomboQ=tiemposD[tiemposD.indexOf(delayTimeBomboQ)-1];
			}
			log("delay timeQ: "+delayTimeBomboQ);
			break;
		case 2:
			if( a>0 &&tiemposD.indexOf(delayTimeCharlesQ)+1<tiemposD.length){
					delayCharles.delayTime.value=tiemposD[tiemposD.indexOf(delayTimeCharlesQ)+1];
					delayTimeCharlesQ=tiemposD[tiemposD.indexOf(delayTimeCharlesQ)+1];

			}else if( a<0 &&tiemposD.indexOf(delayTimeCharlesQ)>0){
					delayCharles.delayTime.value=tiempos[tiemposD.indexOf(delayTimeCharlesQ)-1];
					delayTimeCharlesQ=tiemposD[tiemposD.indexOf(delayTimeCharlesQ)-1];
			}
			log("delayCharles timeQ: "+delayTimeCharlesQ);
			break;
		case 3:
			if( a>0 &&tiemposD.indexOf(delayTimeCajaQ)+1<tiemposD.length){
					delayCaja.delayTime.value=tiemposD[tiemposD.indexOf(delayTimeCajaQ)+1];
					delayTimeCajaQ=tiemposD[tiemposD.indexOf(delayTimeCajaQ)+1];

			}else if( a<0 &&tiemposD.indexOf(delayTimeCajaQ)>0){
					delayCaja.delayTime.value=tiempos[tiemposD.indexOf(delayTimeCajaQ)-1];
					delayTimeCajaQ=tiemposD[tiemposD.indexOf(delayTimeCajaQ)-1];
			}
			log("delayCaja timeQ: "+delayTimeCajaQ);
			break;

		case 4:
			if( a>0 &&tiemposD.indexOf(delayTimeSinteQ)+1<tiemposD.length){
					delaySinte.delayTime.value=tiemposD[tiemposD.indexOf(delayTimeSinteQ)+1];
					delayTimeSinteQ=tiemposD[tiemposD.indexOf(delayTimeSinteQ)+1];

			}else if( a<0 &&tiemposD.indexOf(delayTimeSinteQ)>0){
					delaySinte.delayTime.value=tiempos[tiemposD.indexOf(delayTimeSinteQ)-1];
					delayTimeSinteQ=tiemposD[tiemposD.indexOf(delayTimeSinteQ)-1];
			}
			log("delaySinte timeQ: "+delayTimeSinteQ);
			break;
		case 5:
			if( a>0 &&tiemposD.indexOf(delayTimeSinte2Q)+1<tiemposD.length){
					delaySinte2.delayTime.value=tiemposD[tiemposD.indexOf(delayTimeSinte2Q)+1];
					delayTimeSinte2Q=tiemposD[tiemposD.indexOf(delayTimeSinte2Q)+1];

			}else if( a<0 &&tiemposD.indexOf(delayTimeSinte2Q)>0){
					delaySinte2.delayTime.value=tiempos[tiemposD.indexOf(delayTimeSinte2Q)-1];
					delayTimeSinte2Q=tiemposD[tiemposD.indexOf(delayTimeSinte2Q)-1];
			}
			log("delaySinte2 timeQ: "+delayTimeSinte2Q);
			break;
		default:
			log("delaytimeq def")
	}
}

retroalimenta=function(a){
	switch (inst) {
		case 0:
			log("feedback all")
			break;
		case 1:
			if(a>0&&delayBombo.feedback.value<1){
				delayBombo.feedback.value+=0.01;
			}else if(a<0&&delayBombo.feedback.value>0){
				delayBombo.feedback.value-=0.01;
			}
			log("drum feedback: "+delayBombo.feedback.value)
			break;
		case 2:
			if(a>0&&delayCharles.feedback.value<1){
				delayCharles.feedback.value+=0.01;
			}else if(a<0&&delayCharles.feedback.value>0){
				delayCharles.feedback.value-=0.01;
			}
			log("charls feedback: "+delayCharles.feedback.value)
			break;
		case 3:
			if(a>0&&delayCaja.feedback.value<1){
				delayCaja.feedback.value+=0.01;
			}else if(a<0&&delayCaja.feedback.value>0){
				delayCaja.feedback.value-=0.01;
			}
			log("snare feedback: "+delayCaja.feedback.value)
			break;
		case 4:
			if(a>0&&delaySinte.feedback.value<1){
				delaySinte.feedback.value+=0.01;
			}else if(a<0&&delaySinte.feedback.value>0){
				delaySinte.feedback.value-=0.01;
			}
			log("synth feedback: "+delaySinte.feedback.value)
			break;
		case 5:
			if(a>0&&delaySinte2.feedback.value<1){
				delaySinte2.feedback.value+=0.01;
			}else if(a<0&&delaySinte2.feedback.value>0){
				delaySinte2.feedback.value-=0.01;
			}
			log("synth2 feedback: "+delaySinte2.feedback.value)
			break;

		default:
			log("def feedback")
	}

}

moja=function(a){
	switch (inst) {
		case 0:
			log("wet all");
			break;
		case 1:
			wetDelayBombo+=a/100;
			if(wetDelayBombo<0){wetDelayBombo=0}else if(wetDelayBombo>1){wetDelayBombo=1}
				delayBombo.wet.value=wetDelayBombo;
			log("wet drum= "+wetDelayBombo);
			break;
		case 2:
			wetDelayCharles+=a/100;
			if(wetDelayCharles<0){wetDelayCharles=0}else if(wetDelayCharles>1){wetDelayCharles=1}
				delayCharles.wet.value=wetDelayCharles;
			log("wet charles= "+wetDelayCharles);
			break;
		case 3:
			wetDelayCaja+=a/100;
			if(wetDelayCaja<0){wetDelayCaja=0}else if(wetDelayCaja>1){wetDelayCaja=1}
				delayCaja.wet.value=wetDelayCaja;
			log("wet snare= "+wetDelayCaja);
			break;
		case 4:
			wetDelaySinte+=a/100;
			if(wetDelaySinte<0){wetDelaySinte=0}else if(wetDelaySinte>1){wetDelaySinte=1}
				delaySinte.wet.value=wetDelaySinte;
			log("wet synth= "+wetDelaySinte);
			break;
		case 5:
			wetDelaySinte2+=a/100;
			if(wetDelaySinte2<0){wetDelaySinte2=0}else if(wetDelaySinte2>1){wetDelaySinte2=1}
				delaySinte2.wet.value=wetDelaySinte2;
			log("wet synth2= "+wetDelaySinte2);
			break;
		default:
			log("def wet")
	}
}

reverbera=function(a){
	switch (inst) {
		case 0:
			break;
			case 1:
				var r=reverbomb.roomSize.value+a/100;
				if(r<0){r=0}else if(r>1){r=1}
				reverbomb.roomSize.value=r;
				log("reberbDrum: "+reverbomb.roomSize.value)
				break;
			case 2:
			var r=reverCharls.roomSize.value+a/100;
			if(r<0){r=0}else if(r>1){r=1}
			reverCharls.roomSize.value=r;
			log("reberbHiHat: "+reverCharls.roomSize.value)
				break;
			case 3:
			var r=reverCaj.roomSize.value+a/100;
			if(r<0){r=0}else if(r>1){r=1}
			reverCaj.roomSize.value=r;
			log("reberbSnare: "+reverCaj.roomSize.value)
				break;
			case 4:
				var r=reverbSinte.roomSize.value+a/100;
				if(r<0){r=0}else if(r>1){r=1}
				reverbSinte.roomSize.value=r;
				log("reberb: "+reverbSinte.roomSize.value)
				break;
			case 5:
				var r=reverbSinte2.roomSize.value+a/100;
				if(r<0){r=0}else if(r>1){r=1}
				reverbSinte2.roomSize.value=r;
				log("reberb2: "+reverbSinte2.roomSize.value)
				break;
			case 7:
				cercaniaPlanetasFinal(a);
				break;
		default:
			log("default reverbera")
	}
}

reverbWET=function(a){
	switch (inst) {
		case 0:
			log("case 0 wet")
			break;
		case 1:
			var r=reverbomb.wet.value+(a/100);
			if(r<0){r=0}else if(r>1){r=1}
			reverbomb.wet.value=r;
			log("drum wet: "+reverbomb.wet.value);
			break;
		case 2:
			var r=reverCharls.wet.value+(a/100);
			if(r<0){r=0}else if(r>1){r=1}
			reverCharls.wet.value=r;
			log("HiHat Wet: "+reverCharls.wet.value)
			break;
		case 3:
			var r=reverCaj.wet.value+(a/100);
			if(r<0){r=0}else if(r>1){r=1}
			reverCaj.wet.value=r;
			log("snare wet: "+reverCaj.wet.value)
			break;
		case 4:
			var r=reverbSinte.wet.value+a/100;
			if(r<0){r=0}else if(r>1){r=1}
			reverbSinte.wet.value=r;
			log("reberb Wet: "+reverbSinte.wet.value)
			break;
		case 5:
			var r=reverbSinte2.wet.value+a/100;
			if(r<0){r=0}else if(r>1){r=1}
			reverbSinte2.wet.value=r;
			log("reberb2 Wet: "+reverbSinte2.wet.value)
			break;
		case 7:
			luzPlanetas(a);
			break;
		default:
			log("default reverbWET")
	}
}
