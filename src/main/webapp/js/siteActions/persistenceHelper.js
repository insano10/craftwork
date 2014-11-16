define(["jquery"], function ($)
{
    return (function ()
    {
        function PersistenceHelper(instructionEvaluator)
        {
            this.view = null;
            this.instructionEvaluator = instructionEvaluator;

            this.activePatternId = -1;
            this.activePatternTitle = "Untitled pattern";
        }

        //todo: this is evil, get rid of it
        PersistenceHelper.prototype.setView = function setView(view)
        {
            this.view = view;
        };

        PersistenceHelper.prototype.getInstructionsTitle = function getInstructionsTitle()
        {
            return this.activePatternTitle;
        };

        PersistenceHelper.prototype.setInstructionsTitle = function setInstructionsTitle(newTitle)
        {
            this.activePatternTitle = newTitle;
        };

        PersistenceHelper.prototype.createNewPattern = function createNewPattern()
        {
            $.ajax({
                type:     'POST',
                url:      window.location.href.split("#")[0] + 'create',
                dataType: "json",
                data:     {},
                success:  function (result)
                {
                    console.log('create response: ' + JSON.stringify(result));
                },
                error:    function (e)
                {
                    console.log(e);
                }
            });
        };

        PersistenceHelper.prototype.loadPattern = function loadPattern(patternId)
        {
            var helper = this;
            $.ajax({
                type:     'POST',
                url:      window.location.href.split("#")[0] + 'load',
                dataType: "json",
                data:     {
                    patternId: JSON.stringify(patternId)
                },
                success:  function (pattern)
                {
                    if(pattern != null)
                    {
                        console.log('loaded pattern: ' + JSON.stringify(pattern));
                        helper.activePatternId = pattern.id;
                        helper.activePatternTitle = pattern.title;

                        //todo: this is wrong, view should be told about instructions from the model
                        helper.view.loadPattern(pattern);
                        helper.instructionEvaluator.notifyInstructionsUpdated();
                    }
                },
                error:    function (e)
                {
                    console.log("failed to load pattern " + patternId + " - " + e);
                }
            });
        };

        PersistenceHelper.prototype.savePattern = function savePattern(instructionArray)
        {
            $.ajax({
                type:     'POST',
                url:      window.location.href.split("#")[0] + 'save',
                dataType: "json",
                data:     {
                    pattern: JSON.stringify({
                        id:           this.activePatternId,
                        title:        this.activePatternTitle,
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

        return PersistenceHelper;
    })();
});
