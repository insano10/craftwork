define(["jquery", "baseStitch"], function ($, BaseStitch)
{
   return (function()
    {
        function ChainUpStitch(chainIndex, rowNum)
        {
            BaseStitch.call(this, chainIndex, "chain-up.png", 6, 13, rowNum, 8);
        }

        ChainUpStitch.prototype = Object.create(BaseStitch.prototype);
        ChainUpStitch.prototype.constructor = ChainUpStitch;

        ChainUpStitch.prototype.isAvailableForConnection = function isAvailableForConnection()
        {
            //other stitches do not connect to chain ups
            return false;
        };

        ChainUpStitch.prototype.renderRelativeTo = function renderRelativeTo()
        {
            return false;
        };

        ChainUpStitch.prototype.toString = function toString()
        {
            return "CHAIN UP [id: " + this.getId() + ", index: " + this.chainIndex + ", row: " + this.rowNum + "]";
        };

        ChainUpStitch.prototype.getType = function getType()
        {
            return "CHAIN_UP";
        };

        return ChainUpStitch;

    })();
});