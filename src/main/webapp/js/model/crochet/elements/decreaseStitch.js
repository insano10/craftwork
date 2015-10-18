define(["jquery", "baseStitch", "decreaseStitchGroup"], function ($, BaseStitch, DecreaseStitchGroup)
{
   return (function()
    {
        function DecreaseStitch(chainIndex, width, rowNum)
        {
            BaseStitch.call(this, chainIndex, "sc-multi.png", 13, 13, rowNum, 0);
            this.width = width;
        }

        DecreaseStitch.prototype = Object.create(BaseStitch.prototype);
        DecreaseStitch.prototype.constructor = DecreaseStitch;

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