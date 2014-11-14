//grab the google plus login button/scripts
(function ()
{
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://plus.google.com/js/client:plusone.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

//callback for the google plus auth gateway
function onSignInCallback(authResult)
{
    LoginHelper.onSignInCallback(authResult);
}

var LoginHelper = (function ()
{
    return {

        onSignInCallback: function (authResult)
        {
            //remove this field to stop the js trying to interact with the cross domain login popup
            delete authResult['g-oauth-window'];

            if (authResult['access_token'])
            {
                //success
                this.connectServer(authResult);

                //render the profile data from Google+.
                gapi.client.load('plus', 'v1', this.renderProfile);
            }
            else if (authResult['error'])
            {
                //error
                console.log('There was an error: ' + authResult['error']);
                $('.post-login').hide();
                $('#login-button-div').show();
            }
        },

        connectServer: function (authResult)
        {
            $.ajax({
                type:        'POST',
                url:         window.location.href.split("#")[0] + 'connect',
                contentType: 'application/octet-stream; charset=utf-8',
                processData: false,
                data:        authResult.code,
                success:     function (result)
                {
                    $('#logout-button-div').show();
                    $('#save-button-div').show();
                    $(".post-login").show();
                    $('#login-button-div').hide();

                    //load latest pattern for user
                    $.ajax({
                        type:     'POST',
                        url:      window.location.href.split("#")[0] + 'load',
                        dataType: "json",
                        data:     {},
                        success:  function (result)
                        {
                            console.log("Latest pattern: " + JSON.parse(result));
                        }
                    });

                }
            });
        },

        renderProfile: function ()
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
        }
    };

})();