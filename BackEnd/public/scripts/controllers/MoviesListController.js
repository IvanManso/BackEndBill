angular.module('babelrenting').controller('MoviesListController', ['$scope', '$log', '$filter', 'APIClient', 'URL', 'paths',
        function($scope, $log, $filter, APIClient, URL, paths) {

            // Scope model init
            $scope.model = [];
            $scope.uiState = 'loading';
            $scope.url = URL.resolve;
            $scope.user = APIClient.takeUser();

            // User init
            $scope.getDetail = function(id) {
                APIClient.getMovie(id).then(
                    function(data) {
                        console.log("Los datos son", data);
                        var movies = data;
                        if (movies.length === 0) {
                            $scope.uiState = 'blank';
                        } else {
                            $scope.model = data.rows; //aquí debe de estar el error
                            $scope.uiState = 'ideal';
                        }
                    },
                    //rejected promise
                function() {
                    $scope.uiState = 'error';
                }
                );
            };

            $scope.clearUsername = function() {
                APIClient.clearUser();
            };

            // Scope methods
            $scope.getMovieDetailURL = function(movie) {
                console.log("Los datos de movie para ver el id son", movie);
                return URL.resolve(paths.url.movieDetail, { id: movie._id });
            };

            //AQUÍ
            $scope.saveRenter = function(movie) {
                movie.payment_date = $filter('date')(new Date(), 'yyyy-MM-dd');
                movie.paid = true;
                console.log("EL ID DE LA MOVIE EN SAVERENTER ES", movie._id);
                APIClient.rentMovie(movie);
            };

            // Controller start
            APIClient.getMovies().then(
                //resolved promise
                function(data) {
                    console.log("Los datos son", data);
                    var movies = data;
                    if (movies.length === 0) {
                        $scope.uiState = 'blank';
                    } else {
                        $scope.model = movies.data.rows;
                        $scope.uiState = 'ideal';
                    }
                },
                //rejected promise
                function() {
                    $scope.uiState = 'error';
                }
            );



        }
    ]

);
