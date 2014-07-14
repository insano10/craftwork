define(["jquery", "singleCrochet"], function($, SingleCrochet)
{
    function InstructionEvaluator(chartModel)
    {
        var EVALUATION_DELAY_MS = 1000;
        var evaluationTimer;

        var evaluateInstructions = function evaluateInstructions()
        {
            chartModel.clear();

            var instructionLines = $("#instructions").val().split("\n");

            $.each(instructionLines, function(idx, line)
            {
                evaluateLine(line);
            });
        };

        var evaluateLine = function evaluateLine(line)
        {
            console.log("evaluating line: " + line);
            parseSingleCrochet(line);

            chartModel.redrawChart();
        };

        var parseSingleCrochet = function parseSingleCrochet(line)
        {
            //Row 1: 6 sc
            var myRegexp = /[R|r]ow[\s]+([\d]+):[\s]+([\d]+)[\s]+sc/g;
            var match = myRegexp.exec(line);

            if(match != null)
            {
                var rowNum = match[1];
                var stitchCount = match[2];

                for(var count=0 ; count<stitchCount ; count++)
                {
                    chartModel.appendStitchToRow(new SingleCrochet(), rowNum);
                }
            }
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

