'use strict';

angular.module('OPDApp').factory('PatientService', ['$http',
    function ($http) {



        return {
            get: () => $http.get('/patients').then(response => response.data),

            getById: id => $http.get('/patients/' + id).then(response => response.data),
            addVisit: (id, visit) => $http.post('/patients/' + id + '/visits', visit).then(response => response.data),
            getByhin:hin => $http.get('/patients?hin=' + hin).then(response => response.data),
            getBynic:nic => $http.get('/patients?nic=' + nic).then(response => response.data),
            getAlergy:id=>$http.get('/patients/Alergies/'+id).then(response=>response.data),
            addAlergy:(id,alergy)=>$http.post('/patients/'+id+'/alergies',alergy).then(response=>response.data),
            updateAlergy:(id,alergy)=>$http.put('/patients/alergies/'+id,alergy).then(response=>response.data),
            deleteAlergy:(id)=>$http.delete('/patients/Alergies/'+id).then(response=>response.data),
            getVisitById:visitid => $http.get('/patients?visitid=' + visitid).then(response => response.data),
            addExamination:(id,examination)=>$http.put('/patients/examinations/'+id,examination).then(response=>response.data),
        };
    }]);