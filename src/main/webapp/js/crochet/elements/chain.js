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

        this.render = function render(canvasContext, renderContext)
        {
            renderIcon(canvasContext, icon, renderContext.currentRenderXPos, renderContext.currentRenderYPos, 0);

            if (renderContext.renderDirection == 'R')
            {
                renderContext.currentRenderXPos = renderContext.currentRenderXPos + ICON_SIZE;
            }
            if (renderContext.renderDirection == 'L')
            {
                renderContext.currentRenderXPos = renderContext.currentRenderXPos - ICON_SIZE;
            }
            if (renderContext.renderDirection == 'U')
            {
                renderContext.currentRenderYPos = renderContext.currentRenderYPos - ICON_SIZE;
            }
            if (renderContext.renderDirection == 'D')
            {
                renderContext.currentRenderYPos = renderContext.currentRenderYPos + ICON_SIZE;
            }
        };

        this.toString = function toString()
        {
            return "CHAIN";
        };
    }

    return Chain;
});