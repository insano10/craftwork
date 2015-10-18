define(["jquery", "baseStitch", "singleStitch", "chainStitch", "chainUpStitch", "increaseStitch", "decreaseStitch"],
    function ($, BaseStitch, SingleStitch, ChainStitch, ChainUpStitch, IncreaseStitch, DecreaseStitch)
{

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
            var chainRegex = /^[\s]*[C|c]hain[\s]*([\d]+)[\s]*$/;
            var match = chainRegex.exec(phrase);

            if (match != null)
            {
                var stitchCount = match[1];

                for (var rowIdx = 0; rowIdx < stitchCount; rowIdx++)
                {
                    chartModel.addStitch(new ChainStitch(context.chainIndex, context.rowNum));
                    context.chainIndex++;
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
                    chartModel.addStitch(new SingleStitch(context.chainIndex, context.rowNum));
                    context.chainIndex++;
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

                for (var stitchNum = 0; stitchNum < stitchCount; stitchNum++)
                {
                    chartModel.addStitch(new IncreaseStitch(context.chainIndex, context.rowNum));
                    context.chainIndex++;
                }
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
                chartModel.addStitch(new DecreaseStitch(context.chainIndex, stitchCount, context.rowNum));
                context.chainIndex++;
                return true;
            }
            return false;
        }
    }

    function ChainUpParser(chartModel)
    {
        this.parse = function parse(phrase, context)
        {
            // chup 1
            var chainUpRegex = /^[\s]*chup[\s]*([\d]+)[\s]*$/;
            var match = chainUpRegex.exec(phrase);

            if(match != null)
            {
                var stitchCount = match[1];
                for (var rowIdx = 0; rowIdx < stitchCount; rowIdx++)
                {
                    chartModel.addStitch(new ChainUpStitch(context.chainIndex, context.rowNum));
                    context.chainIndex++;
                }
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
            var singleCrochetIncreaseParseLink = new ParseLink(new SingleCrochetIncreaseParser(chartModel), null);
            var singleCrochetDecreaseParseLink = new ParseLink(new SingleCrochetDecreaseParser(chartModel), singleCrochetIncreaseParseLink);
            var singleCrochetParseLink = new ParseLink(new SingleCrochetParser(chartModel), singleCrochetDecreaseParseLink);
            var chainUpParseLink = new ParseLink(new ChainUpParser(chartModel), singleCrochetParseLink);
            var chainParseLink = new ParseLink(new ChainStitchParser(chartModel), chainUpParseLink);

            var subPhraseParser = new SubPhraseParser(chainParseLink);

            return subPhraseParser;
        }
    }

    return ParseChainFactory;

});