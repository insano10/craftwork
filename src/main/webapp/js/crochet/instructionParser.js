define(["jquery"], function($)
{
    function InstructionParser(chartModel, chartRenderer, parseChain)
    {
        var parse = function parse(line)
        {
            var context = { rowNum: 0, currentRowIndex: 0 };
            parseChain.parse(line, context);
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

            chartRenderer.renderModel(chartModel);
        };
    }

    return InstructionParser;
});

