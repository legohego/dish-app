mainApp.controller('wrapper-controller', ['$scope', '$rootScope', 'httpService', function(scope, rootScope, httpService) {
  
  scope.searchDetails = {
    location: '',
    dish: '',
    showDetailedForm: false,
    dietrayRequirments: [],
    filter: '',
    showMainForm: true
  };
  scope.searchResults = {
    show: false
  };
  scope.hi = function(req) {
   
    var index = scope.searchDetails.dietrayRequirments.indexOf(req);
    if (index === -1) {
      scope.searchDetails.dietrayRequirments.push(req);
    } else {
      scope.searchDetails.dietrayRequirments.splice(index, 1);
    }
    scope.searchDetails.filter = '';
  };
  scope.addOrRemoveRequirements = function(req) {
    var index = scope.searchDetails.dietrayRequirments.indexOf(req);
    if (index === -1) {
      scope.searchDetails.dietrayRequirments.push(req);
    } else {
      scope.searchDetails.dietrayRequirments.splice(index, 1);
    }
    scope.searchDetails.filter = '';
  };

  scope.isRequirementChoosen = function(requirement) {
    return scope.searchDetails.dietrayRequirments.indexOf(requirement);
  };

  httpService.getHTTPRequest('app/locations/locations.json', function(list) {
      scope.locations = list;
    });
  httpService.getHTTPRequest('app/dietary-requirements/dietary-requirements.json', function(response) {
    scope.dietaryRequirementList = response.list;

  });
  httpService.getHTTPRequest('app/results/results.json', function(response) {
    scope.results = response.list;

  });

    var inputFrom = document.getElementById('location');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        scope.searchDetails.location = place.formatted_address;
        scope.$apply();
    });
}]);

mainApp.directive('requirementButton', function() {
  
  return {
    restrict: 'E',
    scope: {
      value: '=',
      searchDetails:"=",
      addOrRemoveRequirement:"&",
      isRequirementChoosen:"&"
    },
    templateUrl:'app/directives/button.html',
    controller: function($scope) {
     
    }
  };
});

