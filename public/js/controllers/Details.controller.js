'use strict';

angular.module('OPDApp').controller('DetailsController', ['$location','$scope', '$routeParams', 'PatientService',
    function ($location,$scope, $routeParams, PatientService) {
        $scope.date = new Date();

        $scope.bmi=89;
        function getvisit() {

            PatientService.getVisitById($routeParams.id).then(visit => {
                $scope.visit = visit;
            });
        }

        getvisit();
        $scope.addExamination=(id,exam)=>{


            console.log(id);
                exam.BMI=exam.height*exam.weight;
            PatientService.addExamination(id,exam).then((visit)=>{
                console.log(exam);
                $scope.visit=visit;

                getvisit();
            });

        }

    }]);