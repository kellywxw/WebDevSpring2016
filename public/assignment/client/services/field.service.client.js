(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);


    function FieldService($http, $q) {
        var api = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm : getFieldsForForm,
            getFieldForForm : getFieldForForm,
            updateField : updateField,
            deleteFieldFromForm : deleteFieldFromForm,
            sortField: sortField
        };
        return api;

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();

            $http
                .post("/api/assignment/form/" + formId + "/field", field)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            var deferred = $q.defer();

            $http
                .get("/api/assignment/form/" + formId + "/field")
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();

            $http
                .get("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateField(formId, fieldId, field) {
            var deferred = $q.defer();

            $http
                .put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
                .success(function(response) {
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var deferred = $q.defer();

            $http
                .delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }

        function sortField (formId, startIndex, endIndex) {
            var deferred = $q.defer();

            $http
                .put("/api/assignment/form/"+formId+"/field?startIndex="+startIndex+"&endIndex="+endIndex)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }
    }
})();