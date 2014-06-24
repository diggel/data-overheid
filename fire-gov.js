var Firebase = require('firebase');
var dataUrl = "https://pilotcthdata.firebaseio.com/";
var testUrl = "https://popping-fire-9951.firebaseio.com/";
var testRef = new Firebase(testUrl);
var linkRef = new Firebase(dataUrl + "dataoverheidnl/26-05-14/links");
var dataRef = new Firebase(dataUrl + "dataoverheidnl/26-05-14/datasets");
var resourceRef = new Firebase(dataUrl + "dataoverheidnl/26-05-14/datasets/000b1208-433f-4a12-a60c-f2e092815ec6");

var codeCount = {};

var days = ['26-05-14', '27-05-14'];

/*
linkRef.on('value', function(snapshot) {
	var result = snapshot.val();
	for (var i = 0; i < result.length; i++) {
		var code = result[i].status_code;
		if (code in codeCount) {
			codeCount[code].push(result[i].url);
		}
		else {
			codeCount[code] = [result[i].url];
		}
	}
	console.log(codeCount);
});
*/

var tagIndex = {};

var query = dataRef.limit(10);

query.on('value', function(snapshot) {
	var result = snapshot.val();
	//console.log(result);
	for (var i in result) {
		var id = result[i].id;
		var links = [];

		for (j in result[i].resources) {
			links.push(result[i].resources[j].url);
		}
		
		for (k in result[i].tags) {
			var tagName = result[i].tags[k].name.display_name;

			if (tagName in tagIndex) {
				tagIndex[tagName]['datasets'].push(id);
				tagIndex[tagName]['links'].push(links);
			}
			else {
				tagIndex[tagName] = {};
				tagIndex[tagName]['datasets'] = [id];
				tagIndex[tagName]['links'] = links;
			}
		}
	}
	console.log(tagIndex);
	testRef.child('tagIndex').set(tagIndex);
});



