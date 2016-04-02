(function () {
    "use strict";
    angular
        .module("ChopChopApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var model = this;
        model.register = register;

        function register() {
            if(model.newUser.username != null &&
               model.newUser.password == model.password2) {
                UserService
                    .createUser(model.newUser)
                    .then(userCreate);
            }

            function userCreate (users) {
                UserService
                    .findUserByCredentials(model.newUser.username, model.newUser.password)
                    .then(getCreatedUser);
            }

            function getCreatedUser(user) {
                console.log(user);
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();
