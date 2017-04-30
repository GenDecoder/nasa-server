/**
 * Created by Mario on 26/11/2016.
 */

app.service('gMap', ['$rootScope','gMapInitializer', function($rootScope, gMapInitializer) {
    var map;
    var gMap;
    var originMarker;
    var destinyMarker;
    var directionsService;
    var directionsDisplay;
    gMapInitializer.then(function (color) {
        
        
        // directionsService = new gMap.DirectionsService;
        // directionsDisplay = new gMap.DirectionsRenderer({
        //     suppressMarkers: true
        // });
        // map = new gMap.Map(document.getElementById('nrdGMap'), {
        //     mapTypeId: gMap.MapTypeId.ROADMAP,
        //     mapTypeControl: false,
        //     scaleControl: false,
        //     zoom: 11,
        //     center: {
        //         lat: -16.5207007,
        //         lng: -68.1615534
        //     }
        // });

        gMap = google.maps;
        $rootScope.map = new gMap.Map(document.getElementById('nrdGMap'), {
          zoom: 15,
           mapTypeControl: false,
            scaleControl: false,
          center: {lat: -16.503451, lng: -68.097196},
          mapTypeId: 'hybrid'
        });

        $rootScope.bermap = new gMap.Polygon({
          paths: [
            {lat: -16.504679, lng: -68.099148}, 
            {lat: -16.504775, lng: -68.095511},
            {lat: -16.501476, lng: -68.094057},
            {lat: -16.500912, lng: -68.096483},
            {lat: -16.501753, lng: -68.098606},
            {lat: -16.503537, lng: -68.098108},
            {lat: -16.503237, lng: -68.096164}
            ],
          strokeColor: color || 'white',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: color || 'white',
          fillOpacity: 0.35
        });

        $rootScope.bermap.setMap($rootScope.map);

        // directionsDisplay.setMap(map);
    });

    var addRoute = function () {
        addOriginMarker(new gMap.LatLng(-16.5207007, -68.1615534));
        directionsService.route({
            origin: new gMap.LatLng(-16.5207007, -68.1615534),
            destination: new gMap.LatLng(-16.507607,-68.0552217),
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            console.log(response);
            if (status === gMap.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };

    var addOriginMarker = function (latLng) {
        originMarker && originMarker.setMap(null);
        originMarker = new gMap.Marker({
            position: latLng,
            icon: getMapImage('dollar.png')
        });
        originMarker.setMap(map);
        /*originMarker.addListener('click', function toggleBounce() {
            if (originMarker.getAnimation() !== null) {
                originMarker.setAnimation(null);
            } else {
                originMarker.setAnimation(gMap.Animation.BOUNCE);
            }
        });*/
    };

    var getMapImage = function (png) {
        return new gMap.MarkerImage(
            'https://maps.google.com/mapfiles/kml/shapes/' + png,
            null,
            null,
            null,
            new gMap.Size(20, 20)
        );
    };

    return {
        init: function () {
            if (navigator.geolocation)
                navigator.geolocation.getCurrentPosition(addRoute, function error() {
                    console.log('Please enable your GPS position.');
                }, {
                    enableHighAccuracy: true
                });
            else
                console.log('Geolocation API is not supported.');
        }
    };
}]);
