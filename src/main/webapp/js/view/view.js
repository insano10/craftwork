define(["jquery", "bootstrap"], function ($)
{
    function View(keyListener, persistenceHelper, connectionHelper, rowNumberSynchroniser)
    {
        var updateModalTitleInput = function updateModalTitleInput(title)
        {
            $("#rename-title-input").val(title);
        };


        var updateInstructionsTitle = function updateInstructionsTitle()
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

        this.initialise = function initialise()
        {
            $("#instructions").bind({
                keypress: function (event)
                {
                    keyListener.onKeyPressed(event);
                },
                paste:    function (event)
                {
                    keyListener.onKeyPressed(event);
                },
                cut:      function (event)
                {
                    keyListener.onKeyPressed(event);
                },
                keydown:  function (event)
                {
                    keyListener.onKeyDown(event);

                },
                scroll:   function ()
                {
                    $('#row-numbers').scrollTop($(this).scrollTop());
                }
            });

            $("#row-numbers").append("<p>row 1:</p>");

            $("#save-button").bind({
                click: function (event)
                {
                    var instructions = $("#instructions").val().split("\n");
                    persistenceHelper.savePattern(instructions);
                }
            });

            $("#save-title-button").bind({
                click: function (event)
                {
                    updateInstructionsTitle();
                }
            });

            $("#logout-button").bind({
                click: function (event)
                {
                    connectionHelper.disconnectServer();
                }
            });

            $("#create-button").bind({
                click: function (event)
                {
                    var pattern = persistenceHelper.createNewPattern();
                }
            });

            $("#login-button").bind({
                click: function (event)
                {
                    connectionHelper.authorise();
                }
            });

            var instructionsTitle = $("#instructions-title");

            instructionsTitle.tooltip({
                placement: 'bottom'
            });

            instructionsTitle.bind({

                click: function (event)
                {
                    updateModalTitleInput(persistenceHelper.getInstructionsTitle());
                }
            });

            instructionsTitle.empty();
            instructionsTitle.append("Untitled pattern");
        };

        this.loadPattern = function loadPattern(pattern)
        {
            $.each(pattern.instructions, function(idx, instruction)
            {
                var instructionBox = $("#instructions");
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

        this.unauthorisedUser = function unauthorisedUser()
        {
            $("#unauthorised-workspace").show();
            $("#empty-workspace").hide();
            $("#workspace").hide();
            $('#logout-button-div').hide();
            $('#save-button-div').hide();
            $('#create-button-div').hide();
        };
    }

    return View;
});