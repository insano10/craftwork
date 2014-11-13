define(["jquery"], function ($)
{
    function PersistenceHelper()
    {
        var title = "Untitled pattern";

        this.getInstructionsTitle = function getInstructionsTitle()
        {
            return title;
        };

        this.setInstructionsTitle = function setInstructionsTitle(newTitle)
        {
            title = newTitle;
        };


        this.saveInstructions = function saveInstructions(instructionArray)
        {
            $.ajax({
                type:     'POST',
                url:      window.location.href.split("#")[0] + 'save',
                dataType: "json",
                data:     {
                    pattern: JSON.stringify({
                        title:        title,
                        instructions: instructionArray
                    })
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
