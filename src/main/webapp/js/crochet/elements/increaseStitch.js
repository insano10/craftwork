define(["jquery", "baseStitch"], function ($, BaseStitch)
{
   return (function()
    {
        function IncreaseStitch(imgFile, imgWidth, rowNum, firstOfAGroup)
        {
            BaseStitch.call(this, imgFile, imgWidth, rowNum);
            this.firstOfAGroup = firstOfAGroup;
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
                    if(this.firstOfAGroup && candidateStitch.isAvailableForConnection())
                    {
                        //connect to the next available stitch
                        console.log("Connecting primary stitch " + this.toString() + " to stitch " + candidateStitch.toString());
                        candidateStitch.setStitchAbove(this);
                        break;
                    }
                    else if(!this.firstOfAGroup)
                    {
                        if(candidateStitch.getPreviousStitch() != null && candidateStitch.getPreviousStitch().isAvailableForConnection())
                        {
                            //connect to the first stitch that already has stitches connected
                            console.log("Connecting secondary stitch " + this.toString() + " to stitch " + candidateStitch.toString());
                            candidateStitch.setStitchAbove(this);
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

        IncreaseStitch.prototype.toString = function toString()
        {
            return "INCREASE [row: " + this.rowNum + "]";
        };

        return IncreaseStitch;

    })();
});