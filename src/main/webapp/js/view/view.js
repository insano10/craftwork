define(["jquery", "bootstrap"], function ($)
{
    function View(rowNumberSynchroniser)
    {
        var setInstructionsTitle = function setInstructionsTitle(title)
        {
            var instructionsTitle = $("#instructions-title");
            instructionsTitle.empty();
            instructionsTitle.append(title);
        };

        this.initialise = function initialise()
        {
            $("#row-numbers").append("<p>row 1:</p>");

            //enable dropdown widgets
            $(".dropdown-toggle").dropdown();

            $(".toggle-nav").bind({
                click: function (event)
                {
                    $("#site-wrapper").toggleClass("show-nav");
                }
            });

            $("#new-pattern-option-div").hover(function() {
                    $("#new-pattern-image").attr("src", "../../images/new-circle-highlight.png");
                }, function() {
                    $("#new-pattern-image").attr("src", "../../images/new-circle.png");
            });

            var instructionsTitle = $("#instructions-title");
            instructionsTitle.empty();
            instructionsTitle.append("Untitled pattern");

            this.userUnauthorised();
        };

        this.updateModalTitleInput = function updateModalTitleInput(title)
        {
            $("#rename-title-input").val(title);
        };

        this.updateInstructionsTitle = function updateInstructionsTitle(newTitle)
        {
            setInstructionsTitle(newTitle);
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
            $('#user-profile').show();
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
            $('#user-profile').hide();
        };

        this.renderUserProfile = function renderUserProfile(profile)
        {
            var userProfile = $('#user-profile');

            if (profile.error)
            {
                userProfile.append(profile.error);
                return;
            }

            var profileImage = $("#profile-image");
            profileImage.attr("src", profile.image.url);
            profileImage.attr("alt", profile.displayName);
            profileImage.attr("title", profile.displayName);

            $("#profile-name").text(profile.displayName);
        };
    }

    return View;
});