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

        ChainUpStitch.prototype.isAvailableForConnection = function isAvailableForConnection()
        {
            //other stitches do not connect to chain ups
            return false;
        };

        ChainUpStitch.prototype.connectToRowBelow = function connectToRowBelow(chainTail)
        {
            //no op
            //chain up does not count towards connections in the mesh and are only a means of
            //extending upwards at the end of a row
        };

        ChainUpStitch.prototype.toString = function toString()
        {
            return "CHAIN UP [id: " + this.getId() + ", row: " + this.rowNum + "]";
        };

        return ChainUpStitch;

    })();
});