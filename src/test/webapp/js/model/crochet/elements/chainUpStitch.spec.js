define(["jquery", "chainUpStitch", "singleStitch" ], function ($, ChainUpStitch, SingleStitch)
{

    describe("ChainUpStitch", function ()
    {
        var chain = [];
        var tailOfChain;

        function addStitchToChain(stitch, chain)
        {
            chain.push(stitch);
            chain[chain.length - 2].setNextStitch(chain[chain.length - 1]);
            stitch.connectToRowBelow(tailOfChain);
            tailOfChain = stitch;
        }

        beforeEach(function()
        {
            //create a chain of 10 sc
            chain = [];
            chain.push(new SingleStitch(0, 1));
            for(var i = 1; i<10 ; i++)
            {
                addStitchToChain(new SingleStitch(i, 1), chain);
            }
        });

        it("should chain up 1", function ()
        {
            var stitch = new ChainUpStitch(10, 1);
            addStitchToChain(stitch, chain);

            //chain up does not take a connection from the stitch below
            expect(chain[9].isAvailableForConnection()).toBe(true);
            expect(chain[9].getStitchesAbove().length).toEqual(0);
            expect(stitch.getStitchesBelow().length).toEqual(0);
        });

        it("should chain up 3", function ()
        {
            var stitch = new ChainUpStitch(10, 1);
            var stitch2 = new ChainUpStitch(11, 1);
            var stitch3 = new ChainUpStitch(12, 1);
            addStitchToChain(stitch, chain);
            addStitchToChain(stitch2, chain);
            addStitchToChain(stitch3, chain);

            //chain up does not take a connection from the stitch below
            expect(chain[9].isAvailableForConnection()).toBe(true);
            expect(chain[9].getStitchesAbove().length).toEqual(0);
            expect(stitch.getStitchesBelow().length).toEqual(0);
            expect(stitch2.getStitchesBelow().length).toEqual(0);
            expect(stitch3.getStitchesBelow().length).toEqual(0);
        });

        it("should continue with stitches in first link of row after chain up", function ()
        {
            var chainup = new ChainUpStitch(10, 1);
            addStitchToChain(chainup, chain);

            var stitch = new SingleStitch(11, 2);
            addStitchToChain(stitch, chain);

            expect(chain[9].isAvailableForConnection()).toBe(false);
            expect(chain[9].getStitchesAbove().length).toEqual(1);
            expect(stitch.getStitchesBelow().length).toEqual(1);
        });

    });

});