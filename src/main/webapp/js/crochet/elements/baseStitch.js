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

        //todo: private
        Stitch.prototype.renderConnectionLines = function renderConnectionLines(canvasContext, renderContext, renderPosition)
        {
            var self = this;
            $.each(this.stitchesBelow, function (idx, stitch)
            {
                var renderedStitch = renderContext.getRenderedStitchFor(stitch);

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

            if (this.previousStitch == null)
            {
                xPos = renderContext.getStartXPos();
            }
            else
            {
                var previousRenderInfo = renderContext.getRenderedStitchFor(this.previousStitch);

                if (this.previousStitch.rowNum < this.rowNum)
                {
                    //above previous stitch
                    xPos = previousRenderInfo.getXPos();
                }
                else if (this.rowNum % 2 != 0)
                {
                    //to the right
                    xPos = previousRenderInfo.getXPos() + this.imgWidth;
                }
                else
                {
                    //to the left
                    xPos = previousRenderInfo.getXPos() - this.imgWidth;
                }
            }

            return xPos;
        };

        Stitch.prototype.getRenderYPos = function getRenderYPos(renderContext)
        {
            var yPos = 0;

            if (this.previousStitch == null)
            {
                yPos = renderContext.getStartYPos();
            }
            else
            {
                var previousRenderInfo = renderContext.getRenderedStitchFor(this.previousStitch);

                if (this.previousStitch.getRowNum() < this.rowNum)
                {
                    //move up
                    yPos = previousRenderInfo.getYPos() - this.imgWidth;
                }
                else
                {
                    yPos = previousRenderInfo.getYPos();
                }
            }
            return yPos;
        };

        Stitch.prototype.render = function render(canvasContext, renderContext)
        {
            var renderPosition = {x: this.getRenderXPos(renderContext), y: this.getRenderYPos(renderContext)};

            this.renderIconAndConnections(canvasContext, renderContext, this.icon, 0, renderPosition);

            var renderedStitch = new RenderedStitch(renderPosition, this.imgWidth);
            renderContext.addRenderedStitch(this.getId(), renderedStitch);

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