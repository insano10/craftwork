define(["jquery", "singleStitch"], function ($, SingleStitch)
{
   return (function()
    {
        function ChainStitch(imgFile, imgWidth, imgHeight, rowNum)
        {
            SingleStitch.call(this, imgFile, imgWidth, imgHeight, rowNum);
        }

        ChainStitch.prototype = Object.create(SingleStitch.prototype);
        ChainStitch.prototype.constructor = SingleStitch;


        ChainStitch.prototype.notifyStitchAboveRenderingDataUpdated = function notifyStitchAboveRenderingDataUpdated(renderedStitchAbove)
        {
            if(renderedStitchAbove.getRenderAngle() != 0)
            {
                console.log("chain stitch is going to be modified as angle above is " + renderedStitchAbove.getRenderAngle());
            }
            else
            {
                console.log("chain stitch is going to be left alone as angle above is 0");
            }
        };

        ChainStitch.prototype.toString = function toString()
        {
            return "CHAIN [id: " + this.getId() + ", row: " + this.rowNum + "]";
        };

        return ChainStitch;

    })();
});