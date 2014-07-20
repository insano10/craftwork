define(["jquery", "parseChainFactory", ], function ($, ParseChainFactory)
{
    var stubModel;
    var parseChain;

    beforeEach(function ()
    {
        stubModel = jasmine.createSpyObj("chartModel", ["addSingleCrochet", "addChain", "clear", "redrawChart"]);
        parseChain = new ParseChainFactory().createParseChain(stubModel);
    });

    describe("ParseChainFactory", function ()
    {

        it("should parse a chain stitch phrase", function ()
        {
            var context = { rowNum: 0, currentRowIndex: 0 };

            parseChain.parse("row 1: chain 5", context);

            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1);
            expect(context.currentRowIndex).toEqual(5);
        });

        it("should parse a single crochet phrase", function ()
        {
            var context = { rowNum: 4, currentRowIndex: 3 };

            parseChain.parse("row 5: 2sc", context);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 5);
            expect(context.currentRowIndex).toEqual(5);
        });

        xit("should parse a single crochet increase phrase", function ()
        {
            var context = { rowNum: 1, currentRowIndex: 10 };

            parseChain.parse("row 2: 3 sc in next sc", context);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 2);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 2);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 2);
            expect(context.currentRowIndex).toEqual(11);
        });

        xit("should parse a single crochet decrease phrase", function ()
        {
            var context = { rowNum: 62, currentRowIndex: 42 };

            parseChain.parse("row 63: 1sc in next 2sc", context);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 63);
            expect(context.currentRowIndex).toEqual(44);
        });

        it("should not parse invalid phrase", function ()
        {
            var context = { rowNum: 0, currentRowIndex: 0 };

            parseChain.parse("this is not a valid phrase", context);

            expect(context.currentRowIndex).toEqual(0);
        });

        xit("should parse phrase containing simple, increase and decrease phrases '2sc in next sc then 2sc then 1sc in next 3sc'", function() {

            var context = { rowNum: 0, currentRowIndex: 0 };

            parseChain.parse("row 1: 2sc in next sc then 2sc then 1sc in next 3sc", context);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1);
            expect(stubModel.addSingleCrochet.callCount).toEqual(5);
        });

    });

});