define(["jquery", "baseStitch", "stitchUtils"], function ($, BaseStitch, StitchUtils)
{
   return (function()
    {
        /*
            Increase stitch is a stitch attached to the same lower stitch as another
         */
        function IncreaseStitch(imgFile, imgWidth, imgHeight, rowNum, groupIndex)
        {
            BaseStitch.call(this, imgFile, imgWidth, imgHeight, rowNum);
            this.groupIndex = groupIndex;
        }

        IncreaseStitch.prototype = Object.create(BaseStitch.prototype);
        IncreaseStitch.prototype.constructor = IncreaseStitch;

        IncreaseStitch.prototype.connectToChain = function connectToChain(chainTail)
        {
            var candidateStitch = chainTail;

            while(candidateStitch != null)
            {
                if(this.rowNum > candidateStitch.getRowNum())
                {
                    //row below this stitch
                    if(this.groupIndex == 0 && candidateStitch.isAvailableForConnection())
                    {
                        //connect to the next available stitch
                        console.log("Connecting primary stitch " + this.toString() + " to stitch " + candidateStitch.toString());
                        candidateStitch.setStitchAbove(this);
                        this.setStitchBelow(candidateStitch);
                        break;
                    }
                    else if(this.groupIndex > 0)
                    {
                        if(candidateStitch.getPreviousStitch() != null && candidateStitch.getPreviousStitch().isAvailableForConnection())
                        {
                            //connect to the first stitch that already has stitches connected
                            console.log("Connecting secondary stitch " + this.toString() + " to stitch " + candidateStitch.toString());
                            candidateStitch.setStitchAbove(this);
                            this.setStitchBelow(candidateStitch);
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

        IncreaseStitch.prototype.getAngleOfRotation = function getAngleOfRotation(stitch, renderContext)
        {
            var lastStitch = stitch.getPreviousStitch();

            if (lastStitch != null)
            {
                var angle = renderContext.getRenderedStitchFor(lastStitch).getRenderAngle();

                if(this.groupIndex > 0)
                {
                    if(this.rowNum%2 != 0)
                    {
                        angle += 10;
                    }
                    else
                    {
                        angle -= 10;
                    }
                    console.log("increase detected, angle is now: " + angle);
                }
                else
                {
                    console.log("first stitch of an increase, keeping the angle at: " + angle);
                }

                return angle;
            }
            else
            {
                return 0;
            }
        };

        IncreaseStitch.prototype.toString = function toString()
        {
            return "INCREASE [id: " + this.getId() + ", row: " + this.rowNum + "]";
        };

        return IncreaseStitch;

    })();
});