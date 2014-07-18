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

        var renderIcon = function renderIcon(canvasContext, icon, xPos, yPos, attempts)
        {
            if(!icon.complete && attempts < 10)
            {
                console.log("chain not loaded yet, trying again in 100ms");
                setTimeout(function()
                {
                    renderIcon(canvasContext, icon, xPos, yPos, (attempts+1));
                }, 100);
            }
            else if(icon.complete)
            {
                canvasContext.drawImage(icon, xPos, yPos);
            }
            else
            {
                console.error("failed to load icon for chain");
            }
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

            renderIcon(canvasContext, icon, xpos, ypos, 0);
        };

        this.toString = function toString()
        {
            return "CHAIN";
        };
    }

    return Chain;
});