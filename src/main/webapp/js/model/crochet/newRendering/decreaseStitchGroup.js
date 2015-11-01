define(["jquery", "stitchGroup", "stitchRenderer", "stitchPreRenderHelper"], function ($, StitchGroup, StitchRenderer, StitchPreRenderHelper)
{
    return (function ()
    {
        function DecreaseStitchGroup(rowNum, stitches, width)
        {
            StitchGroup.call(this, rowNum, stitches);

            this.width = width;
            this.renderer = new StitchRenderer();
            this.preRenderHelper = new StitchPreRenderHelper();
        }

        DecreaseStitchGroup.prototype = Object.create(StitchGroup.prototype);
        DecreaseStitchGroup.prototype.constructor = DecreaseStitchGroup;

        DecreaseStitchGroup.prototype.connectStitchToRowBelow = function connectStitchToRowBelow(stitch, chainTail, groupIndex)
        {
            var candidateStitch = chainTail;
            var connectionsLeftToMake = this.width;

            while (candidateStitch != null)
            {
                if (this.rowNum > candidateStitch.getRowNum())
                {
                    //row below this stitch
                    if (candidateStitch.isAvailableForConnection())
                    {
                        console.log("Connecting stitch " + stitch.toString() + " to stitch " + candidateStitch.toString());
                        candidateStitch.setStitchAbove(stitch);
                        stitch.setStitchBelow(candidateStitch);
                        connectionsLeftToMake--;

                        if (connectionsLeftToMake <= 0)
                        {
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

        DecreaseStitchGroup.prototype.getOutputAngle = function getOutputAngle(inputAngle)
        {
            var angle = inputAngle;

            //decrease angle by 10 degrees for each decrease
            if (this.rowNum % 2 != 0)
            {
                //to the right
                angle -= (10 * (this.width - 1));
            }
            else
            {
                //to the left
                angle += (10 * (this.width - 1));
            }
            console.log("decrease detected, angle is now: " + angle);

            return angle;
        };

        return DecreaseStitchGroup;

    })();
});


