define(["jquery"], function ($)
{
    function PersistenceHelper()
    {
        var title = "Untitled pattern";

        var setTitle = function setTitle(title)
        {
            var instructionsTitle = $("#instructions-title");
            instructionsTitle.empty();
            instructionsTitle.append(title);
        };

        this.initialiseTitle = function initialiseTitle()
        {
            setTitle(title);
        };

        this.updateModalTitle = function updateModalTitle()
        {
            $("#rename-title-input").val(title);
        };

        this.updateTitle = function updateTitle()
        {
            var newTitle = $("#rename-title-input").val();

            if (newTitle)
            {
                title = newTitle;
                setTitle(newTitle);
                console.log("title is now: " + title);
            }
            else
            {
                console.error("Title cannot be empty");
            }
        };

        this.saveInstructions = function saveInstructions()
        {
            var instructions = $("#instructions").val().split("\n");

            $.ajax({
                type:     'POST',
                url:      window.location.href.split("#")[0] + 'save',
                dataType: "json",
                data:     {
                    title:        JSON.stringify(title),
                    instructions: JSON.stringify(instructions)
                },
                success:  function (result)
                {
                    console.log('save response: ' + result);
                },
                error:    function (e)
                {
                    console.log(e);
                }
            });
        };
    }

    return PersistenceHelper;
});
