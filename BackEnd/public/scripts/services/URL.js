angular.module('URL', []).service('URL', ['$log', function($log) {

    this.resolve = function(url, params) {
        console.log("Estoy en el service de la URL la url:", url);
        console.log("Los params son", params);
        var finalURL = [];
        var urlParts = url.split('/');
        for (var i in urlParts) {
            var urlPart = urlParts[i];
            if (urlPart.substr(0, 1) === ':') {
                var paramName = urlPart.substr(1);
                var paramValue = params[paramName] || null;
                if (paramValue === null) {
                    $log.error('URL.resolve error:', paramName,
                        'not found in params dict. ',
                        'Check your params value my friendo.');
                    return;
                }
                finalURL.push(paramValue);
            } else {
                console.log("El paramValue1 es", paramValue);
                console.log("Salgo de url1");
                finalURL.push(urlPart);
            }
        }
        console.log("El paramValue2 es", paramValue);
        console.log("Salgo de url2");
        return finalURL.join('/');
    };

}]);
