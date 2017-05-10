'use strict';

angular.module('OPDApp').controller('MainController', ['$scope', 'PatientService',
    function ($scope, PatientService) {

        function getPatients() {

            PatientService.get().then(patients => {
                $scope.patients = patients;
            })
        }

        getPatients();


    }]);
