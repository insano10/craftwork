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
                    var newTitle = $("#rename-title-input").val();

                    if(newTitle)
                    {
                        persistenceHelper.setInstructionsTitle(newTitle);
                        view.updateInstructionsTitle(newTitle);
                    }
                    else
                    {
                        console.error("Title cannot be empty");
                    }
                }
            });

            $("#logout-option").bind({
                click: function (event)
                {
                    connectionHelper.disconnectServer();
                }
            });

            $("#new-pattern-button").bind({
                click: function (event)
                {
                    var pattern = persistenceHelper.createNewPattern();
                }
            });

            $('#delete-pattern-modal').on('show.bs.modal', function(e)
            {
                //pass the pattern details into the modal when the trash can is clicked
                var patternId = $(e.relatedTarget).data('pattern-id');
                var patternTitle = $(e.relatedTarget).data('pattern-title');

                $(e.currentTarget).find('button[id="delete-pattern-button"]').data("pattern-id", patternId);
                $("#deletePatternModalLabel").html("Delete pattern '" + patternTitle + "'?");
            });

            $("#delete-pattern-button").bind({
                click: function (event)
                {
                    var patternId = $(this).data("pattern-id");
                    persistenceHelper.deletePattern(patternId);
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

        };
    }

    return UiWidgetBehaviours;
});