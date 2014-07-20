define(["jquery"], function ($)
{
    function Stitch(name, width, imgFile, imgWidth)
    {
        var stitchesAbove = [];
        var stitchesBelow = [];

        var ICON_SIZE = imgWidth;
        var icon = null;

        (function constructor()
        {
            icon = new Image();
            icon.src = "../../../../images/" + imgFile;
        })();

        var renderIcon = function renderIcon(canvasContext, icon, xPos, yPos, attempts)
        {
            if (!icon.complete && attempts < 10)
            {
                console.log(name + " not loaded yet, trying again in 100ms");
                setTimeout(function ()
                {
                    renderIcon(canvasContext, icon, xPos, yPos, (attempts + 1));
                }, 100);
            }
            else if (icon.complete)
            {
                canvasContext.drawImage(icon, xPos, yPos);
            }
            else
            {
                console.error("failed to load icon for " + name);
            }
        };

        this.getWidth = function getWidth()
        {
            //should this really be exposed?
            return parseInt(width);
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
            return name;
        };
    }

    return Stitch;
});