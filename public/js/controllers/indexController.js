var aqpApp = angular.module('aqpApp', []);

aqpApp.controller('IndexController', function ($scope) {

    var awesomeWords = [
        'cash',
        'money',
        'sex',
        'music',
        'wine',
        'chocolate',
        'scotch',
        'cigars',
        'leather',
        'gold',
        'silk',
        'satin',
        'velvet',
        'champagne',
        'caviar',
        'candles',
        'jazz',
        'roses',
        'oil'
    ];

    //select 2 to 5 words and fencepost with & and capitalize
    var makePhrase = function(array) {
        var n = Math.floor((Math.random() * 5) + 2);
        var arrayLength = array.length;
        var phrase = '';
        while (n > 0) {
            index = Math.floor((Math.random() * arrayLength) + 1);
            word = array[index];
            if (word!==undefined) {
                if (n===1) {
                    phrase = phrase+' '+capitalize(word);
                } else {
                    phrase = phrase+' '+capitalize(word)+' &';
                }
                array.splice(index, 1);
                n = n - 1;
            }
        }
        return phrase;
    };

    var capitalize = function(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    };

    var aweomsePhrase = makePhrase(awesomeWords);

    $scope.awesomePhrase = aweomsePhrase;

});