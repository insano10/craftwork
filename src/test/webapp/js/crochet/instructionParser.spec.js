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

        it("should parse multiple valid lines", function() {

            parser.parseInstructions(["row 1: 2 sc", "row 2: 1 sc"]);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 1, [1]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 2, [0]);
        });

        it("should parse multiple valid lines and ignore invalid ones", function() {

            parser.parseInstructions(["row 1: chain 2", "row 2: invalid", " row 3: 2sc"]);

            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 0);
            expect(stubModel.addChain).toHaveBeenCalledWith(jasmine.any(Object), 1, 1);

            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 3, [0]);
            expect(stubModel.addSingleCrochet).toHaveBeenCalledWith(jasmine.any(Object), 3, [1]);
        });

    });
});



