'use strict';

angular.module('OPDApp').config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            templateUrl: './views/main.html',
            controller: 'MainController'
        }).when('/visits/:id', {
            templateUrl: './views/visit.html',
            controller: 'VisitsController'
        }).when('/overview/:id', {
            templateUrl: './views/opd.patients.html',
            controller: 'DetailsController'
        }).when('/alergies/:id', {
            templateUrl: './views/alergy.patient.html',
            controller: 'VisitsController'
        }).when('/home/doctor',{
            templateUrl: './views/search.patient.html',
            controller: 'SearchController'


        }).when('/home/nurse/addtoQueue',{
            templateUrl: './views/patient.queue.html',
            controller: 'SearchController'


        }).when('/home/nurse',{

            templateUrl: './views/patient.registration.html',
            controller: 'PatientController'

        })

            .otherwise({
            redirectTo: '/home'
        });

        $locationProvider.html5Mode(true);
    }]);