angular.module("meanGames").factory("AuthInterceptor", AuthInterceptor);

function AuthInterceptor() {
    return {
        request: request,
        // response: response,
        // responseError: responseError
    }

    function request(config) {
        config.headers = config.headers || {};
        if($window.sessionStorage.token) {
            config.headers.Authorization = "Bearer "+ $window.sessionStorage.token;
        }

        return config;
    }

    // function response(response) {
    //     if(response.status === 400 && $window.sessionStorage.token && AuthFactory.auth) {

    //     }
    // }
}