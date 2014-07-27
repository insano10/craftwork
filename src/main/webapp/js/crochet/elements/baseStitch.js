define(["jquery"], function ($)
{
    return (function()
    {
        function Stitch(imgFile, imgWidth, rowNum)
        {
            this.imgFile = imgFile;
            this.imgWidth = imgWidth;
            this.rowNum = rowNum;
            this.previousStitch = null;
            this.nextStitch = null;
            this.stitchesAbove = [];
            this.stitchesBelow = [];
            this.icon = new Image();
            this.icon.src = "../../../../images/" + this.imgFile;
        }

        var renderIcon = function renderIcon(canvasContext, icon, xPos, yPos, attempts)
        {
            if (!icon.complete && attempts < 10)
            {
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
                console.error("failed to load icon " + this.icon.src);
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
            this.stitchesAbove.push(stitch);
        };

        Stitch.prototype.getStitchesAbove = function getStitchesAbove()
        {
            return this.stitchesAbove;
        };

        Stitch.prototype.setStitchBelow = function setStitchBelow(stitch)
        {
            this.stitchesBelow.push(stitch);
        };

        Stitch.prototype.getStitchesBelow = function getStitchesBelow()
        {
            return this.stitchesBelow;
        };

        Stitch.prototype.isAvailableForConnection = function isAvailableForConnection()
        {
            return this.stitchesAbove.length == 0;
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
            console.error("Implementation missing for toString()");
        };

        return Stitch;

    })();
});