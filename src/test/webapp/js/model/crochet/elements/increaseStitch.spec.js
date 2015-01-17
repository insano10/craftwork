define(["jquery", "increaseStitch", "singleStitch" ], function ($, IncreaseStitch, SingleStitch)
{

    describe("IncreaseStitch", function ()
    {
        var chain = [];
        var tailOfChain;

        beforeEach(function()
        {
            //create a chain of 10 sc
            chain.push(new SingleStitch(0, 1));
            for(var i = 1; i<10 ; i++)
            {
                chain.push(new SingleStitch(1, 1));
                chain[i-1].setNextStitch(chain[i]);
                chain[i].setPreviousStitch(chain[i-1]);
            }
            tailOfChain = chain[9];
        });

        it("should connect multiple stitches to the same stich", function ()
        {
            var increase1 = new IncreaseStitch(10, 2, 0);
            var increase2 = new IncreaseStitch(11, 2, 1);
            var increase3 = new IncreaseStitch(12, 2, 2);

            increase1.connectToRowBelow(tailOfChain);
            increase2.connectToRowBelow(tailOfChain);
            increase3.connectToRowBelow(tailOfChain);

            expect(chain[9].isAvailableForConnection()).toBe(false);
            expect(chain[8].isAvailableForConnection()).toBe(true);

            expect(chain[9].getStitchesAbove().length).toEqual(3);

            expect(increase1.getStitchesBelow().length).toEqual(1);
            expect(increase2.getStitchesBelow().length).toEqual(1);
            expect(increase3.getStitchesBelow().length).toEqual(1);
        });

    });

});