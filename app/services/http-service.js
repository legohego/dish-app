mainApp.factory('httpService', ['$http', function(http) {

  return {
    getHTTPRequest: function(api_url, successCallback, errorCallback) {

      return http.get(api_url).success(function(list) {
        return successCallback(list);
      }).error(function(err, status) {
        return errorCallback(err, status);
      });
    }
  };
}]);