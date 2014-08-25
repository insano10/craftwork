define(["jquery", "singleStitch", "renderedStitch"], function ($, SingleStitch, RenderedStitch)
{
   return (function()
    {
        function ChainStitch(imgFile, imgWidth, imgHeight, rowNum)
        {
            SingleStitch.call(this, imgFile, imgWidth, imgHeight, rowNum);
        }

        ChainStitch.prototype = Object.create(SingleStitch.prototype);
        ChainStitch.prototype.constructor = SingleStitch;


        ChainStitch.prototype.notifyStitchAboveRenderingDataUpdated = function notifyStitchAboveRenderingDataUpdated(renderedStitchAbove, renderContext)
        {
            if(renderedStitchAbove.getRenderAngle() != 0)
            {
                console.log("chain stitch is going to be modified as angle above is " + renderedStitchAbove.getRenderAngle());

                var renderPosition =
                {
                    x: this.getRenderXPos(renderContext),
                    y: this.getRenderYPos(renderContext)
                };
                var angleOfRotation = renderedStitchAbove.getRenderAngle();
                var renderedStitch = new RenderedStitch(renderPosition, angleOfRotation, this.imgWidth, this.imgHeight, this.rowNum);
                renderContext.addRenderedStitch(this.getId(), renderedStitch);

                //update all subsequent stitches as this stitch has changed
                if (this.nextStitch != null)
                {
                    this.nextStitch.populateRenderingData(renderContext, false);
                }
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