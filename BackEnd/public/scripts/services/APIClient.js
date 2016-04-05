angular.module('babelrenting').service('APIClient', ["$window", '$http', '$q', '$filter', '$log', 'apiPaths', 'URL',
    function($window, $http, $q, $filter, $log, apiPaths, URL) {

        // User logic
        this.saveUser = function(user) {
            $log.log("Estoy en APIClient accediendo a saveUser con el name", user.username);
            $window.localStorage.setItem("username", user.username);
        };

        this.takeUser = function() {
            var user = $window.localStorage.getItem("username");
            $log.log("Estoy en APIClient accediendo a takeUser:", user);
            return user;
        };

        this.clearUser = function() {
            $window.localStorage.setItem("username", "");
        };

        // Server request
        this.apiRequest = function(url) {

            // deferred object creation
            var deferred = $q.defer();

            // async work
            $http.get(url)
                .then(
                    // ok request
                    function(response) {
                        // promise resolve
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject(response.data);
                    }
                );

            // return promise
            return deferred.promise;

        };

        /*this.getMovies = function() {
            return $http.get("api/v1/factura");
            .then(function(response) {
                return response.data;
            });
            //return this.apiRequest(apiPaths.movies);

        }; */

        this.getMovies = function() {
            console.log("Estoy en getMovies");
            return $http.get('/api/v1/factura');
        };

        this.getMovie = function(movieId) {

            var url = URL.resolve(apiPaths.movieDetail, { id: movieId });
            return this.apiRequest(url);

        };


        this.createMovie = function(movie) {
            // deferred object creation
            var deferred = $q.defer();


            // async work
            $http.post(apiPaths.movies, movie)
                .then(
                    // ok request
                    function(response) {
                        // promise resolve
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject(response.data);
                    }
                );

            // return promise
            return deferred.promise;

        };

        this.rentMovie = function(movie) {
            // deferred object creation
            var deferred = $q.defer(movie);
            var url = URL.resolve(apiPaths.movieDetail, { id: movie.id });

            // async work
            $http.put(url, movie)
                .then(
                    // ok request
                    function(response) {
                        // promise resolve
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject(response.data);
                    }
                );

            // return promise
            return deferred.promise;

        };

    }
]);
