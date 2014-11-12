define(["jquery"], function ($)
{
    function RowNumberSynchroniser()
    {
        //evaluation just needs to be deferred until the next event tick to ensure the instructions have finished being written to textArea.val
        var EVALUATION_DELAY_MS = 0;
        var evaluationTimer;

        var updateRowNumbers = function updateRowNumbers()
        {
            var instructionLines = $("#instructions").val().split("\n");

            if (instructionLines != null)
            {
                var rowNumbersDiv = $("#row-numbers");

                rowNumbersDiv.html("");
                for (var i = 1 ; i <= instructionLines.length ; i++)
                {
                    rowNumbersDiv.append("<p>row " + i + ":</p>");
                }
            }
        };

        this.notifyInstructionsUpdated = function notifyInstructionsUpdated()
        {
            if (evaluationTimer != null)
            {
                clearTimeout(evaluationTimer);
            }
            evaluationTimer = setTimeout(updateRowNumbers, EVALUATION_DELAY_MS);
        }
    }

    return RowNumberSynchroniser;
});

