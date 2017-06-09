mainApp.controller('wrapper-controller', ['$scope', '$rootScope', 'httpService', 'urlService', '$location', 'geolocation', 'gservice', function(scope, rootScope, httpService, urlService, location, geolocation, gservice) {
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
  scope.input = {
    meal:'',
    location: '',
  };
  scope.results.getResults = function() {
    httpService.getHTTPRequest(api_url.results, function(response) {
      scope.results.data = response.list;
      gservice.refresh(53.274323867396056, -9.04912948358401);
    });
  };
scope.active =  {
    location: false,
    meal: false,
    filter: false
};

  scope.url_params = location.search();
  scope.hasUserPerformedASearch = function() {
    if ((location.search().location !== '' && location.search().location !== undefined)  && (location.search().dish !== '' && location.search().meal  !== undefined) ) {
      scope.form.showMainForm = false;
      scope.form.showSideForm = true;
      scope.input.location = location.search().location;
      scope.form.meal = location.search().meal;
      scope.form.location = location.search().location;
      scope.input.meal = location.search().meal;
      scope.results.show = true;
      scope.results.getResults();
     
    }else {
      scope.form.showMainForm = true;
      scope.form.showSideForm = false;
    }
  };
  scope.hasUserPerformedASearch();
 
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
  scope.form.search = function() {
    scope.form.location = scope.input.location;
    scope.form.meal = scope.input.meal;
  };
  var inputFrom = document.getElementById('location');
  var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
  google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
          var place = autocompleteFrom.getPlace();
          scope.form.location = place.formatted_address;
          scope.$apply();
        });
}]);

mainApp.directive('filterOption', function() {
  
  return {
    restrict: 'E',
    scope: {
      value: '=',
      form:"=",
      addOrRemoveRequirement:"&",
      isRequirementChoosen:"&"
    },
    templateUrl:'app/directives/filter-option.html',
    controller: function($scope) {
     
    }
  };
});

