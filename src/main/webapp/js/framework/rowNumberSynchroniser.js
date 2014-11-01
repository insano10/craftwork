define(["jquery"], function ($)
{
    function RowNumberSynchroniser()
    {
        var EVALUATION_DELAY_MS = 0; //evaluation just needs to be deferred until the next loop to handle copy/paste operations
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

