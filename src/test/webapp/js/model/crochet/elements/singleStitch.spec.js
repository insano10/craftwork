define(["jquery", "singleStitch", "stitchGroup", "chartModel" ], function ($, SingleStitch, StitchGroup, ChartModel)
{

    describe("SingleStitch", function ()
    {
        var chain = [];
        var chartModel = new ChartModel();

        beforeEach(function()
        {

            //create a chain of 10 sc
            chain.push(new SingleStitch(0, 1));
            for(var i = 1; i<10 ; i++)
            {
                var stitch = new SingleStitch(i, 1);
                chartModel.addStitchGroup(new StitchGroup(stitch.getRowNum(), [stitch]));
                chain.push(stitch);
            }
        });

        it("should connect a stitch", function ()
        {
            var stitch = new SingleStitch(10, 2);

            chartModel.addStitchGroup(new StitchGroup(stitch.getRowNum(), [stitch]));

            expect(chain[9].isAvailableForConnection()).toBe(false);
            expect(chain[9].getStitchesAbove().length).toEqual(1);
            expect(stitch.getStitchesBelow().length).toEqual(1);
        });

    });

});