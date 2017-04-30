/**
* Created by mario.
 *
 * This needs a global function, so we use $window
*/
app.factory('gMapInitializer', function($window, $q) {
    var defer = $q.defer();
    var script = document.createElement('script');
    var url = 'https://maps.googleapis.com/maps/api/js' +
        '?key=AIzaSyDkwlrBUZtElMS_RPAStTG25gmONsdrveM' +
        '&callback=gMapInitializer';

    $window.gMapInitializer = function () {
        defer.resolve();
    };

    script.src = url;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return defer.promise
});