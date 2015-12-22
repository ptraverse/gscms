var path = require('path');
var db = require('mongoskin').db('mongodb://localhost:27017/gscms');

var Chart = function(h,s,q,j){

	this.hashe = h;
	this.sheetUrl = s;
	this.queryString = q;
	this.jsFile = j;

}

Chart.prototype = {
	constructor: Chart,
	save: function(callback) {
		db.collection('charts').insertOne({
			"hash": this.hashe,
			"sheetUrl": this.sheetUrl,
			"queryString": this.queryString,
			"jsFile": this.jsFile
		}, function(err, result) {			
	    	if (err) throw err;
	    	console.log('inserted into charts collection');
	    	console.log(result); //or callback result
	    	callback(result);
		}
	},
	getHashe: function(callback) {
		callback(this.hashe);
	};
}
