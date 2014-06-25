var Firebase = require('firebase');
var dataUrl = "https://pilotcthdata.firebaseio.com/";
var fireRef = new Firebase("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/");
var datasetRef = new Firebase("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/datasets");
var linksRef = new Firebase ("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/links");
var resourcesRef = new Firebase("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/datasets/000b1208-433f-4a12-a60c-f2e092815ec6/resources");



var query = datasetRef
// var query = linksRef
var urls = [];


query.on('value', function(snapshot) {
  var result = snapshot.val();
  for (var i in result){
  		
   	for (j in result[i].resources) {
  		urls.push(result[i].resources[j].url);
  	} 
}
  console.log(urls.length)
});
