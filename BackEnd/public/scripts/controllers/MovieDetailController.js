angular.module('babelrenting').controller('MovieDetailController',
	['$scope', '$routeParams', '$location', '$sce', '$log', 'APIClient', 'paths',
	function($scope, $routeParams, $location, $sce, $log, APIClient, paths){

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

		// Scope method
		$scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

	}]
);
