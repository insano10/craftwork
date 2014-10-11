define(["jquery", "increaseStitch", "singleStitch" ], function ($, IncreaseStitch, SingleStitch)
{

    describe("IncreaseStitch", function ()
    {
        var chain = [];
        var tailOfChain;

        beforeEach(function()
        {
            //create a chain of 10 sc
            chain.push(new SingleStitch("sc.png", 13, 13, 1));
            for(var i = 1; i<10 ; i++)
            {
                chain.push(new SingleStitch("sc.png", 13, 13, 1));
                chain[i-1].setNextStitch(chain[i]);
                chain[i].setPreviousStitch(chain[i-1]);
            }
            tailOfChain = chain[9];
        });

        it("should connect multiple stitches to the same stich", function ()
        {
            var increase1 = new IncreaseStitch("sc.png", 13, 13, 2, 0);
            var increase2 = new IncreaseStitch("sc.png", 13, 13, 2, 1);
            var increase3 = new IncreaseStitch("sc.png", 13, 13, 2, 2);

            increase1.connectToChain(tailOfChain);
            increase2.connectToChain(tailOfChain);
            increase3.connectToChain(tailOfChain);

            expect(chain[9].isAvailableForConnection()).toBe(false);
            expect(chain[8].isAvailableForConnection()).toBe(true);

            expect(chain[9].getStitchesAbove().length).toEqual(3);

            expect(increase1.getStitchesBelow().length).toEqual(1);
            expect(increase2.getStitchesBelow().length).toEqual(1);
            expect(increase3.getStitchesBelow().length).toEqual(1);
        });

    });

});