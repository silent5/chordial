autowatch = 1;

inlets = 4;
outlets = 4;

var notes = [-1, -1, -1, -1];
var drnNotes = [60, 64, 67, 71];
var vels = [0, 0, 0, 0];
var drnVels = [100, 100, 100, 100];
var enabled = [true, true, true, true];
var isDrone = false;
var retrig = false;

function list(inputList) {
  var a = arrayfromargs(arguments);
  if (isDrone) {
    processDroneVoice(a, inlet);
  }
  else {
    processVoice(a, inlet);
  }

}

function processVoice(a, inlet) {
  var note = a[0];
  var vel = a[1];
  var currNote = notes[inlet];

  if (vel > 0) { //note-on
    if (currNote !=  note) {
      // - Turn off the note that is currently playing
      sendNote(inlet, currNote, " 0");
      // - Create a new note/vel pair from the input
      notes[inlet] = note;
      drnNotes[inlet] = note;
      vels[inlet] = vel;
      drnVels[inlet] = vel;
      // - Send out the new note/vel pair
      sendNote(inlet, note, vel);
    }
  } else { //note-off
      notes[inlet] = -1;
      vels[inlet] = 0;
      sendNote(inlet, note, vel);
  }

}


function processDroneVoice(a, inlet) {
  var note = a[0];
  var vel = a[1];
  var currNote = drnNotes[inlet];

  if (vel > 0){
    //the next note on needs to trigger every voice.
    retrig = true;
  }

  if (currNote !=  note) {
    // - Turn off the note that is currently playing
    sendNote(inlet, currNote, " 0");
    // - Create a new note from the input
    drnNotes[inlet] = note;
    if (vel != 0) {
      drnVels[inlet] = vel;
    }
    if (retrig) {
      for (var i = 0; i < drnNotes.length; i++) {
        sendNote(i, drnNotes[i], drnVels[i]);
      }
      retrig = false;
    }
    else {
      sendNote(inlet, drnNotes[inlet], drnVels[inlet]);
    }

  }

}

function drone() {
  isDrone = true;
  for (var i = 0; i < drnNotes.length; i++) {
    sendNote(i, drnNotes[i], drnVels[i]);
	notes[i] = -1;
  }

}

function key() {
  isDrone = false;
  for (var i = 0; i < drnNotes.length; i++) {
    sendNote(i, drnNotes[i], 0);
	drnNotes[i] = -1;
  }
	
}

function disable() {
  var note = -1;
  if (isDrone) {
    note = drnNotes[inlet];
  }
  else {
    note = notes[inlet];
  }
  sendNote(inlet, note," 0");
  enabled[inlet] = false;

}

function enable() {
  var note = -1;
  var vel = 100;
  if (isDrone) {
    note = drnNotes[inlet];
    vel = drnVels[inlet];
  }
  else {
    note = notes[inlet];
    vel = vels[inlet];
  }
  enabled[inlet] = true;
  sendNote(inlet, note, vel);

}

function sendNote(inlet, note, vel) {
  if (enabled[inlet]) {
    outlet(inlet, note + " " + vel);
  }

}

function postln(cmd) {
  post(cmd);
  post();

}
