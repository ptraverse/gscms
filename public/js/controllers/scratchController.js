var aqpApp = angular.module('aqpApp', ['timer', 'ngResource']);

aqpApp.controller('ScratchController', function ($scope, $resource, $location) {
	$scope.fooVar1 = 'fooVal1';
	$scope.name = '';
	$scope.currentTime = '';

	$scope.timerRunning = true;

	$scope.startTimer = function (){
		$scope.$broadcast('timer-start');
		$scope.timerRunning = true;
	};

	$scope.stopTimer = function (){
		$scope.$broadcast('timer-stop');
		$scope.timerRunning = false;
	};

	$scope.resetTimer = function(){
		$scope.$broadcast('timer-reset');
		$scope.timerRunning = false;
	};

	$scope.$on('timer-stopped', function (event, data){
		console.log('Timer Stopped - data = ', data);
	});

	var host = $location.host();
	var companyTable = $resource(
		'http://'+host+':3000/aqp/companies/:id',
		{ id:'@_id'},
		{ 'query':
			{
				method: 'GET',
				isArray: true
			}
		}
	);
	console.log(companyTable);
	$scope.companiesList = companyTable.query({}, function (companies) {
		return companies;
	});

});

aqpApp.filter('capitalize', function() {
    return function(input) {
		return input.charAt(0).toUpperCase() + input.slice(1);
	};
});

