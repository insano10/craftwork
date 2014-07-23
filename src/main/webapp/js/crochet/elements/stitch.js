define(["jquery"], function ($)
{
    function Stitch(name, width, imgFile, imgWidth, rowNum, chainConnector, firstOfAGroup)
    {
        var previousStitch = null;
        var nextStitch = null;
        var stitchAbove = null;

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

        this.setPreviousStitch = function setPreviousStitch(stitch)
        {
            previousStitch = stitch;
        };

        this.getPreviousStitch = function getPreviousStitch()
        {
            return previousStitch;
        };

        this.setStitchAbove = function setStitchAbove(stitch)
        {
            stitchAbove = stitch;
        };

        this.isAvailableForConnection = function isAvailableForConnection()
        {
            return stitchAbove == null;
        };

        this.isFirstOfAGroup = function isFirstOfAGroup()
        {
            return firstOfAGroup;
        };

        this.connectToChain = function connectToChain(chainTail)
        {
            chainConnector(this, chainTail);
        };

        this.setNextStitch = function setNextStitch(stitch)
        {
            if (nextStitch == null)
            {
                nextStitch = stitch;
                stitch.setPreviousStitch(this);
            }
            else
            {
                console.error("Cannot connect " + stitch.toString() + " to " + this.toString() + " as it is already connected");
            }
        };

        this.getRowNum = function getRowNum()
        {
            return rowNum;
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

            if (nextStitch != null)
            {
                if (nextStitch.getRowNum() > rowNum)
                {
                    renderContext.renderDirection = 'U';
                    renderContext.currentRenderYPos = renderContext.currentRenderYPos - ICON_SIZE;
                }
                else if (nextStitch.getRowNum() == rowNum && rowNum % 2 != 0)
                {
                    renderContext.renderDirection = 'R';
                    renderContext.currentRenderXPos = renderContext.currentRenderXPos + ICON_SIZE;
                }
                else if (nextStitch.getRowNum() == rowNum && rowNum % 2 == 0)
                {
                    renderContext.renderDirection = 'L';
                    renderContext.currentRenderXPos = renderContext.currentRenderXPos - ICON_SIZE;
                }
                else
                {
                    console.error("Cannot work out render direction from " + this.toString() + " to " + nextStitch.toString());
                }

                nextStitch.render(canvasContext, renderContext);
            }
        };

        this.toString = function toString()
        {
            return name + " [row: " + rowNum + "]";
        };
    }

    return Stitch;
});