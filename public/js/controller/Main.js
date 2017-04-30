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
        var mask = angular.element(document.querySelector('#appMask'));
        //$scope.testLoc = function () {
            gMap.init();
            $http.get('/getLocation').then(function (location) {
                console.log(location);
            });
        //};
        $scope.test = 0;
        $scope.loc = "-16.5407483,-68.0828799";
        mask.removeClass('on');
        $scope.viewMore = function(item) {
            mask.addClass('on');            
        };

        var dataStream = $websocket('ws://localhost:8081/connection');

        dataStream.onMessage(function(message) {
            $scope.test = message.data;
           console.log(message.data);
        });
    }
]);