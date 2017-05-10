'use strict';

angular.module('OPDApp').controller('VisitsController', ['$location','$scope', '$routeParams', 'PatientService',
    function ($location,$scope, $routeParams, PatientService) {

        function getPatient() {

            PatientService.getById($routeParams.id).then(patient => {
                $scope.patient = patient;
            });
        }

        getPatient();
        $scope.date = new Date();
        $scope.types = ["OPD", "Clinic"];
        $scope.addVisit = (id, visit) => {
            var d = new Date();
            var n = d.getTime();
            visit.vid=n;

            PatientService.addVisit(id, visit).then((patient) => {
                console.log(visit);

                $scope.patient = patient;
                visit.complaint = '';
                visit.visitType='';
                visit.remarks='';

                $location.url("/overview/"+n).replace();
            });

        };
        getPatient();
$scope.AddAlergy=(id,al)=>{

    PatientService.addAlergy(id,al).then((patient)=>{
        console.log(al);
        $scope.patient=patient;
        al.alergy='';
        al.remarks='';
        getPatient();
    });

}

        $scope.UpadateAlergy=(aid)=>{

            PatientService.getAlergy(aid).then((alergy)=>{

                $scope.al=alergy;


            });

        }
        $scope.EditAlergies=(aid,al)=>{

            PatientService.updateAlergy(aid,al).then((alergy)=>{
                console.log(al);
                al.alergy='';
                al.remarks='';


            });
            getPatient();
        }
        $scope.DeleteAlergy=(id)=>{

    PatientService.deleteAlergy(id).then(()=>{

        getPatient();
            });

        }

    }]);