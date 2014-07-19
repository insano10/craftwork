define(["jquery", "parseChainFactory", "instructionParser"], function($, ParseChainFactory, InstructionParser)
{
    describe("InstructionParser", function() {

        var stubModel;
        var parser;

        beforeEach(function() {

            stubModel = jasmine.createSpyObj("chartModel", ["addSingleCrochet", "addChain", "clear", "redrawChart"]);

            var parseChain = new ParseChainFactory().createParseChain(stubModel);
            parser = new InstructionParser(stubModel, parseChain);
        });

        it("should parse 'chain 10'", function() {

            parser.parseInstructions(["row 1: chain 10"]);

            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 0);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 1);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 2);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 3);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 4);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 5);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 6);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 7);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 8);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 9);
        });

        it("should parse '1 sc'", function() {

            parser.parseInstructions(["row 1: 1 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
        });

        it("should parse '5 sc'", function() {

            parser.parseInstructions(["row 1: 5 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [1]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [2]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [3]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [4]);
        });

        it("should parse '1 sc then 3 sc'", function() {

            parser.parseInstructions(["row 1: 1 sc then 3 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [1]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [2]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [3]);
        });

        it("should parse '2 sc, 3 sc'", function() {

            parser.parseInstructions(["row 1: 2 sc, 3 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [1]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [2]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [3]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [4]);
        });

        it("should parse multiple valid lines", function() {

            parser.parseInstructions(["row 1: 2 sc", "row 2: 1 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [1]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 2, [0]);
        });

        it("should parse increase phrase '2 sc in next sc'", function() {

            parser.parseInstructions(["row 1: 2 sc in next sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
        });

        it("should parse phrase containing simple and increase phrases '1 sc then 2 sc in next sc then 2 sc'", function() {

            parser.parseInstructions(["row 1: 1 sc then 2 sc in next sc then 2 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [1]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [1]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [2]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [3]);
        });

        it("should parse decrease phrase '1 sc in next 2 sc'", function() {

            parser.parseInstructions(["row 1: 1 sc in next 2sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0,1]);
        });

        it("should parse phrase containing simple and decrease phrases '3sc then 1sc in next 2sc,2sc'", function() {

            parser.parseInstructions(["row 1: 3sc then 1sc in next 2sc,2sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [1]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [2]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [3,4]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [5]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [6]);
        });

        it("should parse phrase containing simple, increase and decrease phrases '2sc in next sc then 2sc then 1sc in next 3sc'", function() {

            parser.parseInstructions(["row 1: 2sc in next sc then 2sc then 1sc in next 3sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [1]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [2]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [3,4,5]);
        });

    });
});



