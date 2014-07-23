define(["jquery", "baseStitch"], function ($, BaseStitch)
{
   return (function()
    {
        function DecreaseStitch(name, width, imgFile, imgWidth, rowNum, firstOfAGroup)
        {
            BaseStitch.call(this, name, width, imgFile, imgWidth, rowNum, firstOfAGroup);
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

            if(candidateStitch == null)
            {
                console.error("Could not find connecting stitch for " + this.toString());
            }
        };

        DecreaseStitch.prototype.toString = function toString()
        {
            return this.name + " [row: " + this.rowNum + "]";
        };

        return DecreaseStitch;

    })();
});