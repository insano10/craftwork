define(["jquery"], function ($) {
    return (function () {
        var LATEST_PATTERN_ID = null;

        function ConnectionHelper(persistenceHelper, view) {
            this.persistenceHelper = persistenceHelper;
            this.view = view;
        }

        /*
         Take a function F and X args
         Return a function that will take the args passed in, concatenate X args on the end and call function F with all of them
         This gives a way to prepopulate a function with arguments a callback could not necessarily provide
         */
        function partial(func /*, 0..n args */) {
            var args = Array.prototype.slice.call(arguments, 1);
            return function () {
                var newArgs = Array.prototype.slice.call(arguments);
                var allArguments = newArgs.concat(args);
                return func.apply(this, allArguments);
            };
        }

        var loginWithAuthToken = function loginWithAuthToken(authTokenId, userProfile, helper) {
            $.ajax({
                type: 'POST',
                url: window.location.href.split("#")[0] + 'connect',
                contentType: 'application/octet-stream; charset=utf-8',
                processData: false,
                data: authTokenId,
                success: function (result) {
                    helper.view.userAuthorised();
                    helper.view.renderUserProfile(userProfile);

                    helper.persistenceHelper.loadPatterns();
                    helper.persistenceHelper.loadPattern(LATEST_PATTERN_ID);
                }
            });
        };

        ConnectionHelper.prototype.onSignInSuccess = function onSignInSuccess(googleUser) {
            var idToken = googleUser.getAuthResponse().id_token;
            loginWithAuthToken(idToken, googleUser.getBasicProfile(), this);
        };

        ConnectionHelper.prototype.onSignInFailure = function onSignInFailure(error) {
            console.log("Error signing in: " + error);
            this.view.userUnauthorised();
        };

        ConnectionHelper.prototype.disconnectServer = function disconnectServer() {

            var helper = this;

            // Revoke the server token
            var auth2 = gapi.auth2.getAuthInstance();

            auth2.signOut().then(function () {


                $.ajax({
                    type: 'POST',
                    url: window.location.href.split("#")[0] + 'disconnect',
                    async: false,
                    success: function (result) {

                        console.log('User signed out');
                        helper.view.userUnauthorised();
                    },
                    error: function (e) {
                        console.log("Failed to logout: " + e);
                    }
                });
            });

        };

        return ConnectionHelper;
    })();
});