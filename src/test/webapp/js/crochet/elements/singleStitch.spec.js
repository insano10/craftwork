define(["jquery", "singleStitch" ], function ($, SingleStitch)
{

    describe("SingleStitch", function ()
    {
        var chain = [];
        var tailOfChain;

        beforeEach(function()
        {
            //create a chain of 10 sc
            chain.push(new SingleStitch("sc.png", 13, 1));
            for(var i = 1; i<10 ; i++)
            {
                chain.push(new SingleStitch("sc.png", 13, 1));
                chain[i-1].setNextStitch(chain[i]);
                chain[i].setPreviousStitch(chain[i-1]);
            }
            tailOfChain = chain[9];
        });

        it("should connect a stitch", function ()
        {
            var stitch = new SingleStitch("sc.png", 13, 2);
            stitch.connectToChain(tailOfChain);

            expect(chain[9].isAvailableForConnection()).toBe(false);
            expect(chain[9].getStitchesAbove().length).toEqual(1);
            expect(stitch.getStitchesBelow().length).toEqual(1);
        });

    });

});