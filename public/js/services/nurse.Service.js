angular.module('OPDApp').factory('nurseService', ['$http',
    function ($http) {



        return {
            addPatient: patient => $http.post('/patients', patient).then(response => response.data)
        };
    }]);