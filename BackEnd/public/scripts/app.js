// Defino módulo babelrentig
angular.module('babelrenting', ['ngRoute', 'ngSanitize', 'URL']).config(
    ['$routeProvider', 'paths', function($routeProvider, paths) {

        // url configuration
        $routeProvider.when(paths.url.home, {
            templateUrl: 'views/Login.html'
        }).when(paths.url.movieDetail, {
            controller: 'MovieDetailController',
            templateUrl: 'views/mediaItem.html'
        }).when(paths.url.movies, {
            templateUrl: 'views/MoviesList.html'
        }).when(paths.url.movieNew, {
            controller: 'MovieFormController',
            templateUrl: 'views/MovieForm.html'
        }).when(paths.url.movieDetail, {
            controller: 'MovieDetailController',
            templateUrl: 'views/MediaItemDetail.html'
        }).when(paths.url.newUser, {
            controller: 'UserFormController',
            templateUrl: 'views/UserForm.html'
        }).otherwise({
            templateUrl: 'views/404.html'
        });

    }]
);
