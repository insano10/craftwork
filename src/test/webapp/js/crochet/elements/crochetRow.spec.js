define(["jquery", "crochetRow"], function($, CrochetRow)
{
    describe("CrochetRow", function() {

        var row;

        beforeEach(function() {

            row = new CrochetRow(10);
        });

        it("should render stitches", function() {

            var canvasContext = null, renderContext = {renderDirection: 'R'};

            var stubStitch1 = jasmine.createSpyObj("stitch", ["render", "getWidth"]);
            var stubStitch2 = jasmine.createSpyObj("stitch", ["render", "getWidth"]);
            var stubStitch3 = jasmine.createSpyObj("stitch", ["render", "getWidth"]);

            row.appendStitch(stubStitch1);
            row.appendStitch(stubStitch2);
            row.appendStitch(stubStitch3);

            row.render(canvasContext, renderContext);

            expect(stubStitch1.render).toHaveBeenCalledWith(canvasContext, renderContext);
            expect(stubStitch2.render).toHaveBeenCalledWith(canvasContext, renderContext);
            expect(stubStitch3.render).toHaveBeenCalledWith(canvasContext, renderContext);
        });

    });
});
