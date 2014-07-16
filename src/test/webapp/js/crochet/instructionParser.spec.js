define(["jquery", "singleCrochet", "instructionParser"], function($, SingleCrochet, InstructionParser)
{
    describe("InstructionParser", function() {

        var stubModel;
        var parser;

        beforeEach(function() {

            stubModel = jasmine.createSpyObj("chartModel", ["addSingleCrochet", "clear", "redrawChart"]);
            parser = new InstructionParser(stubModel);
        });

        it("should parse '1 sc'", function() {

            parser.parseInstructions(["row 1: 1 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 0);
        });

        it("should parse '5 sc'", function() {

            parser.parseInstructions(["row 1: 5 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 0);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 1);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 2);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 3);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 4);
        });

        it("should parse '1 sc then 3 sc'", function() {

            parser.parseInstructions(["row 1: 1 sc then 3 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 0);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 1);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 2);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 3);
        });

        it("should parse '2 sc, 3 sc'", function() {

            parser.parseInstructions(["row 1: 2 sc, 3 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 0);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 1);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 2);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 3);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 4);
        });

        it("should parse multiple valid lines", function() {

            parser.parseInstructions(["row 1: 2 sc", "row 2: 1 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 0);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 1);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 2, 0);
        });

//        it("should parse '2 sc in next sc'", function() {
//
//            parser.parseInstructions(["row 1: 2 sc in next sc"]);
//
//            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 0);
//            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, 1);
//        });

    });
});



