define(["jquery", "parseChainFactory", ], function ($, ParseChainFactory)
{
    var stubModel;
    var context;
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
            var context =
            {
                rowNum:          1,
                currentRowIndex: 0
            };

            parseChain.parse("chain 5", context);

            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 0);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 1);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 2);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 3);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 4);
            expect(context.currentRowIndex).toEqual(5);
        });

        it("should parse a single crochet phrase", function ()
        {
            var context =
            {
                rowNum:          5,
                currentRowIndex: 3
            };

            parseChain.parse("2sc", context);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 5, [3]);
            expect(context.currentRowIndex).toEqual(5);
        });

        it("should parse a single crochet increase phrase", function ()
        {
            var context =
            {
                rowNum:          2,
                currentRowIndex: 10
            };

            parseChain.parse("3 sc in next sc", context);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 2, [10]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 2, [10]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 2, [10]);
            expect(context.currentRowIndex).toEqual(11);
        });

        it("should parse a single crochet decrease phrase", function ()
        {
            var context =
            {
                rowNum:          63,
                currentRowIndex: 42
            };

            parseChain.parse("1sc in next 2sc", context);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 63, [42, 43]);
            expect(context.currentRowIndex).toEqual(44);
        });

        it("should not parse invalid phrase", function ()
        {
            var context =
            {
                rowNum:          1,
                currentRowIndex: 0
            };

            parseChain.parse("this is not a valid phrase", context);

            expect(context.currentRowIndex).toEqual(0);
        });

        it("should parse phrase containing simple, increase and decrease phrases '2sc in next sc then 2sc then 1sc in next 3sc'", function() {

            var context =
            {
                rowNum:          1,
                currentRowIndex: 0
            };

            parseChain.parse("2sc in next sc then 2sc then 1sc in next 3sc", context);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [1]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [2]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [3,4,5]);
        });

    });

});