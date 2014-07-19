define(["jquery", "singleCrochet", "chain"], function ($, SingleCrochet, Chain)
{
    function RowNumberParser(parseChain)
    {
        this.parse = function parse(phrase, context)
        {
            //Row 1:
            var rowRegex = /[R|r]ow[\s]+([\d]+)[\s]*:(.*)/;
            var match = rowRegex.exec(phrase);

            if (match != null)
            {
                var rowNum = parseInt(match[1]);
                var restOfLine = match[2];

                context.rowNum = rowNum;
                parseChain.parse(restOfLine, context);
            }
            else
            {
                console.error("Could not find row number in: " + phrase);
            }
        }
    }

    function SubPhraseParser(parseChain)
    {
        this.parse = function parse(phrase, context)
        {
            console.log("Parsing phrase :" + phrase);

            var subPhrases = phrase.split(/[T|t]hen|,/);

            if (subPhrases.length > 1)
            {
                $.each(subPhrases, function (idx, subPhrase)
                {
                    parse(subPhrase, context);
                });
            }
            else
            {
                console.log("No more sub phrases found, parsing: " + phrase);
                parseChain.parse(phrase, context);

            }
        }
    }

    function ChainStitchParser(chartModel)
    {
        this.parse = function parse(phrase, context)
        {
            // chain 10
            var chainRegex = /^[\s]*[C|c]hain[\s]+([\d]+)[\s]*$/;
            var match = chainRegex.exec(phrase);

            if (match != null)
            {
                var stitchCount = match[1];

                for (var rowIdx = 0; rowIdx < stitchCount; rowIdx++)
                {
                    chartModel.addChain(new Chain(), context.rowNum, context.currentRowIndex);
                    context.currentRowIndex++;
                }
                return true;
            }
            return false;
        }
    }

    function SingleCrochetParser(chartModel)
    {
        this.parse = function parse(phrase, context)
        {
            // 6 sc
            var simpleRegex = /^[\s]*([\d]+)[\s]*sc[\s]*$/;
            var match = simpleRegex.exec(phrase);

            if (match != null)
            {
                var stitchCount = match[1];

                for (var rowIdx = 0; rowIdx < stitchCount; rowIdx++)
                {
                    chartModel.addSingleCrochet(new SingleCrochet(), context.rowNum, [context.currentRowIndex]);
                    context.currentRowIndex++;
                }
                return true;
            }
            return false;
        }
    }

    function SingleCrochetIncreaseParser(chartModel)
    {
        this.parse = function parse(phrase, context)
        {
            // 2 sc in next sc
            var increaseRegex = /^[\s]*([\d]+)[\s]*sc[\s]+in[\s]+[N|n]ext[\s]+sc[\s]*$/;
            var match = increaseRegex.exec(phrase);

            if (match != null)
            {
                var stitchCount = match[1];

                for (var rowIdx = 0; rowIdx < stitchCount; rowIdx++)
                {
                    chartModel.addSingleCrochet(new SingleCrochet(), context.rowNum, [context.currentRowIndex]);
                }
                context.currentRowIndex++;
                return true;
            }
            return false;
        }
    }

    function SingleCrochetDecreaseParser(chartModel)
    {
        this.parse = function parse(phrase, context)
        {
            // 1 sc in next 3 sc
            var decreaseRegex = /^[\s]*1[\s]*sc[\s]+in[\s]+[N|n]ext[\s]+([\d]+)[\s]*sc[\s]*$/;
            var match = decreaseRegex.exec(phrase);

            if (match != null)
            {
                var stitchCount = match[1];

                var connectToIndices = [];
                for (var rowIdx = 0; rowIdx < stitchCount; rowIdx++)
                {
                    connectToIndices.push(context.currentRowIndex);
                    context.currentRowIndex++;
                }
                chartModel.addSingleCrochet(new SingleCrochet(), context.rowNum, connectToIndices);
                return true;
            }
            return false;
        }
    }

    function ParseLink(parser, nextLink)
    {
        this.parse = function parse(phrase, context)
        {
            var matched = parser.parse(phrase, context);

            if (!matched && nextLink != null)
            {
                nextLink.parse(phrase, context);
            }
            else if (!matched)
            {
                console.error("'" + phrase + "' is not a valid phrase");
            }
        }
    }

    function ParseChainFactory()
    {
        this.createParseChain = function createParseChain(chartModel)
        {
            var singleCrochetDecreaseParseLink = new ParseLink(new SingleCrochetDecreaseParser(chartModel), null);
            var singleCrochetIncreaseParseLink = new ParseLink(new SingleCrochetIncreaseParser(chartModel), singleCrochetDecreaseParseLink);
            var singleCrochetParseLink = new ParseLink(new SingleCrochetParser(chartModel), singleCrochetIncreaseParseLink);
            var chainParseLink = new ParseLink(new ChainStitchParser(chartModel), singleCrochetParseLink);

            var subPhraseParser = new SubPhraseParser(chainParseLink);
            var rowNumberParser = new RowNumberParser(subPhraseParser);

            return rowNumberParser;
        }
    }

    return ParseChainFactory;

});