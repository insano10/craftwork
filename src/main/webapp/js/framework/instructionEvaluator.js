define(["jquery"], function($)
{
    function InstructionEvaluator()
    {
        var EVALUATION_DELAY_MS = 1000;
        var evaluationTimer;

        var evaluateInstructions = function evaluateInstructions()
        {
            var instructionLines = $("#instructions").val().split("\n");

            $.each(instructionLines, function(idx, line)
            {
                evaluateLine(line);
            });
        };

        var evaluateLine = function evaluateLine(line)
        {
            console.log("evaluating line: " + line);
        };

        /*
         PRIVILEGED
         */

        this.notifyNewInstructionCharacter = function notifyNewInstructionCharacter(keyChar)
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

