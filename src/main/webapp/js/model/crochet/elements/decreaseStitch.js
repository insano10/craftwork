define(["jquery", "baseStitch", "decreaseStitchGroup"], function ($, BaseStitch, DecreaseStitchGroup)
{
   return (function()
    {
        function DecreaseStitch(chainIndex, width, rowNum)
        {
            BaseStitch.call(this, chainIndex, "sc.png", 13, 13, rowNum, 0);
            this.width = width;
        }

        DecreaseStitch.prototype = Object.create(BaseStitch.prototype);
        DecreaseStitch.prototype.constructor = DecreaseStitch;

        DecreaseStitch.prototype.getConnectionAngleFor = function getConnectionAngleFor(stitchBelow, renderContext)
        {
            var baseAngle = renderContext.getRenderedStitchFor(this).getRenderAngle();

            console.log("Searching for " + stitchBelow.toString());
            $.each(this.getStitchesBelow(), function(idx, stitch) {

                if(stitch === stitchBelow)
                {
                    console.log("Matched with " + stitch.toString());
                    baseAngle += (10 * idx);
                }
            });

            return baseAngle;
        };

        DecreaseStitch.prototype.toString = function toString()
        {
            return "DECREASE [id: " + this.getId() + ", index: " + this.chainIndex + ", row: " + this.rowNum + "]";
        };

        DecreaseStitch.prototype.getType = function getType()
        {
            return "DECREASE";
        };

        DecreaseStitch.prototype.createStitchGroup = function createStitchGroup()
        {
            return new DecreaseStitchGroup(this.rowNum, this.width);
        };

        return DecreaseStitch;

    })();
});