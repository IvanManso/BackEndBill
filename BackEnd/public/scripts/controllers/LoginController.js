angular.module('babelrenting').controller('LoginController', ["APIClient", "$scope", "$location", "$window", "paths",
    function(APIClient, $scope, $location, $window, paths) {

        $scope.model = {};
        $scope.successMessage = null;
        $scope.errorMessage = null;

        $scope.saveUsername = function() {
            APIClient.testLogin($scope.model)
                .then(
                    // Movie found
                    function() {
                        console.log("La función del controller de login da el visto bueno, procedemos a guardar en el localStorage el usuario");
                        APIClient.saveUser($scope.model);
                        console.log("Guardado con éxito desde LoginController");
                        $scope.successMessage = "Username saved! ";
                        $window.location.href = "#/bills";
                    },
                    // Movie not found
                    function(error) {
                        // TODO: improve error management
                        $location.url(paths.notFound);
                    }
                );
        };

        $scope.redir = function() {
            $window.location.href = "#/userNew";
        }

    }
]);
