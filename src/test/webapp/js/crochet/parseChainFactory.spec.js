define(["jquery", "parseChainFactory", ], function ($, ParseChainFactory)
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

            parseChain.parse("row 1: chain 5", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 1}));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 1}));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 1}));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 1}));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 1}));
        });

        it("should parse a single crochet phrase", function ()
        {
            var context = { rowNum: 4 };

            parseChain.parse("row 5: 2sc", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 5}));
        });

        it("should parse a single crochet increase phrase", function ()
        {
            var context = { rowNum: 1 };

            parseChain.parse("row 2: 3 sc in next sc", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 2}));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 2}));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 2}));
        });

        it("should parse a single crochet decrease phrase", function ()
        {
            var context = { rowNum: 62 };

            parseChain.parse("row 63: 1sc in next 2sc", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 63}));
        });

        it("should not parse invalid phrase", function ()
        {
            var context = { rowNum: 0 };

            parseChain.parse("this is not a valid phrase", context);
        });

        it("should parse phrase containing simple, increase and decrease phrases '2sc in next sc then 2sc then 1sc in next 3sc'", function() {

            var context = { rowNum: 2 };

            parseChain.parse("row 3: 2sc in next sc then 2sc then 1sc in next 3sc", context);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 3}));
            expect(stubModel.addStitch.callCount).toEqual(5);
        });

    });

});