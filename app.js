// Module
var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

// Homepage 
myApp.controller('homepageController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.pageTitle = "Homepage";
    $scope.city = cityService.city;
    
    $scope.myFunc = function(param) {
        cityService.city = param;
    }
    
    $scope.$watch('city', function() {  // Watch the city variable, when it changes (event watch list), update the service variable. 
        cityService.city = $scope.city;
    })
    
}])

// Forecast Page 
myApp.controller('forecastController', ['$scope', '$resource', '$http', '$filter', 'cityService', function($scope, $resource, $http, $fitler, cityService) {
    
    $scope.pageTitle = "Forecast Page"
    $scope.city = cityService.city;  // When this component is initiated, I assume it will set this variable. 
    $scope.cityName;
    $scope.weatherList;

    
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast');
    $scope.weatherResult = $scope.weatherAPI.get({ zip: $scope.city + ',us', appid: 'token redacted :) ' }).$promise.then(function(res) {
        $scope.cityName = res.city.name;
        $scope.weatherList = res.list;
    });
    
    
    // We can use the $resource service to interact with RESTful API and use parameters more easily.
    // Returns a promise.
    
    $scope.convertTemp = function(k) {
        return Math.round((1.8 * (k - 273)) + 32); 
    }
    
}])

// Routing

myApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'pages/homepage.html',
        controller: 'homepageController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});

myApp.service('cityService', function() {

    this.city = '53703';
})