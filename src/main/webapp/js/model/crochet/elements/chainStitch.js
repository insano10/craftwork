define(["jquery", "baseStitch", "renderedStitch"], function ($, BaseStitch, RenderedStitch)
{
   return (function()
    {
        function ChainStitch(chainIndex, rowNum)
        {
            BaseStitch.call(this, chainIndex, "chain.png", 13, 6, rowNum, 0);
        }

        ChainStitch.prototype = Object.create(BaseStitch.prototype);
        ChainStitch.prototype.constructor = ChainStitch;

        ChainStitch.prototype.toString = function toString()
        {
            return "CHAIN [id: " + this.getId() + ", index: " + this.chainIndex + ", row: " + this.rowNum + "]";
        };

        ChainStitch.prototype.getType = function getType()
        {
            return "CHAIN";
        };

        return ChainStitch;

    })();
});