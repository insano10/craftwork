define(["jquery", "increaseStitch", "singleStitch", "increaseStitchGroup", "stitchGroup", "chartModel" ], function ($, IncreaseStitch, SingleStitch, IncreaseStitchGroup, StitchGroup, ChartModel)
{

   describe("IncreaseStitch", function ()
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

        it("should connect multiple stitches to the same stich", function ()
        {
            var increase1 = new IncreaseStitch(10, 2, 0);
            var increase2 = new IncreaseStitch(11, 2, 1);
            var increase3 = new IncreaseStitch(12, 2, 2);

            var group = new IncreaseStitchGroup(2, [increase1, increase2, increase3]);
            chartModel.addStitchGroup(group);

            expect(chain[9].isAvailableForConnection()).toBe(false);
            expect(chain[8].isAvailableForConnection()).toBe(true);

            expect(chain[9].getStitchesAbove().length).toEqual(3);

            expect(increase1.getStitchesBelow().length).toEqual(1);
            expect(increase2.getStitchesBelow().length).toEqual(1);
            expect(increase3.getStitchesBelow().length).toEqual(1);
        });

    });

});