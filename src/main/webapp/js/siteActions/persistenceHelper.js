define(["jquery"], function($)
{
    function PersistenceHelper()
    {
        var title = "Untitled pattern";

        this.updateTitle = function updateTitle()
        {
            title = $("#rename-title-input").val();
            console.log("title is now: " + title);
        };

        this.saveInstructions = function saveInstructions()
        {
            var instructions = $("#instructions").val().split("\n");

            $.ajax({
                type:     'POST',
                url:      window.location.href.split("#")[0] + 'save',
                dataType: "json",
                data:     { instructions: JSON.stringify(instructions) },
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
