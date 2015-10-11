define(["jquery", "baseStitch", "stitchUtils"], function ($, BaseStitch, StitchUtils)
{
   return (function()
    {
        /*
            Increase stitch is a stitch attached to the same lower stitch as another
         */
        function IncreaseStitch(chainIndex, rowNum, groupIndex)
        {
            BaseStitch.call(this, chainIndex, "sc-multi.png", 13, 13, rowNum, 0);
            this.groupIndex = groupIndex;
        }

        IncreaseStitch.prototype = Object.create(BaseStitch.prototype);
        IncreaseStitch.prototype.constructor = IncreaseStitch;

        IncreaseStitch.prototype.connectToRowBelow = function connectToRowBelow(chainTail)
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


        IncreaseStitch.prototype.toString = function toString()
        {
            return "INCREASE [id: " + this.getId() + ", index: " + this.chainIndex + ", row: " + this.rowNum + "]";
        };

        IncreaseStitch.prototype.getType = function getType()
        {
            return "INCREASE";
        };

        //todo: ewwww
        IncreaseStitch.prototype.getGroupIndex = function getGroupIndex()
        {
            return this.groupIndex;
        };

        return IncreaseStitch;

    })();
});