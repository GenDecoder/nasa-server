app.controller('MainCtrl', [
    '$scope',
    '$websocket',
    '$rootScope',
    '$http',
    'gMap',
    'speedBump',
    function
    (
        $scope,
        $websocket,
        $rootScope,
        $http,
        gMap,
        speedBump
    )
    {
        $scope.entity;
        $scope.sensors;
        var mask = angular.element(document.querySelector('#appMask'));
            // gMap.init();            
            $http({
                url: '/entity/getById', 
                method: "GET",
                params: {
                    id: 1
                }
            }).then(function (response) {
                $scope.entity = response.data.object;
                 $http({
                    url: '/entity-sensor/list', 
                    method: "GET",
                    params: {
                        id: 1
                    }
                }).then(function(response) {
                    $scope.sensors = response.list;
                });                
            });
        
        $scope.loc = "-16.5407483,-68.0828799";
        mask.removeClass('on');

        var dataStream = $websocket('ws://localhost:8081/connection');

        dataStream.onMessage(function(message) {    
            var color;
            var value = message.data;
            if (value >= 0 && value <= 30) {
                color = 'green';
            }
            else if (value > 30 && value <= 65)  {
                color = 'yellow';
            }
            else if (value > 65) {
                color = 'red';
            }
            if (!google)        
                return;
           var gMap = google.maps;
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
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: color,
            fillOpacity: 0.35
            });

            $rootScope.bermap.setMap($rootScope.map);
        });
    }
]);