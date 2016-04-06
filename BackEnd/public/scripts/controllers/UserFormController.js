angular.module("babelrenting").controller("UserFormController", ["$scope", "$log", "APIClient", "$filter", "$window",
    function($scope, $log, APIClient, $filter, $window) {

        $log.log("Estoy en el controlador");

        //Scope init
        $scope.model = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;
        //Scope methods
        $scope.saveUser = function() {
            $log.log("El movie.owner y el día y demás", $scope.model.username, $scope.model.amount, $scope.model.password);
            APIClient.createUser($scope.model)
                .then(
                    function(movie) {
                        $log.log("Soy el console.log de la promesa de saveUser que llama a createUser del servicio");
                        $scope.successMessage = "User saved!";
                        $log.log($scope.model);
                        $scope.model = {};
                        $scope.movieForm.$setPristine();
                        $window.location.href = "#/";
                    },
                    function(error) {
                        //$scope.movieForm.$setPristine();
                        //$window.location.href = "#/userNew";
                        $scope.errorMessage = "Fatal error. Then end is near.";
                    }
                )
        }

    }
]);
