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
                parseSimpleStitchOrContinue(rowNum, phrase);
            }
        };

        var parseSimpleStitchOrContinue = function parseSimpleStitchOrContinue(rowNum, phrase)
        {
            // 6 sc
            var simpleRegex = /^[\s]*([\d]+)[\s]*sc[\s]*$/;
            var match = simpleRegex.exec(phrase);

            if(match != null)
            {
                var stitchCount = match[1];

                for(var rowIdx=0 ; rowIdx<stitchCount ; rowIdx++)
                {
                    chartModel.addSingleCrochet(new SingleCrochet(), rowNum, [currentRowIndex]);
                    currentRowIndex++;
                }
            }
            else
            {
                parseIncreaseOrContinue(rowNum, phrase);
            }
        };

        var parseIncreaseOrContinue = function parseIncreaseOrContinue(rowNum, phrase)
        {
            // 2 sc in next sc
            var increaseRegex = /[\s]*([\d]+)[\s]*sc[\s]+in[\s]+[N|n]ext[\s]+sc[\s]*$/;
            var match = increaseRegex.exec(phrase);

            if(match != null)
            {
                var stitchCount = match[1];

                for(var rowIdx=0 ; rowIdx<stitchCount ; rowIdx++)
                {
                    chartModel.addSingleCrochet(new SingleCrochet(), rowNum, [currentRowIndex]);
                }
                currentRowIndex++;
            }
            else
            {
                parseDecreaseOrContinue(rowNum, phrase);
            }
        };

        var parseDecreaseOrContinue = function parseDecreaseOrContinue(rowNum, phrase)
        {
            // 1 sc in next 3 sc
            var increaseRegex = /[\s]*1[\s]*sc[\s]+in[\s]+[N|n]ext[\s]+([\d]+)[\s]*sc[\s]*$/;
            var match = increaseRegex.exec(phrase);

            if(match != null)
            {
                var stitchCount = match[1];

                var connectToIndices = [];
                for(var rowIdx=0 ; rowIdx<stitchCount ; rowIdx++)
                {
                    connectToIndices.push(currentRowIndex);
                    currentRowIndex++;
                }
                chartModel.addSingleCrochet(new SingleCrochet(), rowNum, connectToIndices);
            }
            else
            {
                console.error("Not a valid phrase: " + phrase);
            }
        };

        this.parseInstructions = function parseInstructions(instructionArray)
        {
            chartModel.clear();

            $.each(instructionArray, function(idx, line)
            {
                if(line)
                {
                    parseChain(line);
                }
            });

            chartModel.redrawChart();
        };
    }

    return InstructionParser;
});

