var Firebase = require('firebase');
var dataUrl = "https://cth-data-overheid-rj.firebaseio.com/";
// var fireRef = new Firebase("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/");
var datasetRef = new Firebase("https://cth-data-overheid-rj.firebaseio.com/rows");
// var linksRef = new Firebase ("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/links");
// var resourcesRef = new Firebase("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/datasets/000b1208-433f-4a12-a60c-f2e092815ec6/resources");



var query = datasetRef;
// var query = linksRef
var urls = [];
var tagIndex = {};
var result = [];
var buckettransportation = [];

query.on('value', function(snapshot) {
  result = snapshot.val();
  // console.log(result.length);

   for (var i in result){
  		result[i].tagscomma = result[i].tagscomma.split(", ");
  		var statuscode = result[i]["resource - url - status_code"];
  	
  	for (k in result[i].tagscomma) {
			var tagName = result[i].tagscomma[k];

			if (tagName in tagIndex) {
				tagIndex[tagName]["statuscode"].push(statuscode);
				
			}
			else {
				tagIndex[tagName] = {};
				tagIndex[tagName]['statuscode'] = [statuscode];
				
			}
		}
  	};
  	function statuscounter(theone) {
  		var count = {total: 0, working: 0, semiWorking: 0, notWorking: 0};

  		for (var j in theone.statuscode){
  			// console.log(theone.statuscode[j]);

	  		if (theone.statuscode[j] == 200){
	  			count.working ++;
	  		}
	  		else if (theone.statuscode[j] == 400){
	  			count.semiWorking ++;
	  		}
	  		else if (theone.statuscode[j] == "INVALID"){
	  			count.notWorking ++;
	  		}


  		} 
  		
  		count.total = theone.statuscode.length;
  		return count;

  	};
  	
  	var concepts = [];
  	var chosenconcepts = ["begroting","health","transport","environment","society","veiligheid"];
  	var chosenconceptstranslated = ["wealth","health","transport","nature","family","security"];

  	for (var i = 0; i < chosenconcepts.length; i++){
  		
  		var temp = statuscounter(tagIndex[chosenconcepts[i]]);
  		temp.concept = chosenconceptstranslated[i];
  		concepts.push(temp);

  	}
console.log(concepts)
  	
});
 