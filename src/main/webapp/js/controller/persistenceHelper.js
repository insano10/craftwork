define(["jquery"], function ($)
{
    return (function ()
    {
        function PersistenceHelper(instructionEvaluator, view)
        {
            this.instructionEvaluator = instructionEvaluator;
            this.view = view;

            this.activePatternId = -1;
            this.activePatternTitle = "Untitled pattern";
        }

        var setPattern = function setPattern(persistence, pattern)
        {
            if(pattern != null)
            {
                console.log('loaded pattern: ' + JSON.stringify(pattern));
                persistence.activePatternId = pattern.id;
                persistence.activePatternTitle = pattern.title;

                persistence.view.loadPattern(pattern);
                persistence.instructionEvaluator.notifyInstructionsUpdated();
            }

            persistence.view.notifyPattern(pattern);
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
            var helper = this;
            $.ajax({
                type:     'POST',
                url:      window.location.href.split("#")[0] + 'create',
                dataType: "json",
                data:     {},
                success:  function (pattern)
                {
                    console.log('create response: ' + JSON.stringify(pattern));
                    setPattern(helper, pattern);
                },
                error:    function (e)
                {
                    console.log("failed to create pattern - " + e);
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
                    console.log('load response: ' + JSON.stringify(pattern));
                    setPattern(helper, pattern);
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