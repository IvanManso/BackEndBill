angular.module('babelrenting').controller('MenuController', 
    ["APIClient", "$window", '$scope', '$location', 'paths', 
    function(APIClient, $window, $scope, $location, paths) {

        // Scope init
        $scope.model = {
            selectedItem: paths.url.movies
        };
        $scope.paths = paths;

        // Scope methods
        $scope.getClassForItem = function(item) {
            if ($scope.model.selectedItem === item) {
                return 'active';
            } else {
                return '';
            }
        };

        $scope.clearUsername = function() {
            APIClient.clearUser()
            console.log("Borrado con éxito a través de logout");
            $scope.successMessage = "Username deleted! ";
            $window.location.href = "#/";
        };

        // Scope event listeners
        $scope.$on('$locationChangeSuccess', function() {
            $scope.model.selectedItem = $location.path();
        });

    }]
);
