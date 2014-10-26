define(["jquery", "parseChainFactory", "instructionParser"], function($, ParseChainFactory, InstructionParser)
{
    describe("InstructionParser", function() {

        var stubModel, stubRenderer;
        var parser;

        beforeEach(function() {

            stubRenderer = jasmine.createSpyObj("chartRenderer", ["renderModel"]);
            stubModel = jasmine.createSpyObj("chartModel", ["addStitch", "clear", "redrawChart"]);

            var parseChain = new ParseChainFactory().createParseChain(stubModel);
            parser = new InstructionParser(stubModel, stubRenderer, parseChain);
        });

        it("should parse multiple valid lines", function() {

            parser.parseInstructions(["2 sc", "1 sc"]);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 1}));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 1}));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 2}));
        });

        it("should parse multiple valid lines and ignore invalid ones", function() {

            parser.parseInstructions(["chain 2", "invalid", " 2sc"]);

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 1}));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 1}));

            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 3}));
            expect(stubModel.addStitch).toHaveBeenCalledWith(jasmine.objectContaining({rowNum: 3}));
        });

    });
});



