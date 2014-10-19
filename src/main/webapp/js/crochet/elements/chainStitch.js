define(["jquery", "baseStitch", "renderedStitch"], function ($, BaseStitch, RenderedStitch)
{
   return (function()
    {
        function ChainStitch(rowNum)
        {
            BaseStitch.call(this, "chain.png", 13, 6, rowNum, 0);
        }

        ChainStitch.prototype = Object.create(BaseStitch.prototype);
        ChainStitch.prototype.constructor = ChainStitch;

        ChainStitch.prototype.notifyStitchAboveRenderingDataUpdated = function notifyStitchAboveRenderingDataUpdated(renderedStitchAbove, renderContext)
        {
            if(renderedStitchAbove.getRenderAngle() != 0)
            {
                console.log(this.toString() + " is going to be modified as angle above is " + renderedStitchAbove.getRenderAngle());

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
                console.log(this.toString() + " is going to be left alone as angle above is 0");
            }
        };

        ChainStitch.prototype.toString = function toString()
        {
            return "CHAIN [id: " + this.getId() + ", row: " + this.rowNum + "]";
        };

        return ChainStitch;

    })();
});