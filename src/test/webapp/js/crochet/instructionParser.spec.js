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

    });
});



