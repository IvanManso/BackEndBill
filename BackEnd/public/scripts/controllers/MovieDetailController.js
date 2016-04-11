angular.module('babelrenting').controller('MovieDetailController', ['$scope', '$window', '$routeParams', '$location', '$sce', '$log', 'APIClient', 'paths',
    function($scope, $window, $routeParams, $location, $sce, $log, APIClient, paths) {

        // Scope init
        $scope.model = {};
        $scope.uiState = 'loading';
        $scope.user = APIClient.takeUser();
        $log.log('Inicializo scope.user en MDC:', $scope.user);
        // Controller init
        $scope.$emit('ChangeTitle', 'Loading...');


        APIClient.getMovie($routeParams.id) //Aquí hay que hacer la petición a Node
            .then(
                // Movie found
                function(movie) {
                    $scope.model = movie.data.rows[0];
                    $scope.uiState = 'ideal';
                    $scope.$emit('ChangeTitle', $scope.model.id);
                },
                // Movie not found
                function(error) {
                    // TODO: improve error management
                    $location.url(paths.notFound);
                }
            );

        $scope.redir = function() {
            $window.location.href = "#/bills/image";

        }

        // Scope method
        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

    }
]);
