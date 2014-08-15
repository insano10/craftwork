define(["jquery", "baseStitch", "stitchUtils"], function ($, BaseStitch, StitchUtils)
{
   return (function()
    {
        /*
            Increase stitch is a stitch attached to the same lower stitch as another
         */
        function IncreaseStitch(imgFile, imgWidth, rowNum, groupIndex, group)
        {
            BaseStitch.call(this, imgFile, imgWidth, rowNum);
            this.groupIndex = groupIndex;
            this.group = group;
        }

        IncreaseStitch.prototype = Object.create(BaseStitch.prototype);
        IncreaseStitch.prototype.constructor = IncreaseStitch;

        IncreaseStitch.prototype.connectToChain = function connectToChain(chainTail)
        {
            var candidateStitch = chainTail;

            while(candidateStitch != null)
            {
                if(this.rowNum> candidateStitch.getRowNum())
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

        //todo: replace this with a render strategy
        IncreaseStitch.prototype.preRender = function preRender(canvasContext, renderContext, renderPosition)
        {
            //there can only be one stitch below for an increase
            var idOfStitchBelow = this.getStitchesBelow()[0].getId();
            var connectionXPos = renderContext.stitches[idOfStitchBelow].getXPos();

            console.log(this.toString() + "is sitting above x coordinate " + connectionXPos);
            renderPosition.x = this.group.calculateRenderXPos(this.groupIndex, this.rowNum, connectionXPos);
        };

        IncreaseStitch.prototype.renderConnectionLines = function renderConnectionLines(canvasContext, renderContext, renderPosition)
        {
            this.group.renderConnectionLines(canvasContext, renderPosition, this.groupIndex, this.getRowNum());
        };

        IncreaseStitch.prototype.toString = function toString()
        {
            return "INCREASE [id: " + this.getId() + ", row: " + this.rowNum + "]";
        };

        return IncreaseStitch;

    })();
});