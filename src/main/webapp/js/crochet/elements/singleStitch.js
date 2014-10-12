define(["jquery", "baseStitch"], function ($, BaseStitch)
{
   return (function()
    {
        function SingleStitch(imgFile, imgWidth, imgHeight, rowNum)
        {
            BaseStitch.call(this, imgFile, imgWidth, imgHeight, rowNum);
        }

        SingleStitch.prototype = Object.create(BaseStitch.prototype);
        SingleStitch.prototype.constructor = SingleStitch;

        SingleStitch.prototype.connectToRowBelow = function connectToRowBelow(chainTail)
        {
            var candidateStitch = chainTail;

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
                        break;
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

        SingleStitch.prototype.toString = function toString()
        {
            return "SINGLE [id: " + this.getId() + ", row: " + this.rowNum + "]";
        };

        return SingleStitch;

    })();
});