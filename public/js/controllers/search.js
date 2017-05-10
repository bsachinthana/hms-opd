'use strict';

angular.module('OPDApp').controller('SearchController', ['$scope', '$routeParams', 'PatientService',
    function ($scope, $routeParams, PatientService) {



        $scope.Search=(hin)=>{

            PatientService.getByhin(hin).then(patient=>{

                $scope.patient=patient;
                console.log(patient);

            })


        }

        $scope.SearchNIC=(nic)=>{

            PatientService.getBynic(nic).then(patient=>{

                $scope.patient=patient;
                console.log(patient);

            })


        }

    }]);