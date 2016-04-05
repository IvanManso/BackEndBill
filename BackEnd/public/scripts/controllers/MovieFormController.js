angular.module("babelrenting").controller("MovieFormController", 
    ["$scope", "$log", "APIClient","$filter", "$window", 
    function($scope, $log, APIClient, $filter, $window) {

        $log.log("Estoy en el controlador");

        //Scope init
        $scope.model = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;
        $scope.user = APIClient.takeUser();
        $log.log("El usuario actual en el listado es", $scope.user);
        //Scope methods
        $scope.saveMovie = function() {
            $scope.model.owner = $scope.user;
            $scope.model.upload_date = $filter('date')(new Date(), 'yyyy-MM-dd');
            $log.log("El movie.owner y el día y demás", $scope.model.owner, $scope.model.upload_date);
            APIClient.createMovie($scope.model)
                .then(
                    function(movie) {
                        $log.log("Soy el console.log de la promesa");
                        $scope.successMessage = "Movie saved!";
                        $log.log($scope.model);
                        $scope.model = {};
                        $scope.movieForm.$setPristine();
                        $window.location.href = "#/movies";
                    },
                    function(error) {
                        $scope.errorMessage = "Fatal error. Then end is near.";
                    }
                )
        }

    }]
);
