mainApp.controller('wrapper-controller', ['$scope', '$rootScope', 'httpService', 'urlService', function(scope, rootScope, httpService, urlService) {
  var api_url = urlService.returnUrl();
  scope.form = {
    location: '',
    meal: '',
    showFilterOptions: false,
    filterList: [],
    filterText: '',
    showMainForm: true,
    showSideForm: false
  };
  scope.results = {
    show: false,
    data: []
  };
 
  scope.addOrRemoveFilter = function(req) {
    var index = scope.form.filterList.indexOf(req);
    if (index === -1) {
      scope.form.filterList.push(req);
    } else {
      scope.form.filterList.splice(index, 1);
    }
    scope.form.filterText = '';
  };

  scope.isRequirementChoosen = function(requirement) {
    return scope.form.filterList.indexOf(requirement);
  };

  httpService.getHTTPRequest(api_url.filters, function(response) {
    scope.filtersOptions = response.list;
  });
  scope.results.getResults = function() {
    httpService.getHTTPRequest(api_url.results, function(response) {
      scope.results.data = response.list;
    });
  };
  scope.form.showOrHideFilterOptions = function() {
    scope.form[showFilterOptions] =! scope.form[showFilterOptions];
  };
  scope.results.getResults();

  scope.showOrHideElement = function(obj, element) {
    obj[element] =! obj[element];
  };

  scope.hideElement = function(obj, element) {
    obj[element] = false;
  };
  scope.showElement = function(obj, element) {
    obj[element] = true;
  };

  var inputFrom = document.getElementById('location');
  var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
  google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
          var place = autocompleteFrom.getPlace();
          scope.form.location = place.formatted_address;
          scope.$apply();
        });
}]);

mainApp.directive('requirementButton', function() {
  
  return {
    restrict: 'E',
    scope: {
      value: '=',
      form:"=",
      addOrRemoveRequirement:"&",
      isRequirementChoosen:"&"
    },
    templateUrl:'app/directives/button.html',
    controller: function($scope) {
     
    }
  };
});

