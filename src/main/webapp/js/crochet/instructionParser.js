define(["jquery", "singleCrochet"], function($, SingleCrochet)
{
    function InstructionParser(chartModel)
    {
        var currentRowIndex = 0;

        var parseChain = function parseChain(line)
        {
            currentRowIndex = 0;
            parseRowNumberAndContinue(line);
        };

        var parseRowNumberAndContinue = function parseRowNumberAndContinue(line)
        {
            //Row 1:
            var rowRegex = /[R|r]ow[\s]+([\d]+)[\s]*:(.*)/;
            var match = rowRegex.exec(line);

            if(match != null)
            {
                var rowNum = parseInt(match[1]);
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
            console.log("Parsing phrase :" + phrase);

            var subPhrases = phrase.split(/[T|t]hen|,/);

            if(subPhrases.length > 1)
            {
                $.each(subPhrases, function(idx, subPhrase)
                {
                    parsePhrase(rowNum, subPhrase);
                });
            }
            else
            {
                console.log("No more sub phrases found, parsing sc");
                parseSingleCrochet(rowNum, phrase);
            }
        };

        var parseSingleCrochet = function parseSingleCrochet(rowNum, phrase)
        {
            // 6 sc
            var myRegexp = /[\s]*([\d]+)[\s]*sc[\s]*$/;
            var match = myRegexp.exec(phrase);

            if(match != null)
            {
                var stitchCount = match[1];

                for(var rowIdx=0 ; rowIdx<stitchCount ; rowIdx++)
                {
                    chartModel.addSingleCrochet(new SingleCrochet(), rowNum, currentRowIndex);
                    currentRowIndex++;
                }
            }
            else
            {
                console.error("Not a valid sc phrase: " + phrase);
            }
        };

        this.parseInstructions = function parseInstructions(instructionArray)
        {
            chartModel.clear();

            $.each(instructionArray, function(idx, line)
            {
                parseChain(line);
            });

            chartModel.redrawChart();
        };
    }

    return InstructionParser;
});

