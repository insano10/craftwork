define(["jquery"], function($)
{
    function InstructionParser(chartModel, chartRenderer, parseChain)
    {
        var parse = function parse(line, rowNumber)
        {
            var context = { chainIndex: 0, rowNum: rowNumber };
            parseChain.parse(line, context);
        };

        this.parseInstructions = function parseInstructions(instructionArray)
        {
            chartModel.clear();

            $.each(instructionArray, function(idx, line)
            {
                if(line)
                {
                    parse(line, idx+1);
                }
            });

            chartRenderer.renderModel(chartModel);
        };
    }

    return InstructionParser;
});

