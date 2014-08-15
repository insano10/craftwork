define(["jquery", "baseStitch", "stitchUtils"], function ($, BaseStitch, StitchUtils)
{
   return (function()
    {
        function DecreaseStitch(width, imgFile, imgWidth, rowNum)
        {
            BaseStitch.call(this, imgFile, imgWidth, rowNum);
            this.width = width;
        }

        DecreaseStitch.prototype = Object.create(BaseStitch.prototype);
        DecreaseStitch.prototype.constructor = DecreaseStitch;

        DecreaseStitch.prototype.connectToChain = function connectToChain(chainTail)
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

        DecreaseStitch.prototype.preRender = function preRender(canvasContext, renderContext)
        {
            renderContext.currentRenderXPos += StitchUtils.getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(this.stitchesBelow.length, this.rowNum, this.imgWidth);
        };

        DecreaseStitch.prototype.postRender = function postRender(canvasContext, renderContext)
        {
            renderContext.currentRenderXPos += StitchUtils.getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(this.stitchesBelow.length, this.rowNum, this.imgWidth);
        };

        DecreaseStitch.prototype.toString = function toString()
        {
            return "DECREASE [id: " + this.getId() + ", row: " + this.rowNum + "]";
        };

        return DecreaseStitch;

    })();
});