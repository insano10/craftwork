define(["jquery", "bootstrap"], function ($)
{
    function View(persistenceHelper, rowNumberSynchroniser)
    {
        this.updateModalTitleInput = function updateModalTitleInput(title)
        {
            $("#rename-title-input").val(title);
        };

        //todo: should this take in the title or be responsible for finding it on its own?
        this.updateInstructionsTitle = function updateInstructionsTitle()
        {
            var newTitle = $("#rename-title-input").val();

            if (newTitle)
            {
                persistenceHelper.setInstructionsTitle(newTitle);
                setInstructionsTitle(newTitle);

                console.log("title is now: " + newTitle);
            }
            else
            {
                console.error("Title cannot be empty");
            }
        };

        var setInstructionsTitle = function setInstructionsTitle(title)
        {
            var instructionsTitle = $("#instructions-title");
            instructionsTitle.empty();
            instructionsTitle.append(title);
        };

        this.loadPattern = function loadPattern(pattern)
        {
            var instructionBox = $("#instructions");
            instructionBox.val("");

            $.each(pattern.instructions, function(idx, instruction)
            {
                instructionBox.val(instructionBox.val() + instruction + "\n");

            });
            setInstructionsTitle(pattern.title);
            rowNumberSynchroniser.notifyInstructionsUpdated();
        };

        this.notifyPattern = function notifyPattern(pattern)
        {
            if(pattern == null)
            {
                $("#empty-workspace").show();
                $("#workspace").hide();
                $("#unauthorised-workspace").hide();
            }
            else
            {
                $("#workspace").show();
                $("#empty-workspace").hide();
                $("#unauthorised-workspace").hide();
            }
        };

        this.userAuthorised = function userAuthorised()
        {
            $('#login-button-div').hide();

            $('#logout-button-div').show();
            $('#save-button-div').show();
            $('#create-button-div').show();
            $(".post-login").show();
        };

        this.userUnauthorised = function userUnauthorised()
        {
            $("#unauthorised-workspace").show();
            $('#login-button-div').show();

            $("#empty-workspace").hide();
            $("#workspace").hide();
            $('#logout-button-div').hide();
            $('#save-button-div').hide();
            $('#create-button-div').hide();
            $('.post-login').hide();

            $('#user-profile').empty();
        };

        this.renderUserProfile = function renderUserProfile(profile)
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
        };
    }

    return View;
});