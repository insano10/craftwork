define(["jquery", "baseStitch", "stitchUtils"], function ($, BaseStitch, StitchUtils)
{
   return (function()
    {
        function DecreaseStitch(chainIndex, width, rowNum)
        {
            BaseStitch.call(this, chainIndex, "sc.png", 13, 13, rowNum, 0);
            this.width = width;
        }

        DecreaseStitch.prototype = Object.create(BaseStitch.prototype);
        DecreaseStitch.prototype.constructor = DecreaseStitch;

        DecreaseStitch.prototype.connectToRowBelow = function connectToRowBelow(chainTail)
        {
            var candidateStitch = chainTail;
            var connectionsLeftToMake = this.width;

            while(candidateStitch != null)
            {
                if(this.rowNum > candidateStitch.getRowNum())
                {
                    //row below this stitch
                    if(candidateStitch.isAvailableForConnection())
                    {
                        console.log("Connecting stitch " + this.toString() + " to stitch " + candidateStitch.toString());
                        candidateStitch.setStitchAbove(this);
                        this.setStitchBelow(candidateStitch);
                        connectionsLeftToMake--;

                        if(connectionsLeftToMake <= 0)
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

            if(candidateStitch == null && this.rowNum > 1)
            {
                console.error("Could not find connecting stitch for " + this.toString());
            }
        };

        DecreaseStitch.prototype.getConnectionAngleFor = function getConnectionAngleFor(stitchBelow, renderContext)
        {
            var baseAngle = renderContext.getRenderedStitchFor(this).getRenderAngle();

            console.log("Searching for " + stitchBelow.toString());
            $.each(this.getStitchesBelow(), function(idx, stitch) {

                if(stitch === stitchBelow)
                {
                    console.log("Matched with " + stitch.toString());
                    baseAngle += (10 * idx);
                }
            });

            return baseAngle;
        };

        DecreaseStitch.prototype.toString = function toString()
        {
            return "DECREASE [id: " + this.getId() + ", index: " + this.chainIndex + ", row: " + this.rowNum + "]";
        };

        DecreaseStitch.prototype.getType = function getType()
        {
            return "DECREASE";
        };

        return DecreaseStitch;

    })();
});