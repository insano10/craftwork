define(["jquery", "bootstrap"], function ($)
{
    function View(keyListener, persistenceHelper, connectionHelper)
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

            $("#row-numbers").append("<p>row 1:</p>");

            $("#save-button").bind({
                click: function (event)
                {
                    persistenceHelper.saveInstructions();
                }
            });

            $("#save-title-button").bind({
                click: function (event)
                {
                    persistenceHelper.updateTitle();
                }
            });

            $("#logout-button").bind({
                click: function (event)
                {
                    connectionHelper.disconnectServer();
                }
            });

            var instructionsTitle = $("#instructions-title");

            instructionsTitle.tooltip({
                placement: 'bottom'
            });

            instructionsTitle.bind({
                click: function(event)
                {
                    persistenceHelper.updateModalTitle();
                }
            });

            instructionsTitle.empty();
            instructionsTitle.append("Untitled pattern");
        };
    }

    return View;
});