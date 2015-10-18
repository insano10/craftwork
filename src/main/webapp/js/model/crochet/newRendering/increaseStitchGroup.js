define(["jquery", "stitchGroup", "increaseStitchRenderer", "increaseStitchPreRenderHelper"], function ($, StitchGroup, IncreaseStitchRenderer, IncreaseStitchPreRenderHelper)
{
    return (function ()
    {
        function IncreaseStitchGroup(rowNum)
        {
            StitchGroup.call(this, rowNum);

            this.renderer = new IncreaseStitchRenderer();
            this.preRenderHelper = new IncreaseStitchPreRenderHelper();
        }

        IncreaseStitchGroup.prototype = Object.create(StitchGroup.prototype);
        IncreaseStitchGroup.prototype.constructor = IncreaseStitchGroup;


        IncreaseStitchGroup.prototype.accept = function accept(stitch)
        {
            //only accept increase stitches
            return stitch.getType() == "INCREASE";
        };

        IncreaseStitchGroup.prototype.connectStitchToRowBelow = function connectStitchToRowBelow(stitch, chainTail, groupIndex)
        {
            var candidateStitch = chainTail;

            while(candidateStitch != null)
            {
                if(this.rowNum > candidateStitch.getRowNum())
                {
                    //row below this stitch
                    if(groupIndex == 0 && candidateStitch.isAvailableForConnection())
                    {
                        //connect to the next available stitch
                        console.log("Connecting primary stitch " + stitch.toString() + " to stitch " + candidateStitch.toString());
                        candidateStitch.setStitchAbove(stitch);
                        stitch.setStitchBelow(candidateStitch);
                        break;
                    }
                    else if(groupIndex > 0)
                    {
                        if(candidateStitch.getPreviousStitch() != null && candidateStitch.getPreviousStitch().isAvailableForConnection())
                        {
                            //connect to the first stitch that already has stitches connected
                            console.log("Connecting secondary stitch " + stitch.toString() + " to stitch " + candidateStitch.toString());
                            candidateStitch.setStitchAbove(stitch);
                            stitch.setStitchBelow(candidateStitch);
                            break;
                        }
                    }
                    else
                    {
                        console.log("not free, continuing");
                    }
                }
                candidateStitch = candidateStitch.getPreviousStitch();
            }

            if(candidateStitch == null && this.rowNum > 1)
            {
                console.error("Could not find connecting stitch for " + stitch.toString());
            }
        };

        return IncreaseStitchGroup;

    })();
});


