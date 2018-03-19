// request MIDI access
var inputs;
var outputs;
var salidas=[];

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    console.log('MIDI Access Object', midiAccess);

    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    inputs = midi.inputs.values();
    outputs= midi.outputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
    for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        salidas.push(output);
    }
    salidas[0].value.send([176, 104, 127]);
}

function onMIDIFailure(e) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    salidas[0].value.send([data[0],data[1],data[2]])// rojo:0x0f verde: 0x30 ambar:0x13 yellow: 127; verde suave: 0x18...
    console.log('MIDI data', data); // MIDI data [144, 63, 73]
    //message.target.send( [0x92, 60, 127]);
}

var luces={};

luces.posiciones=[0,16,32,48,64,80,96,112],

luces.enciende=function(nota,posicion){
  console.log("enciendo");
}
