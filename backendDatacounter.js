var Firebase = require('firebase');
var dataUrl = "https://cth-data-overheid-rj.firebaseio.com/";
var fireRef = new Firebase("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/");
var datasetRef = new Firebase("https://cth-data-overheid-rj.firebaseio.com/rows");



var query = datasetRef;
var urls = [];
var tagIndex = {};
var result = [];

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
  	var chosenconcepts = ["veiligheid","begroting","transport","health","environment","society"];
  	var chosenconceptstranslated = ["security","wealth","transport","health","nature","family"];

  	for (var i = 0; i < chosenconcepts.length; i++){
  		
  		var temp = statuscounter(tagIndex[chosenconcepts[i]]);
  		temp.name = chosenconceptstranslated[i];
  		concepts.push(temp);

  	}
console.log(concepts)
  	
});
 