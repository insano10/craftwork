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
                parseChain(line);
            });

            chartModel.redrawChart();
        };

        var parseChain = function parseChain(line)
        {
            parseRowNumberAndContinue(line);
        };

        var parseRowNumberAndContinue = function parseRowNumberAndContinue(line)
        {
            //Row 1:
            var rowRegex = /[R|r]ow[\s]+([\d]+)[\s]*:(.*)/;
            var match = rowRegex.exec(line);

            if(match != null)
            {
                var rowNum = match[1];
                var restOfLine = match[2];

                parsePhrase(rowNum, restOfLine);
            }
            else
            {
                console.error("Could not find row number in: " + line);
            }
        };

        var parsePhrase = function parsePhrase(rowNum, phrase)
        {
            parseSingleCrochet(rowNum, phrase);
        };

        var parseSingleCrochet = function parseSingleCrochet(rowNum, line)
        {
            // 6 sc
            var myRegexp = /[\s]*([\d]+)[\s]+sc(.*)/;
            var match = myRegexp.exec(line);

            if(match != null)
            {
                var stitchCount = match[1];

                for(var rowIdx=0 ; rowIdx<stitchCount ; rowIdx++)
                {
                    chartModel.addStitch(new SingleCrochet(), rowNum, rowIdx);
                }
            }
        };

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

