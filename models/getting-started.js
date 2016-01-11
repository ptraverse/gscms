var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gscms');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  	var chartSchema = mongoose.Schema({
    	hashe: String,
    	sheetUrl: String,
    	query: String,
    	jsFile: String
	});

	// NOTE: methods must be added to the schema before compiling it with mongoose.model()
	// chartSchema.methods.save = function (err, chart) {
 //  		console.log('saved '+chart);
	// };

	var Chart = mongoose.model('Chart', chartSchema);

	var hmux= new Chart({ hashe: 'hmux' });
	console.log(hmux.hashe); // 'hmux'

	hmux.save(function (err, hmux) {
		if (err) return console.error(err);
	  	console.log(hmux);
	});
});
