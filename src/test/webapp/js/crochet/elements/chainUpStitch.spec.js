define(["jquery", "chainUpStitch", "singleStitch" ], function ($, ChainUpStitch, SingleStitch)
{

    xdescribe("ChainUpStitch", function ()
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

        it("should chain up 1", function ()
        {
            var stitch = new ChainUpStitch("chain-up.png", 13, 13, 2);
            stitch.connectToChain(tailOfChain);

            //chain up does not take a connection from the stitch below
            expect(chain[9].isAvailableForConnection()).toBe(true);
            expect(chain[9].getStitchesAbove().length).toEqual(0);
            expect(stitch.getStitchesBelow().length).toEqual(0);
        });

        it("should chain up 3", function ()
        {
            var stitch = new ChainUpStitch("chain-up.png", 13, 13, 2);
            var stitch2 = new ChainUpStitch("chain-up.png", 13, 13, 2);
            var stitch3 = new ChainUpStitch("chain-up.png", 13, 13, 2);
            stitch.connectToChain(tailOfChain);
            stitch2.connectToChain(stitch);
            stitch3.connectToChain(stitch2);

            //chain up does not take a connection from the stitch below
            expect(chain[9].isAvailableForConnection()).toBe(true);
            expect(chain[9].getStitchesAbove().length).toEqual(0);
            expect(stitch.getStitchesBelow().length).toEqual(0);
        });

        it("should continue with stitches in first link of row after chain up", function ()
        {
            var chainup = new ChainUpStitch("chain-up.png", 13, 13, 2);
            chainup.connectToChain(tailOfChain);

            var stitch = new SingleStitch("sc.png", 13, 13, 2);
            stitch.connectToChain(chainup);

            expect(chain[9].isAvailableForConnection()).toBe(false);
            expect(chain[9].getStitchesAbove().length).toEqual(1);
            expect(stitch.getStitchesBelow().length).toEqual(1);
        });

    });

});