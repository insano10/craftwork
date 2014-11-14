define(["jquery"], function($)
{
    function ConnectionHelper()
    {
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