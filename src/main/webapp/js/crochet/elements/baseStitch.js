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
        Stitch.prototype.preRender = function preRender(canvasContext, renderContext, renderPosition)
        {
            //leave enough space for all the connecting stitches above (too simplistic?) - applies to all
            var spaceBefore = StitchUtils.getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(this.stitchesAbove.length, this.rowNum, this.imgWidth);
            renderPosition.x += spaceBefore;
            console.log("space before: " + spaceBefore);

            if (this.previousStitch != null && this.previousStitch.stitchesAbove.length > 1)
            {
                var spaceAfter = StitchUtils.getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(this.previousStitch.stitchesAbove.length, this.rowNum, this.imgWidth);
                renderPosition.x += spaceAfter;
                console.log("space after: " + spaceAfter);
            }
        };

        Stitch.prototype.renderConnectionLines = function renderConnectionLines(canvasContext, renderContext, renderPosition)
        {
            var self = this;
            $.each(this.stitchesBelow, function (idx, stitch)
            {
                var renderedStitch = renderContext.stitches[stitch.getId()];

                canvasContext.beginPath();

                canvasContext.moveTo(renderPosition.x + (0.5 * self.imgWidth), renderPosition.y + (0.5 * self.imgWidth));
                canvasContext.lineTo(renderedStitch.getMidXPos(), renderedStitch.getMidYPos());
                canvasContext.stroke();
            });
        };

        Stitch.prototype.renderIconAndConnections = function renderIconAndConnections(canvasContext, renderContext, icon, attempts, renderPosition)
        {
            if (!icon.complete && attempts < 10)
            {
                var stitch = this;
                setTimeout(function ()
                {
                    stitch.renderIconAndConnections(canvasContext, renderContext, icon, (attempts + 1), renderPosition);
                }, 100);
            }
            else if (icon.complete)
            {
                console.log("drawing icon at " + renderPosition.x + ", " + renderPosition.y);
                canvasContext.drawImage(icon, renderPosition.x, renderPosition.y);

                //need to wait until the image is rendered otherwise the line can get overwritten
                this.renderConnectionLines(canvasContext, renderContext, renderPosition);
            }
            else
            {
                console.error("failed to load icon " + this.icon.src);
            }
        };

        Stitch.prototype.getRenderXPos = function getRenderXPos(renderContext)
        {
            var xPos = 0;

            if (this.rowNum == 1)
            {
                if (this.previousStitch != null)
                {
                    var previousRenderInfo = renderContext.stitches[this.previousStitch.getId()];

                    xPos = previousRenderInfo.getXPos() + this.imgWidth;
                }
                else
                {
                    xPos = renderContext.startRenderXPos;
                }
            }
            else
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

                xPos = minXPos + (maxXPos - minXPos) / 2;
            }
            return xPos;
        };

        Stitch.prototype.getRenderYPos = function getRenderYPos(renderContext)
        {
            var yPos = 0;

            if (this.previousStitch != null)
            {
                var previousRenderInfo = renderContext.stitches[this.previousStitch.getId()];

                if (this.previousStitch.getRowNum() < this.rowNum)
                {
                    //UP
                    yPos = previousRenderInfo.getYPos() - this.imgWidth;
                }
                else
                {
                    yPos = previousRenderInfo.getYPos();
                }
            }
            else
            {
                yPos = renderContext.startRenderYPos;
            }
            return yPos;
        };

        Stitch.prototype.render = function render(canvasContext, renderContext)
        {
            var renderPosition = {x: this.getRenderXPos(renderContext), y: this.getRenderYPos(renderContext)};

            console.log("renderX is currently " + renderPosition.x);
            this.preRender(canvasContext, renderContext, renderPosition);
            console.log("renderX is now " + renderPosition.x);
            this.renderIconAndConnections(canvasContext, renderContext, this.icon, 0, renderPosition);

            var renderedStitch = new RenderedStitch(renderPosition, this.imgWidth);

            //todo: encapsulate this in context (make object instead of struct?)
            renderContext.stitches[this.getId()] = renderedStitch;
            renderContext.lastRenderedStitch = renderedStitch;

            if (this.nextStitch != null)
            {
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