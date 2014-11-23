define(["jquery"], function ($)
{
    return (function ()
    {
        var LATEST_PATTERN_ID = null;

        function ConnectionHelper(persistenceHelper)
        {
            this.persistenceHelper = persistenceHelper;
            this.view = null;
        }

        /*
         Take a function F and X args
         Return a function that will take the args passed in, concatenate X args on the end and call function F with all of them
         This gives a way to prepopulate a function with arguments a callback could not necessarily provide
         */
        function partial(func /*, 0..n args */) {
            var args = Array.prototype.slice.call(arguments, 1);
            return function() {
                var newArgs = Array.prototype.slice.call(arguments);
                var allArguments = newArgs.concat(args);
                return func.apply(this, allArguments);
            };
        }

        var onAuthTokenRetrieved = function onAuthTokenRetrieved(authResult, connectionHelper)
        {
            //remove this field to stop the js trying to interact with the cross domain login popup
            delete authResult['g-oauth-window'];

            if (authResult['status']['signed_in'])
            {
                //success
                loginWithAuthToken(authResult, connectionHelper);

                //render the profile data from Google+.
                var getProfileCallback = partial(renderProfile, connectionHelper);
                gapi.client.load('plus', 'v1', getProfileCallback);
            }
            else
            {
                //error
                console.log('Error signing in: ' + authResult['error']);
                connectionHelper.view.userUnauthorised();
            }
        };

        var loginWithAuthToken = function loginWithAuthToken(authResult, helper)
        {
            $.ajax({
                type:        'POST',
                url:         window.location.href.split("#")[0] + 'connect',
                contentType: 'application/octet-stream; charset=utf-8',
                processData: false,
                data:        authResult.code,
                success:     function (result)
                {
                    helper.view.userAuthorised();
                    helper.persistenceHelper.loadPattern(LATEST_PATTERN_ID);
                }
            });
        };

        var renderProfile = function renderProfile(helper)
        {
            var request = gapi.client.plus.people.get({'userId': 'me'});

            request.execute(function (profile)
            {
                helper.view.renderUserProfile(profile);
            });
        };

        ConnectionHelper.prototype.setView = function setView(view)
        {
            this.view = view;
        };

        ConnectionHelper.prototype.authorise = function authorise()
        {
            var onAuthTokenRetrievedCallback = partial(onAuthTokenRetrieved, this);

            gapi.auth.signIn({"callback": onAuthTokenRetrievedCallback});
        };

        ConnectionHelper.prototype.disconnectServer = function disconnectServer()
        {
            // Revoke the server tokens
            $.ajax({
                type:    'POST',
                url:     window.location.href.split("#")[0] + 'disconnect',
                async:   false,
                success: function (result)
                {
                    console.log('revoke response: ' + result);
                    $('.post-login').hide();
                    $('#save-button-div').hide();
                    $('#create-button-div').hide();
                    $('#logout-button-div').hide();
                    $('#user-profile').empty();
                    $('#login-button-div').show();
                },
                error:   function (e)
                {
                    console.log(e);
                }
            });
        };

        return ConnectionHelper;
    })();
}) ;