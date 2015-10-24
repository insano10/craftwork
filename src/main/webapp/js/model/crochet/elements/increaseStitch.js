define(["jquery", "baseStitch", "increaseStitchGroup"], function ($, BaseStitch, IncreaseStitchGroup)
{
   return (function()
    {
        /*
            Increase stitch is a stitch attached to the same lower stitch as another
         */
        function IncreaseStitch(chainIndex, rowNum)
        {
            BaseStitch.call(this, chainIndex, "sc-multi.png", 13, 13, rowNum, 0);
        }

        IncreaseStitch.prototype = Object.create(BaseStitch.prototype);
        IncreaseStitch.prototype.constructor = IncreaseStitch;

        IncreaseStitch.prototype.toString = function toString()
        {
            return "INCREASE [id: " + this.getId() + ", index: " + this.chainIndex + ", row: " + this.rowNum + "]";
        };

        IncreaseStitch.prototype.getType = function getType()
        {
            return "INCREASE";
        };

        return IncreaseStitch;

    })();
});