define(["jquery", "crochetRow"], function($, CrochetRow)
{
    describe("Crochet", function() {

        var row;

        beforeEach(function() {

            row = new CrochetRow(10);



        });

        it("should draw stitches", function() {

            var ctx = null, maxYPos = 5;

            var stubStitch1 = { drawToCanvas: function(ctx, rowNum, rowIdx, maxYPos){} };
            var stubStitch2 = { drawToCanvas: function(ctx, rowNum, rowIdx, maxYPos){} };
            var stubStitch3 = { drawToCanvas: function(ctx, rowNum, rowIdx, maxYPos){} };

            row.appendStitch(stubStitch1);
            row.appendStitch(stubStitch2);
            row.appendStitch(stubStitch3);

            spyOn(stubStitch1, "drawToCanvas");
            spyOn(stubStitch2, "drawToCanvas");
            spyOn(stubStitch3, "drawToCanvas");

            row.drawToCanvas(ctx, maxYPos);

            expect(stubStitch1.drawToCanvas).toHaveBeenCalledWith(ctx, 10, 0, maxYPos);
            expect(stubStitch2.drawToCanvas).toHaveBeenCalledWith(ctx, 10, 1, maxYPos);
            expect(stubStitch3.drawToCanvas).toHaveBeenCalledWith(ctx, 10, 2, maxYPos);
        });

    });
});
