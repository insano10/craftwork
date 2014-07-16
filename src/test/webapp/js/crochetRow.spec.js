define(["jquery", "crochetRow"], function($, CrochetRow)
{
    describe("Crochet", function() {

        var row;

        beforeEach(function() {

            row = new CrochetRow(10);
        });

        it("should render stitches", function() {

            var ctx = null, maxYPos = 5;

            var stubStitch1 = jasmine.createSpyObj("stitch", ["render"]);
            var stubStitch2 = jasmine.createSpyObj("stitch", ["render"]);
            var stubStitch3 = jasmine.createSpyObj("stitch", ["render"]);

            row.appendStitch(stubStitch1);
            row.appendStitch(stubStitch2);
            row.appendStitch(stubStitch3);

            row.render(ctx, maxYPos);

            expect(stubStitch1.render).toHaveBeenCalledWith(ctx, 10, 0, maxYPos);
            expect(stubStitch2.render).toHaveBeenCalledWith(ctx, 10, 1, maxYPos);
            expect(stubStitch3.render).toHaveBeenCalledWith(ctx, 10, 2, maxYPos);
        });

    });
});
