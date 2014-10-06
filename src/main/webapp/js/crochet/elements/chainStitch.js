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

        ChainStitch.prototype.toString = function toString()
        {
            return "CHAIN [id: " + this.getId() + ", row: " + this.rowNum + "]";
        };

        return ChainStitch;

    })();
});