//grab the google plus login button/scripts
(function() {
    var po = document.createElement('script');
    po.type = 'text/javascript'; po.async = true;
    po.src = 'https://plus.google.com/js/client:plusone.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

function onSignInCallback(authResult) {
    LoginHelper.onSignInCallback(authResult);
}

var LoginHelper = (function ()
{
    return {

        onSignInCallback: function (authResult)
        {

            console.log("onSignInCallback");

            delete authResult['g-oauth-window']; // <- need this to avoid SecurityError but is it correct?
            $('#authResult').html('Auth Result:<br/>');
            for (var field in authResult)
            {
                $('#authResult').append(' ' + field + ': ' + authResult[field] + '<br/>');
            }
            if (authResult['access_token'])
            {
                // The user is signed in
                this.authResult = authResult;
                this.connectServer();
                // After we load the Google+ API, render the profile data from Google+.
                gapi.client.load('plus', 'v1', this.renderProfile);
            } else if (authResult['error'])
            {
                // There was an error, which means the user is not signed in.
                // As an example, you can troubleshoot by writing to the console:
                console.log('There was an error: ' + authResult['error']);
                $('#authResult').append('Logged out');
                $('.post-login').hide();
                $('#login-button').show();
            }
            console.log('authResult', authResult);
        },

        connectServer: function ()
        {
            console.log("connectToServer");
            console.log(this.authResult.code);
            $.ajax({
                type:        'POST',
                url:         window.location.href + 'connect?state={{ STATE }}',
                contentType: 'application/octet-stream; charset=utf-8',
                success:     function (result)
                {
                    console.log(result);
                    $('#login-button').hide();
                    $('#logout-button').empty();
                    $('#logout-button').append("<button id='logout-button' onclick='LoginHelper.disconnectServer()'>Logout</button>");
                    $(".post-login").show();
                },
                processData: false,
                data:        this.authResult.code
            });
        },

        renderProfile: function ()
        {
            console.log("renderProfile");
            var request = gapi.client.plus.people.get({'userId': 'me'});
            request.execute(function (profile)
            {

                var userProfile = $('#user-profile');

                userProfile.empty();
                if (profile.error)
                {
                    $('#user-profile').append(profile.error);
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
        },

        disconnectServer: function ()
        {
            // Revoke the server tokens
            $.ajax({
                type:    'POST',
                url:     window.location.href + 'disconnect',
                async:   false,
                success: function (result)
                {
                    console.log('revoke response: ' + result);
                    $('.post-login').hide();
                    $('#user-profile').empty();
                    $('#logout-button').empty();
                    $('#visiblePeople').empty();
                    $('#authResult').empty();
                    $('#login-button').show();
                },
                error:   function (e)
                {
                    console.log(e);
                }
            });
        }
    };

})();