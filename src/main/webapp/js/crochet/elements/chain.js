define(["jquery"], function ($)
{
    function Chain()
    {
        var stitchesAbove = [];
        var stitchesBelow = [];

        var ICON_SIZE = 13;
        var icon = null;

        (function constructor()
        {
            icon = new Image();
            icon.src = "../../../../images/chain.png";
        })();

        var getXOffset = function getXOffset()
        {
            return 50;
        };

        var getYOffset = function getYOffset()
        {
            return 10;
        };

        this.connectStitchFromBelow = function connectStitchFromBelow(stitch)
        {
            stitchesBelow.push(stitch);
        };

        this.connectStitchFromAbove = function connectStitchFromAbove(stitch)
        {
            stitchesAbove.push(stitch);
        };

        this.render = function render(canvasContext, rowNum, rowIndex, maxYPos)
        {
            var xpos = rowIndex * ICON_SIZE + getXOffset();
            var ypos = maxYPos - rowNum * ICON_SIZE - getYOffset();

            canvasContext.drawImage(icon, xpos, ypos);
        };

        this.toString = function toString()
        {
            return "CHAIN";
        };
    }

    return Chain;
});