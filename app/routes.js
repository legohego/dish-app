var mainApp = angular.module('mainApp', ['geolocation', 'gservice']);

mainApp.config(function($locationProvider) {
  
  $locationProvider.html5Mode(true);

});



