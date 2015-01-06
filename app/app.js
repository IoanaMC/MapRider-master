skiApp = angular.module('SkiApp',[]);


skiApp.controller('MainCtrl', function ($scope, $http) {
    $scope.name={"nume":"George", "css":"one-word"};

    $scope.names = [
        {"nume":"George", "css":"one-george"},
        {"nume":"Ioana", "css":"one-ioana"},
        {"nume":"Oana", "css":"one-oana"},
        {"nume":"Mara", "css":"one-mara"}
    ];

    $scope.client_id = "GLRL2RS53SBUUTYTRVXC5TQRW33W4W3FCNSBYEDOGYRKKN21";
    $scope.secret_key = "SX52O34IHKMMMY2PTSBKCNREU0TUET0RRKB2T0F0KZNBCTHE";

    $scope.options = ["---Select---", "ski", "coffee", "hotel"];
    $scope.selectedOption = $scope.options[0];
    //get user location
    function showPosition(position) {
        $scope.coordX = position.coords.latitude;
        $scope.coordY = position.coords.longitude;

        //make request
        $http.get("https://api.foursquare.com/v2/venues/search?client_id="+$scope.client_id+"&client_secret="+$scope.secret_key+"&v=20130815&ll="+$scope.coordX+","+$scope.coordY+"&query="+$scope.selectedOption+"")
        .success(function(data){
            $scope.venuesList = data.response.venues;
        });

        $scope.$apply();
    }


    $scope.getPlaces = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    };


});