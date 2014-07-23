define(["jquery"], function ($)
{
    return (function()
    {
        function Stitch(name, width, imgFile, imgWidth, rowNum, firstOfAGroup)
        {
            this.name = name;
            this.width = width;
            this.imgFile = imgFile;
            this.imgWidth = imgWidth;
            this.rowNum = rowNum;
            this.firstOfAGroup = firstOfAGroup;
            this.previousStitch = null;
            this.nextStitch = null;
            this.stitchesAbove = null;
            this.stitchesBelow = null;
            this.icon = new Image();
            this.icon.src = "../../../../images/" + this.imgFile;
        }

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

        Stitch.prototype.setPreviousStitch = function setPreviousStitch(stitch)
        {
            this.previousStitch = stitch;
        };

        Stitch.prototype.getPreviousStitch = function getPreviousStitch()
        {
            return this.previousStitch;
        };

        Stitch.prototype.setStitchAbove = function setStitchAbove(stitch)
        {
            this.stitchAbove = stitch;
        };

        Stitch.prototype.isAvailableForConnection = function isAvailableForConnection()
        {
            return this.stitchAbove == null;
        };

        Stitch.prototype.isFirstOfAGroup = function isFirstOfAGroup()
        {
            return this.firstOfAGroup;
        };

        Stitch.prototype.connectToChain = function connectToChain(chainTail)
        {
            console.error("Implementation missing!");
        };

        Stitch.prototype.setNextStitch = function setNextStitch(stitch)
        {
            if (this.nextStitch == null)
            {
                this.nextStitch = stitch;
                stitch.setPreviousStitch(this);
            }
            else
            {
                console.error("Cannot connect " + stitch.toString() + " to " + this.toString() + " as it is already connected");
            }
        };

        Stitch.prototype.getRowNum = function getRowNum()
        {
            return this.rowNum;
        };

        Stitch.prototype.getWidth = function getWidth()
        {
            //should this really be exposed?
            return parseInt(this.width);
        };

        Stitch.prototype.connectStitchFromBelow = function connectStitchFromBelow(stitch)
        {
            this.stitchesBelow.push(stitch);
        };

        Stitch.prototype.connectStitchFromAbove = function connectStitchFromAbove(stitch)
        {
            this.stitchesAbove.push(stitch);
        };

        Stitch.prototype.render = function render(canvasContext, renderContext)
        {
            renderIcon(canvasContext, this.icon, renderContext.currentRenderXPos, renderContext.currentRenderYPos, 0);

            if (this.nextStitch != null)
            {
                if (this.nextStitch.getRowNum() > this.rowNum)
                {
                    renderContext.renderDirection = 'U';
                    renderContext.currentRenderYPos = renderContext.currentRenderYPos - this.imgWidth;
                }
                else if (this.nextStitch.getRowNum() == this.rowNum && this.rowNum % 2 != 0)
                {
                    renderContext.renderDirection = 'R';
                    renderContext.currentRenderXPos = renderContext.currentRenderXPos + this.imgWidth;
                }
                else if (this.nextStitch.getRowNum() == this.rowNum && this.rowNum % 2 == 0)
                {
                    renderContext.renderDirection = 'L';
                    renderContext.currentRenderXPos = renderContext.currentRenderXPos - this.imgWidth;
                }
                else
                {
                    console.error("Cannot work out render direction from " + this.toString() + " to " + this.nextStitch.toString());
                }

                this.nextStitch.render(canvasContext, renderContext);
            }
        };

        Stitch.prototype.toString = function toString()
        {
            return this.name + " [row: " + this.rowNum + "]";
        };

        return Stitch;

    })();
});