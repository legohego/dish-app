
angular.module('gservice', [])
    .factory('gservice', function($http){

        var googleMapService = {};
        var locations = [];
        var selectedLat = 0;
        var selectedLong = 0;


        googleMapService.refresh = function(latitude, longitude){
            locations = [];
            selectedLat = latitude;
            selectedLong = longitude;
          
            $http.get('app/results/results.json').success(function(response){
                locations = convertToMapPoints(response);
                initialize(latitude, longitude);
            }).error(function(){});
        };

        var convertToMapPoints = function(response){
            var locations = [];

            for(var i= 0; i < response.list.length; i++) {
                var meal = response.list[i];
                var sum = 0;
meal.rating.forEach(function(value) {
    sum +=  parseFloat(value.star);
  });
 
                var  contentString =
                    '<p><b>Restraunt</b>: ' + meal.restraunt +
                    '<br><b>Rating</b>: ' + sum +  
                    '<br><b>Review: </b>: ' + meal.numberOfReviews +
                    '<br><b>Allergens</b>: ' + meal.Allergens +
                    '</p>';
                locations.push({
                    latlon: new google.maps.LatLng(meal.location[1], meal.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    restraunt: meal.restraunt,
                    rating: meal.rating,
                    numberOfReviews: meal.numberOfReviews,
                    Allergens: meal.Allergens
                   
            });
        }

        return locations;
    };


var initialize = function(latitude, longitude) {

    var myLatLng = {lat: selectedLat, lng: selectedLong};

    if (!map){
        var map = new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 18,
            center: myLatLng
        });
    }

    locations.forEach(function(n, i){
        var marker = new google.maps.Marker({
            position: n.latlon,
            map: map,
            title: "Big Map",
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });

       
        google.maps.event.addListener(marker, 'click', function(e){
            currentSelectedMarker = n;
            n.message.open(map, marker);

        });
    });

};



return googleMapService;
});
