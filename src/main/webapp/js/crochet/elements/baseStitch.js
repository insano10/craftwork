define(["jquery", "stitchUtils", "renderedStitch"], function ($, StitchUtils, RenderedStitch)
{
    return (function ()
    {
        function Stitch(imgFile, imgWidth, rowNum)
        {
            this.id = StitchUtils.generateId();
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

        Stitch.prototype.getId = function getId()
        {
            return this.id;
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

        //todo: make private
        Stitch.prototype.preRender = function preRender(canvasContext, renderContext)
        {
            //leave enough space for all the connecting stitches above (too simplistic?) - applies to all
            renderContext.currentRenderXPos += StitchUtils.getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(this.stitchesAbove.length, this.rowNum, this.imgWidth);


            //applies to single and decrease
            if (this.getStitchesBelow().length > 0)
            {
                //centre the stitch above stitches below
                var self = this;
                var minXPos = -1;
                var maxXPos = -1;
                $.each(this.getStitchesBelow(), function (idx, stitch)
                {
                    var renderedStitch = renderContext.stitches[stitch.getId()];

                    if (minXPos == -1 || renderedStitch.getXPos() < minXPos)
                    {
                        minXPos = renderedStitch.getXPos();
                    }
                    if (maxXPos == -1 || renderedStitch.getXPos() > maxXPos)
                    {
                        maxXPos = renderedStitch.getXPos();
                    }
                });
                console.log(self.toString() + "is sitting between x coordinates " + minXPos + " and " + maxXPos);


                renderContext.currentRenderXPos = minXPos + (maxXPos - minXPos) / 2;
            }
        };

        //todo: make private
        Stitch.prototype.postRender = function postRender(canvasContext, renderContext)
        {
            //leave enough space for all the connecting stitches above
            renderContext.currentRenderXPos += StitchUtils.getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(this.stitchesAbove.length, this.rowNum, this.imgWidth);
        };

        Stitch.prototype.renderConnectionLines = function renderConnectionLines(canvasContext, renderContext)
        {
            var xPos = renderContext.currentRenderXPos;
            var yPos = renderContext.currentRenderYPos;

            $.each(this.stitchesBelow, function(idx, stitch)
            {
                var renderedStitch = renderContext.stitches[stitch.getId()];

                canvasContext.beginPath();

                canvasContext.moveTo(xPos, yPos);
                canvasContext.lineTo(renderedStitch.getMidXPos(), renderedStitch.getMidYPos());
                canvasContext.stroke();
            });
        };

        Stitch.prototype.renderIconAndConnections = function renderIconAndConnections(canvasContext, renderContext, icon, attempts)
        {
            if (!icon.complete && attempts < 10)
            {
                var stitch = this;
                setTimeout(function ()
                {
                    stitch.renderIconAndConnections(canvasContext, renderContext, icon, (attempts + 1));
                }, 100);
            }
            else if (icon.complete)
            {
                console.log("drawing icon at " + renderContext.currentRenderXPos + ", " + renderContext.currentRenderYPos);
                canvasContext.drawImage(icon, renderContext.currentRenderXPos, renderContext.currentRenderYPos);

                //need to wait until the image is rendered otherwise the line can get overwritten
                this.renderConnectionLines(canvasContext, renderContext);
            }
            else
            {
                console.error("failed to load icon " + this.icon.src);
            }
        };

        Stitch.prototype.render = function render(canvasContext, renderContext)
        {
            this.preRender(canvasContext, renderContext);
            this.renderIconAndConnections(canvasContext, renderContext, this.icon, 0);
            renderContext.stitches[this.getId()] = new RenderedStitch(renderContext.currentRenderXPos, renderContext.currentRenderYPos, this.imgWidth);

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