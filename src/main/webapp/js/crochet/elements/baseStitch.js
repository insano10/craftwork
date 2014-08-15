define(["jquery", "stitchUtils"], function ($, StitchUtils)
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

        Stitch.prototype.preRender = function preRender(canvasContext, renderContext)
        {
            //leave enough space for all the connecting stitches above
            renderContext.currentRenderXPos += StitchUtils.getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(this.stitchesAbove.length, this.rowNum, this.imgWidth);
        };

        Stitch.prototype.postRender = function postRender(canvasContext, renderContext)
        {
            renderContext.currentRenderXPos += StitchUtils.getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(this.stitchesAbove.length, this.rowNum, this.imgWidth);
        };

        Stitch.prototype.renderConnectionLines = function renderConnectionLines(canvasContext, renderXPos, renderYPos, numConnections, stitchWidth)
        {
            if(numConnections > 0)
            {
                var xPos = renderXPos + (0.5 * stitchWidth);
                var yPos = renderYPos + (0.5 * stitchWidth);

                var xOffset = -(stitchWidth * numConnections/2) + (0.5 * stitchWidth);

                for(var i=0 ; i<numConnections ; i++)
                {
                    canvasContext.beginPath();

                    canvasContext.moveTo(xPos, yPos);
                    canvasContext.lineTo(xPos + xOffset, yPos + stitchWidth);
                    canvasContext.stroke();

                    xOffset += stitchWidth;
                }
            }
        };

        Stitch.prototype.renderConnectionLines = function renderConnectionLines(canvasContext, renderXPos, renderYPos, numConnections, stitchWidth)
        {
            if(numConnections > 0)
            {
                var xPos = renderXPos + (0.5 * stitchWidth);
                var yPos = renderYPos + (0.5 * stitchWidth);

                var xOffset = -(stitchWidth * numConnections/2) + (0.5 * stitchWidth);

                for(var i=0 ; i<numConnections ; i++)
                {
                    canvasContext.beginPath();

                    canvasContext.moveTo(xPos, yPos);
                    canvasContext.lineTo(xPos + xOffset, yPos + stitchWidth);
                    canvasContext.stroke();

                    xOffset += stitchWidth;
                }
            }
        };

        Stitch.prototype.renderIconAndConnections = function renderIconAndConnections(canvasContext, xPos, yPos, icon, attempts, numConnections, stitchWidth)
        {
            if (!icon.complete && attempts < 10)
            {
                var stitch = this;
                setTimeout(function ()
                {
                    stitch.renderIconAndConnections(canvasContext, xPos, yPos, icon, (attempts + 1), numConnections, stitchWidth);
                }, 100);
            }
            else if (icon.complete)
            {
                canvasContext.drawImage(icon, xPos, yPos);

                //need to wait until the image is rendered otherwise the line can get overwritten
                this.renderConnectionLines(canvasContext, xPos, yPos, numConnections, stitchWidth);
            }
            else
            {
                console.error("failed to load icon " + this.icon.src);
            }
        };

        Stitch.prototype.render = function render(canvasContext, renderContext)
        {
            this.preRender(canvasContext, renderContext);

            console.log("rendering " + this.toString() + " at " + renderContext.currentRenderXPos + ", " + renderContext.currentRenderYPos);
            this.renderIconAndConnections(canvasContext, renderContext.currentRenderXPos, renderContext.currentRenderYPos, this.icon, 0, this.stitchesBelow.length, this.imgWidth);

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

                this.postRender(canvasContext, renderContext);

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