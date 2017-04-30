/**
 * Created by Mario on 26/11/2016.
 */

app.service('gMap', ['gMapInitializer', function(gMapInitializer) {
    var map;
    var gMap;
    var originMarker;
    var destinyMarker;
    var directionsService;
    var directionsDisplay;
    gMapInitializer.then(function () {
        gMap = google.maps;
        directionsService = new gMap.DirectionsService;
        directionsDisplay = new gMap.DirectionsRenderer({
            suppressMarkers: true
        });
        map = new gMap.Map(document.getElementById('nrdGMap'), {
            mapTypeId: gMap.MapTypeId.ROADMAP,
            mapTypeControl: false,
            scaleControl: false,
            zoom: 11,
            center: {
                lat: -16.5207007,
                lng: -68.1615534
            }
        });
        directionsDisplay.setMap(map);
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
