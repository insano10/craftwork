define(["jquery", "baseStitch"], function ($, BaseStitch)
{
   return (function()
    {
        function SingleStitch(rowNum, renderYOffset)
        {
            BaseStitch.call(this, "sc.png", 13, 13, rowNum, renderYOffset);
        }

        SingleStitch.prototype = Object.create(BaseStitch.prototype);
        SingleStitch.prototype.constructor = SingleStitch;

        SingleStitch.prototype.toString = function toString()
        {
            return "SINGLE [id: " + this.getId() + ", row: " + this.rowNum + "]";
        };

        return SingleStitch;

    })();
});