define(["jquery"], function($)
{
    function InstructionEvaluator(instructionParser)
    {
        var EVALUATION_DELAY_MS = 1000;
        var evaluationTimer;

        var evaluateInstructions = function evaluateInstructions()
        {
            var instructionLines = $("#instructions").val().split("\n");

            instructionParser.parseInstructions(instructionLines);
        };

        this.notifyInstructionsUpdated = function notifyInstructionsUpdated()
        {
            if(evaluationTimer != null)
            {
                clearTimeout(evaluationTimer);
            }
            evaluationTimer = setTimeout(evaluateInstructions, EVALUATION_DELAY_MS);
        }
    }

    return InstructionEvaluator;
});

