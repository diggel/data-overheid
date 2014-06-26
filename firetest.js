var Firebase = require('firebase');
var dataUrl = "https://cth-data-overheid-rj.firebaseio.com/";
// var fireRef = new Firebase("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/");
var datasetRef = new Firebase("https://cth-data-overheid-rj.firebaseio.com/rows");
// var linksRef = new Firebase ("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/links");
// var resourcesRef = new Firebase("https://pilotcthdata.firebaseio.com/dataoverheidnl/26-05-14/datasets/000b1208-433f-4a12-a60c-f2e092815ec6/resources");



var query = datasetRef.limit(10)
// var query = linksRef
var urls = [];
var tags = {};
var result = [];

query.on('value', function(snapshot) {
  result = snapshot.val();
  console.log(result.length);

   // for (var i in result){
  	// 	result[i].tagscomma = result[i].tagscomma.split(", ");
  	// };
  	// console.log(result.length);
});
 