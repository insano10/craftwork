define(["jquery", "singleStitch"], function ($, SingleStitch)
{
   return (function()
    {
        function ChainUpStitch(imgFile, imgWidth, imgHeight, rowNum)
        {
            SingleStitch.call(this, imgFile, imgWidth, imgHeight, rowNum);
        }

        ChainUpStitch.prototype = Object.create(SingleStitch.prototype);
        ChainUpStitch.prototype.constructor = SingleStitch;

        ChainUpStitch.prototype.toString = function toString()
        {
            return "CHAIN UP [id: " + this.getId() + ", row: " + this.rowNum + "]";
        };

        return ChainUpStitch;

    })();
});