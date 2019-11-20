/*

This js is used to massage the output from a live.menu object into a key value
pair for updating entries in a coll object.

Input: List in the format [INT][STRING] where:
	   [INT] = index indicating which live.menu object is sending.
	   [STRING] = argument to switch statement for selectin chord shape.

*/

inlets = 1;
outlets = 1;


var shape = "";
function bang() {
	
	outlet(0, shape);
	
}

function list(a) {

	var index = arguments[0];
	var message = arguments[1].toLowerCase();
		
	switch (message) {
		case "major":
			shape = "4 7 11";
			break;
		case "minor":
			shape = "3 7 10";
			break;	
		case "sus2":
			shape = "2 7 10";
			break;
		case "sus4":
			shape = "5 7 10";
			break;
		case "sus2m7":
			shape = "2 7 11";
			break;
		case "sus4m7":
			shape = "5 7 11";
			break;
		case "dom":
			shape = "4 7 10";
			break;
		case "half-dim":
			shape = "3 6 10";
			break;
		default:
			shape = "";
	}	
	outlet(0, index + " " + shape);

}