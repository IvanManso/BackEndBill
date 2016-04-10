angular.module('babelrenting').service('APIClient', ["$window", '$http', '$q', '$filter', '$log', 'apiPaths', 'URL',
    function($window, $http, $q, $filter, $log, apiPaths, URL) {


        this.testLogin = function(user) {
            var deferred = $q.defer();
            var response;
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
                        /*$window.alert( "Your username or password is incorrect. Please check your credentials and try again.");*/
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
                        deferred.reject("lo hago mal", response.data);
                    }
                );
            return deferred.promise;

        }

        this.saveUser = function(user) {
            //$log.log("Estoy en APIClient accediendo a saveUser con el name", user.name);
            $window.localStorage.setItem("username", user.name);
        };

        this.takeUser = function() {
            var user = $window.localStorage.getItem("username");
            //$log.log("Estoy en APIClient accediendo a takeUser:", user);
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
                        console.log("Servicio apiRequest completado");
                        deferred.resolve(response.data);
                    },
                    // KO request
                    function(response) {
                        // promise reject
                        deferred.reject(response.data);
                    }
                );

            // return promise
            console.log("La promesa devuelta es", deferred.promise);
            return deferred.promise;

        };

        /*this.getMovies = function() {
            return $http.get("api/v1/factura");
            .then(function(response) {
                return response.data;
            });
            //return this.apiRequest(apiPaths.movies);

        }; */
        this.getMovie = function(movieId) { //modificar para que devuelva la película pedida
            //console.log("El movieId es", movieId);
            var url = URL.resolve(apiPaths.movieDetail, { id: movieId });
            //console.log("El id de la facturas es", movieId);
            //console.log("Soy el getMovie, después de esta acción debería hacer la petición ajax de get con el id que tengo", movieId);
            //console.log("La URL es", url);
            return $http.get('/api/v1/factura/' + movieId);

            //return this.apiRequest(url);
        };

        this.getMovies = function() {
            console.log("Estoy en getMovies");
            return $http.get('/api/v1/factura');
        };

        this.createMovie = function(movie) {
            console.log("Estoy en createMovies");
            return $http.post('/api/v1/factura', movie);
        }


        this.rentMovie = function(movie, name) {
            // deferred object creation
            console.log("El objeto que me han pasado movie contiene", movie);
            var deferred = $q.defer(name);
            //var url = URL.resolve(apiPaths.movieDetail, { id: movie.id });
            console.log("Los datos de movie para ver el id son", movie);
            console.log("El nombre en APIClient es", name);

            // async work '/api/v1/factura/' + movie.id
            console.log("TRAS ESTO COMENZARÁ LA PETICIÓN AJAX DE PUT");
            $http.put('/routes/users/' + name, movie).then(
                // ok request
                function(response) {
                    console.log("PETICIÓN PUT1 COMPLETADA");
                    console.log("EL OBJETO DESPUÉS DEL PUT1 CONTIENE", movie);
                    console.log("EL ID DE LA MOVIE TRAS EL PUT1 ES", movie._id);
                    $http.put('/api/v1/factura/' + movie._id, movie);
                    // promise resolve
                    console.log("PETICIÓN PUT2 COMPLETADA, PROCEDEMOS A REALIZAR EL GET DE LA MISMA PARA QUE TENGAMOS LOS DATOS ACTUALZIADOS");
                    console.log("En este momento el movie._id es", movie._id);
                    ///Aquí se cuelga ........
                    $http.get('/api/v1/factura/' + movie._id).then(
                        function(response) {
                            console.log("Estoy en la promesa del get tras realizar el PUT");
                            deferred.resolve(response.data);
                        },

                        function(response) {
                            // promise reject
                            deferred.reject(response.data);
                        }
                    );
                },
                // KO request
                function(response) {
                    // promise reject
                    deferred.reject(response.data);
                }
            );
            return deferred.promise;
        };

    }
]);

/*.then(
    function(response) {
        $http.put('/api/v1/factura/' + movie._id, movie);
         //modificar
            .then(
                // ok request
                function(response) {
                    // promise resolve
                    console.log("PETICIÓN PUT COMPLETADA, PROCEDEMOS A REALIZAR EL GET DE LA MISMA PARA QUE TENGAMOS LOS DATOS ACTUALZIADOS");
                    $http.get('/api/v1/factura/' + movie._id).then(
                        function(response) {
                            deferred.resolve(response.data);
                        },

                        function(response) {
                            // promise reject
                            deferred.reject(response.data);
                        }
                    );
                },
                // KO request
                function(response) {
                    // promise reject
                    deferred.reject(response.data);
                }
            );
    },

    function(response) {
        // promise reject
        deferred.reject(response.data);
    }
)

    */
// return promise
