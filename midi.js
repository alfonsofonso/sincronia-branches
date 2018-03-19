// request MIDI access

var luces;
var ilu=false;
var hayMidi=true;
var entradas=[];
var salidas=[];
var botonesIluminados=[0,0,0,0,0,0,0,0]
var arturiaOut;
var launchpadOut;
var bcr;
var oxygen;
var axiom;
//var haySinte=false;//si esta conectado el axiom o oxigen, arturia no tocanota


if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
    }).then(onMIDISuccess, onMIDIFailure);
} else {    alert("No MIDI support in your browser."); }
// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    log('MIDI Access Object', midiAccess.inputs.size);
    if(midiAccess.inputs.size==0){hayMidi=false;return}
      midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
      inputs = midi.inputs.values();
      outputs= midi.outputs.values();
    if(midiAccess.inputs.size==0){hayMidi=false;return}
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        entradas.push(input);
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }

    for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        salidas.push(output);
    }
    luces=salidas[0].value;

    for(var i=0;i<salidas.length;i++){
      if(salidas[i].value.manufacturer=="Arturia"){arturiaOut=salidas[i];apagoBotones();}
      else if(salidas[i].value.name=="Launchpad Mini"){launchpadOut=salidas[i]}
      else if(salidas[i].value.name=="BCR2000"){bcr=salidas[i]}
      else if(salidas[i].value.name=="USB Oxygen 8 v2"){oxygen=salidas[i]}
      else if(salidas[i].value.name=="Axiom 25 Axiom USB In"){axiom=salidas[i]}
      else{log("hay algo conectado!")}
    }
}
function onMIDIFailure(e) {
    // when we get a failed response, run this code
    log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
  //if(data[2]==0&&data[0]==144){return}//touch up
  if (message.target.name=="Launchpad Mini"){
    //escribeLaunchpad(data);
  }else if (message.target.name=="Arturia MINILAB"){//CASIO USB-MIDI

    if(data[0]==153){  /// arturia Buttons 0-7
      switch (data[1]){
        case 36:// boton 1
          inst=1;
          break;
        case 37:// boton 2
          inst=2;
          break;
        case 38:// boton 3
          inst=3;
          break;
        case 39:// boton 4
          inst=4; /// sinte 1
          lastSynth=sinte;
          break;
        case 40:// boton 5
          inst=5;   // sinte 2
          lastSynth=sinte2;
          break;
        case 41:// boton 6
          inst=6;     //structura
          break;
        case 42:// boton 7
          inst=7 //visuals
          break;
        case 43:// boton 8
          if(inst==5){hold2()}else{hold()};
          break;
        case 0:
          log("pitch");
          break;//? no va
        case 1:
          log("mod");
          break;//? no va
        default:
          log("default arturia button");
      }

    }else if(data[0]==137 && data[2]==0){//al soltar un boton

      var b=data[1]-36;//reducir el rango de 0 a 7 boton
      var b2=data[1]-22+8;//botones de 8 a 15

      if(botonesIluminados[b]==1){// si está iluminado
        if(b==7||b2==15){log("return!"); return}//si es dale o hold... no apaga
        apagoBotones(b);inst=0;//
      } else {  // si esta apagado
        if(b<7||b2<15){apagoBotones(b)}//si NO es hold ni dale apaga
        arturiaOut.value.send([144,data[1],1]);//enciendo, el valor 144 puede variar a 145!?
        botonesIluminados[b]=1;
      }

    }else if(data[0]==144){
        if (inst==5){tocanota2(data[1],data[2])}else{tocanota(data[1],data[2])}
    }else if(data[0]==128){
        if (inst==5){paranota2(data[1],data[2])}else{paranota(data[1],data[2])}
    }else if(data[0]==176&&data[2]!=64) {///// arturia Knobs y 9-16 bottons
      var d=data[2]-64;
      switch (data[1])  {// calls knob(d,num) // d=cantidad,sentido   num=qué knob
        case 7://knob1
          modVol(d);break;
        case 74://knob2
          limita(d);break;
        case 71://knob3
          mueve(d);break;
        case 76://knob4
          modFreq(d);break;

        case 77://knob5
          attack(d);break;
        case 93://knob6
          decay(d);break;
        case 73://knob7
          sustain(d);break;
        case 75://knob8
          release(d);break;

        case 114://knob9
          log("nozin "+d);break;
        case 18://knob10
          filtra(d);break;
        case 19://knob11
          resuena(d);break;
        case 16://knob12
          reverbera(d);break;
        case 17://knob13
          reverbWET(d);break;
        case 91://knob14
          delaya(d);break;
        case 79://knob15
          retroalimenta(d);break;
        case 72://knob16
          moja(d);break;
        case 1:
          if(inst==5){portamenta2(data[2])}else{portamenta(data[2]);}////modulationFrequency
          break;

        case 22:////                    Botones 8-15
          d>0?dale():log("b22");break;
        case 23:
          d>0?dale():log("b23");break;
        case 24:
          d>0?dale():log("b24");break;
        case 25:
          d>0?dale():log("b25");break;
        case 26:
          d>0?dale():log("b26");break;
        case 27:
          d>0?dale():log("b27");break;
        case 28:
          d>0?dale():log("b28");break;
        case 29:
          d>0?dale():log(" _ ");break;
        default:
          log("default midi en arturia knob "+data);
      }
    }else if(data[0]==224){
      pithBendArturia(data[2]);//resolution perc
    }

  }else if(message.target.name=="BCR2000"){
    pinta('bcr data '+ data);
  }else if(message.target.name=="USB Oxygen 8 v2"){
    tocanotaOxygen(data);
    //pinta('Oxygen data '+ data);
  }else if(message.target.name=="Axiom 25 Axiom USB In"){
    log('Axiom data', data, message);
    tocanotaAxiom(data);
  }
      //instr.send([data[0],data[1],data[2]])
    //// rojo:0x0f verde: 0x30 ambar:0x13 yellow: 127; verde suave: 0x18...
 log('MIDI:'+data+" "+ data[0] + " "+ data[1]+" "+data[2]); // MIDI data [144, 63, 73]
    //message.target.send( [0x92, 60, 127]);
}



var apagoBotones=function(b){//b es el que no quieres apagar
//  if(b==8){}
  for(var i=0;i<botonesIluminados.length-sonando;i++){//no apagues el 8!
    arturiaOut.value.send([145,36+i,0]);
    botonesIluminados[i]=0;
  }
}
