mainApp.controller('wrapper-controller', ['$scope', '$rootScope', 'httpService', function(scope, rootScope, httpService) {
  
  scope.searchDetails = {
    location: '',
    dish: '',
    detailed: false
    

  };

  httpService.getHTTPRequest('app/locations/locations.json', function(list) {
    scope.locations = list;
  });
  scope.dietrayRequirments = [];
  scope.addRequirements = function(req) {
    console.log('req', scope.dietrayRequirments.indexOf(req));
    if (scope.dietrayRequirments.indexOf(req) == -1) {
      scope.dietrayRequirments.push(req);
    };

  };
  scope.items = ['Gluten', 'Nuts', 'Dairy', 'Celery','Egg', 'Oats', 'Meat', 'Rice', 'Soy', 'Wheat', 'Barley', 'Fish or Shellfish', 'Garlic'];

  scope.remove =function(req) {
    
    var index = scope.dietrayRequirments.indexOf(req);
    scope.dietrayRequirments.splice(index, 1);
  };
}]);