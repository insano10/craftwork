define(["jquery", "parseChainFactory", "singleStitch", "chainStitch", "decreaseStitch", "increaseStitch", "chainUpStitch"],
    function ($, ParseChainFactory, SingleStitch, ChainStitch, DecreaseStitch, IncreaseStitch, ChainUpStitch)
{
    var stubModel;
    var parseChain;

    beforeEach(function ()
    {
        stubModel = jasmine.createSpyObj("chartModel", ["addStitch", "clear", "redrawChart"]);
        parseChain = new ParseChainFactory().createParseChain(stubModel);
    });

    describe("ParseChainFactory", function ()
    {

        it("should parse a chain stitch phrase", function ()
        {
            var context = { rowNum: 0  };

            parseChain.parse("chain 5", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.any(ChainStitch));
            expect(stubModel.addStitch.calls.count()).toEqual(5);
        });

        it("should parse a single crochet phrase", function ()
        {
            var context = { rowNum: 4 };

            parseChain.parse("2sc", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.any(SingleStitch));
            expect(stubModel.addStitch.calls.count()).toEqual(2);
        });

        it("should parse a single crochet increase phrase", function ()
        {
            var context = { rowNum: 1 };

            parseChain.parse("3 sc in next sc", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.any(IncreaseStitch));
            expect(stubModel.addStitch.calls.count()).toEqual(3);
        });

        it("should parse a single crochet decrease phrase", function ()
        {
            var context = { rowNum: 62 };

            parseChain.parse("1sc in next 2sc", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.any(DecreaseStitch));
            expect(stubModel.addStitch.calls.count()).toEqual(1);
        });

        it("should parse a chain up phrase", function ()
        {
            var context = { rowNum: 12 };

            parseChain.parse("chup 3", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.any(ChainUpStitch));
            expect(stubModel.addStitch.calls.count()).toEqual(3);
        });

        it("should not parse invalid phrase", function ()
        {
            var context = { rowNum: 0 };

            parseChain.parse("this is not a valid phrase", context);
        });

        it("should parse phrase containing single, increase, decrease and chain up phrases '2sc in next sc then 2sc then 1sc in next 3sc, chup2'", function() {

            var context = { rowNum: 2 };

            parseChain.parse("2sc in next sc then 2sc then 1sc in next 3sc, chup2", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.any(IncreaseStitch));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.any(SingleStitch));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.any(DecreaseStitch));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.any(ChainUpStitch));
            expect(stubModel.addStitch.calls.count()).toEqual(7);
        });

    });

});