define(["jquery", "bootstrap"], function ($)
{
    function UiWidgetBehaviours(keyListener, persistenceHelper, connectionHelper, view)
    {

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
                    view.updateInstructionsTitle();
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
                    view.updateModalTitleInput(persistenceHelper.getInstructionsTitle());
                }
            });

            //todo: put this somewhere else
            $("#row-numbers").append("<p>row 1:</p>");
            instructionsTitle.empty();
            instructionsTitle.append("Untitled pattern");
        };
    }

    return UiWidgetBehaviours;
});