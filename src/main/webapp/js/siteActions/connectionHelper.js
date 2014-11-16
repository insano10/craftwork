define(["jquery"], function($)
{
    function ConnectionHelper(persistenceHelper)
    {
        var LATEST_PATTERN_ID = null;

        var onSignInCallback = function onSignInCallback(authResult)
        {
            //remove this field to stop the js trying to interact with the cross domain login popup
            delete authResult['g-oauth-window'];

            if (authResult['status']['signed_in'])
            {
                //success
                connectServer(authResult);

                //render the profile data from Google+.
                gapi.client.load('plus', 'v1', renderProfile);
            }
            else
            {
                //error
                console.log('There was an error: ' + authResult['error']);
                $('.post-login').hide();
                $('#login-button').show();
            }
        };

        var connectServer = function connectServer(authResult)
        {
            $.ajax({
                type:        'POST',
                url:         window.location.href.split("#")[0] + 'connect',
                contentType: 'application/octet-stream; charset=utf-8',
                processData: false,
                data:        authResult.code,
                success:     function (result)
                {
                    $('#login-button-div').hide();

                    $('#logout-button-div').show();
                    $('#save-button-div').show();
                    $('#create-button-div').show();
                    $(".post-login").show();

                    persistenceHelper.loadPattern(LATEST_PATTERN_ID);
                }
            });
        };

        var renderProfile = function renderProfile()
        {
            var request = gapi.client.plus.people.get({'userId': 'me'});
            request.execute(function (profile)
            {
                var userProfile = $('#user-profile');

                userProfile.empty();
                if (profile.error)
                {
                    userProfile.append(profile.error);
                    return;
                }

                userProfile.append('' +
                    '<a href="#" title="Access your profile">' +
                    '<span>' +
                    '<img height="30" width="30" src="' + profile.image.url + '" alt="' + profile.displayName + '" title="' + profile.displayName + '">' +
                    '</span>' +
                    '<span id="profile-name">' + profile.displayName + '' +
                    '</span>' +
                    '</a>');

            });
        };

        this.authorise = function authorise(prompt)
        {
            gapi.auth.signIn({"callback" : onSignInCallback});
        };

        this.disconnectServer = function disconnectServer()
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
    }

    return ConnectionHelper;
});