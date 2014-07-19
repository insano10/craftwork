define(["jquery", "chain", "singleCrochet"], function($, Chain, SingleCrochet)
{
    function InstructionParser(chartModel, parseChain)
    {
        var parse = function parse(line)
        {
            var context = { rowNum: 0, currentRowIndex: 0 };
            parseRowNumberAndContinue(line, context);
        };

        var parseRowNumberAndContinue = function parseRowNumberAndContinue(line, context)
        {
            //Row 1:
            var rowRegex = /[R|r]ow[\s]+([\d]+)[\s]*:(.*)/;
            var match = rowRegex.exec(line);

            if(match != null)
            {
                var rowNum = parseInt(match[1]);
                var restOfLine = match[2];

                context.rowNum = rowNum;
                parseChain.parse(restOfLine, context);
            }
            else
            {
                console.error("Could not find row number in: " + line);
            }
        };

        this.parseInstructions = function parseInstructions(instructionArray)
        {
            chartModel.clear();

            $.each(instructionArray, function(idx, line)
            {
                if(line)
                {
                    parse(line);
                }
            });

            chartModel.redrawChart();
        };
    }

    return InstructionParser;
});

