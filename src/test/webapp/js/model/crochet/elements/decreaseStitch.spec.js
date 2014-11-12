define(["jquery", "decreaseStitch", "singleStitch" ], function ($, DecreaseStitch, SingleStitch)
{

    describe("DecreaseStitch", function ()
    {
        var chain = [];
        var tailOfChain;

        beforeEach(function()
        {
            //create a chain of 10 sc
            chain.push(new SingleStitch(1));
            for(var i = 1; i<10 ; i++)
            {
                chain.push(new SingleStitch(1));
                chain[i-1].setNextStitch(chain[i]);
                chain[i].setPreviousStitch(chain[i-1]);
            }
            tailOfChain = chain[9];
        });

        it("should connect to multiple stitches", function ()
        {
            var stitch = new DecreaseStitch(3, 2);

            stitch.connectToRowBelow(tailOfChain);

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