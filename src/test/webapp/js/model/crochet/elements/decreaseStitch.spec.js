define(["jquery", "decreaseStitch", "singleStitch", "decreaseStitchGroup", "stitchGroup", "chartModel" ], function ($, DecreaseStitch, SingleStitch, DecreaseStitchGroup, StitchGroup, ChartModel)
{

    describe("DecreaseStitch", function ()
    {
        var chain = [];
        var chartModel = new ChartModel;

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

        it("should connect to multiple stitches", function ()
        {
            var stitch = new DecreaseStitch(10, 3, 2);

            chartModel.addStitchGroup(new DecreaseStitchGroup(stitch.getRowNum(), [stitch], 3));

            expect(chain[9].isAvailableForConnection()).toBe(false);
            expect(chain[8].isAvailableForConnection()).toBe(false);
            expect(chain[7].isAvailableForConnection()).toBe(false);
            expect(chain[6].isAvailableForConnection()).toBe(true);

            expect(chain[9].getStitchesAbove().length).toEqual(1);
            expect(chain[8].getStitchesAbove().length).toEqual(1);
            expect(chain[7].getStitchesAbove().length).toEqual(1);
            expect(chain[6].getStitchesAbove().length).toEqual(0);

            expect(stitch.getStitchesBelow().length).toEqual(3);
        });

    });

});