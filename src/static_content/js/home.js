
var app = angular.module('app', ['ngRoute']);
app.config(config);
function config($routeProvider, $locationProvider) {
    console.log("shdjshd")
    $routeProvider
        .when('/', {
            templateUrl: '/static/ngViews/home.html',
            controller: 'homeCtrl'
        })
        .when('/message/:id', {
            templateUrl: '/static/ngViews/message.html',
            controller: 'messageCtrl'
        });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

};

app.controller('homeCtrl', function ($scope, services) {
    $scope.messages = {};
    services.getAll()
    .then(function (res) {
        $scope.messages = res.data;
        console.log(res.data);
    }, function (err) {
        console.log(err);
    });
    $scope.delete = function (id) {
        console.log(id)
        services.delete(id)
        .then(function (res) {
            services.getAll()
            .then(function (res) {
                $scope.messages = res.data;
                console.log(res.data);
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
    }

});
app.controller('messageCtrl', function ($scope, services, $routeParams, $location) {
    $scope.message = {};
    console.log($routeParams.id)
    var promise = services.getOne($routeParams.id);

    promise.then(function (res) {
        $scope.message = res.data;
        console.log(res.data);
    }, function (err) {
        console.log(err);
    });
    $scope.close = function () {
        $location.path('/');
    }
})