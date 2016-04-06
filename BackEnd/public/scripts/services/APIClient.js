angular.module('babelrenting').service('APIClient', ["$window", '$http', '$q', '$filter', '$log', 'apiPaths', 'URL',
    function($window, $http, $q, $filter, $log, apiPaths, URL) {


        this.testLogin = function(user) {
            var deferred = $q.defer();
            console.log("Estoy en el testLogin del servicio");
            $http.post('/routes/index', user)
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
            return deferred.promise;
        }

        // User logic

        this.createUser = function(user) {
            var deferred = $q.defer();
            console.log("Estoy en createUser");
            $http.post('/routes/users', user)
                .then(
                    // ok request
                    function(response) {
                        // promise resolve
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject("lo hago mal",response.data);
                    }
                );
            return deferred.promise;

        }

        this.saveUser = function(user) {
            $log.log("Estoy en APIClient accediendo a saveUser con el name", user.name);
            $window.localStorage.setItem("username", user.name);
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

        this.getMovie = function(movieId) { //modificar para que devuelva la película pedida
            console.log("El movieId es", movieId);
            var url = URL.resolve(apiPaths.movieDetail, { id: movieId });
            console.log("El id de la movie es", id);
            return $http.get('/api/v1/factura/:id');
            //return this.apiRequest(url);

        };

        this.createMovie = function(movie) {
            console.log("Estoy en createMovies");
            return $http.post('/api/v1/factura', movie);
        }

        /* this.createMovie = function(movie) {
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

         }; */

        this.rentMovie = function(movie) {
            // deferred object creation
            var deferred = $q.defer(movie);
            var url = URL.resolve(apiPaths.movieDetail, { id: movie.id });
            console.log("Los datos de movie para ver el id son", movie);

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
