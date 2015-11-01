define(["jquery", "stitchGroup", "increaseStitchRenderer", "increaseStitchPreRenderHelper", "renderingUtils"], function ($, StitchGroup, IncreaseStitchRenderer, IncreaseStitchPreRenderHelper, RenderingUtils)
{
    return (function ()
    {
        function IncreaseStitchGroup(rowNum, stitches)
        {
            StitchGroup.call(this, rowNum, stitches);

            this.renderer = new IncreaseStitchRenderer();
            this.preRenderHelper = new IncreaseStitchPreRenderHelper();
        }

        IncreaseStitchGroup.prototype = Object.create(StitchGroup.prototype);
        IncreaseStitchGroup.prototype.constructor = IncreaseStitchGroup;

        IncreaseStitchGroup.prototype.getWidth = function getWidth()
        {
            return (this.stitches[0].getWidth() * this.stitches.length) + ((this.stitches.length - 1) * RenderingUtils.HORIZONTAL_STITCH_GROUP_SPACER);
        };

        IncreaseStitchGroup.prototype.connectStitchToRowBelow = function connectStitchToRowBelow(stitch, chainTail, groupIndex)
        {
            var candidateStitch = chainTail;

            while (candidateStitch != null)
            {
                if (this.rowNum > candidateStitch.getRowNum())
                {
                    //row below this stitch
                    if (groupIndex == 0 && candidateStitch.isAvailableForConnection())
                    {
                        //connect to the next available stitch
                        console.log("Connecting primary stitch " + stitch.toString() + " to stitch " + candidateStitch.toString());
                        candidateStitch.setStitchAbove(stitch);
                        stitch.setStitchBelow(candidateStitch);
                        break;
                    }
                    else if (groupIndex > 0)
                    {
                        if (candidateStitch.getPreviousStitch() != null && candidateStitch.getPreviousStitch().isAvailableForConnection())
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

            if (candidateStitch == null && this.rowNum > 1)
            {
                console.error("Could not find connecting stitch for " + stitch.toString());
            }
        };

        IncreaseStitchGroup.prototype.getOutputAngle = function getOutputAngle(inputAngle)
        {
            var angle = inputAngle;

            if (this.rowNum % 2 != 0)
            {
                angle += (10 * (this.stitches.length - 1));
            }
            else
            {
                angle -= (10 * (this.stitches.length - 1));
            }

            console.log("increase detected, angle is now: " + angle);

            return angle;
        };

        return IncreaseStitchGroup;

    })();
});


