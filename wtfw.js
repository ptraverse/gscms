// wtfw.js

var wtf_wikipedia = require('wtf_wikipedia')
var _ = require('underscore');
var mongo = require('mongoskin').db('mongodb://localhost:27017/stocks');
mongo.bind('nyse');

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

console.log();

var letters=['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var tickers = [];
for (var i = 0; i < letters.length; i++) {
  letter = letters[i];
  var article = 'Companies_listed_on_the_New_York_Stock_Exchange_(' + letter + ')';
  console.log(article + ': ');
  wtf_wikipedia.from_api(article, "en", function(markup){
    if (markup) {
      var obj = wtf_wikipedia.parse(markup)
      var rows = markup.split('|----');
      console.log();
      _.each(rows, function(row) {
        // console.log(row);
        if (row) {
          items = row.split('|');
          if (items && ((items[2] && items[2].trim().replace(/[\[\]\{\}]+/g, '') == 'nyse1') || (items[3] && items[3].trim().replace(/[\[\]\{\}]+/g, '') == 'nyse1')) ) {
            var offset = 0;
            var name = items[1];
            if (name) {
              name = name.trim().replace(/[\[\]\{\}]+/g, '');
            }
            var ticker = items[3];
            if (ticker) {
              if (ticker.trim().replace(/[\[\]\{\}]+/g, '') == 'nyse1') {
                ticker = items[4]
                offset = 1;
              }
              ticker = ticker.trim().replace(/[\[\]\{\}]+/g, '');
            }
            var country = items[4 + offset];
            if (country) {
              country = country.trim().replace(/[\[\]\{\}]+/g, '');
            }

            var company = {
              'tick': ticker,
              'name': name,
              'country': country
            };

            mongo.nyse.insert(company, function(err) {
              if (err) {
                throw err;
              }              
            });
          }
        }
      });
    }
    sleep(100);
  });
  sleep(100);
};
