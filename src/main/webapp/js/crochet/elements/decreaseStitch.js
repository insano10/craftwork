define(["jquery", "baseStitch"], function ($, BaseStitch)
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

        var increaseRenderXPosByRequiredOffset = function increaseRenderXPosByRequiredOffset(renderContext, stitchesBelow, rowNum, imgWidth)
        {
            //shuffle the render pointer across by 1/2 width for every additional stitch this one is connected to

            if(stitchesBelow > 1)
            {
                var additionalXPosRequired = parseInt((stitchesBelow-1) * (imgWidth/2));

                if(rowNum%2 == 0)
                {
                    renderContext.currentRenderXPos -= additionalXPosRequired;
                }
                else
                {
                    renderContext.currentRenderXPos += additionalXPosRequired;
                }
            }
        };

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
            increaseRenderXPosByRequiredOffset(renderContext, this.stitchesBelow.length, this.rowNum, this.imgWidth);
        };

        DecreaseStitch.prototype.postRender = function postRender(canvasContext, renderContext)
        {
            increaseRenderXPosByRequiredOffset(renderContext, this.stitchesBelow.length, this.rowNum, this.imgWidth);
        };

        DecreaseStitch.prototype.toString = function toString()
        {
            return "DECREASE [row: " + this.rowNum + "]";
        };

        return DecreaseStitch;

    })();
});