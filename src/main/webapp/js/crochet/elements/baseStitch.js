define(["jquery", "stitchUtils", "renderedStitch"], function ($, StitchUtils, RenderedStitch)
{
    return (function ()
    {
        function Stitch(imgFile, imgWidth, imgHeight, rowNum)
        {
            this.id = StitchUtils.generateId();
            this.imgFile = imgFile;
            this.imgWidth = imgWidth;
            this.imgHeight = imgHeight;
            this.rowNum = rowNum;
            this.previousStitch = null;
            this.nextStitch = null;
            this.stitchesAbove = [];
            this.stitchesBelow = [];
            this.icon = new Image();
            this.icon.src = "../../../../images/" + this.imgFile;
        }

        var renderConnectionLines = function renderConnectionLines(canvasContext, renderContext, thisRenderedStitch, stitchesBelow)
        {
            $.each(stitchesBelow, function (idx, stitch)
            {
                var stitchBelow = renderContext.getRenderedStitchFor(stitch);

                canvasContext.beginPath();

                canvasContext.moveTo(thisRenderedStitch.getMidXPos(), thisRenderedStitch.getMidYPos());
                canvasContext.lineTo(stitchBelow.getMidXPos(), stitchBelow.getMidYPos());
                canvasContext.stroke();
            });
        };

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

        var renderIcon = function renderIcon(canvasContext, icon, renderedStitch)
        {
            console.log("drawing icon at " + renderedStitch.getXPos() + ", " + renderedStitch.getYPos() + " at angle " + renderedStitch.getRenderAngle());

            canvasContext.save();

            canvasContext.translate(renderedStitch.getXRotationPoint(), renderedStitch.getYRotationPoint());
            canvasContext.rotate(renderedStitch.getRenderAngle() * Math.PI / 180);
            canvasContext.drawImage(icon, renderedStitch.getXRenderPointAfterTranslation(), renderedStitch.getYRenderPointAfterTranslation());

            canvasContext.restore();
        };

        Stitch.prototype.renderIconAndConnections = function renderIconAndConnections(canvasContext, renderContext, icon, attempts, renderedStitch)
        {
            if (!icon.complete && attempts < 10)
            {
                var stitch = this;
                setTimeout(function ()
                {
                    stitch.renderIconAndConnections(canvasContext, renderContext, icon, (attempts + 1), renderedStitch);
                }, 100);
            }
            else if (icon.complete)
            {
                renderIcon(canvasContext, this.icon, renderedStitch);
                renderConnectionLines(canvasContext, renderContext, renderedStitch, this.stitchesBelow);
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
                else
                {
                    var xOffsetForAngle = previousRenderInfo.getXRotationLength();

                    if (this.rowNum % 2 != 0)
                    {
                        //to the right
                        xPos = previousRenderInfo.getXPos() + this.imgWidth - xOffsetForAngle;
                    }
                    else
                    {
                        //to the left
                        xPos = previousRenderInfo.getXPos() - this.imgWidth + xOffsetForAngle;
                    }
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
                    yPos = previousRenderInfo.getYPos() - this.imgHeight;
                }
                else
                {
                    var yOffsetForAngle = previousRenderInfo.getYRotationLength();
                    if (this.rowNum % 2 != 0)
                    {
                        yPos = previousRenderInfo.getYPos() + yOffsetForAngle;
                    }
                    else
                    {
                        yPos = previousRenderInfo.getYPos() - yOffsetForAngle;
                    }
                }
            }
            return yPos;
        };

        Stitch.prototype.getAngleOfRotation = function getAngleOfRotation(stitch, renderContext)
        {
            var lastStitch = stitch.getPreviousStitch();

            if (lastStitch != null)
            {
                var angle = renderContext.getRenderedStitchFor(lastStitch).getRenderAngle();

                if (lastStitch.getStitchesBelow().length > 1)
                {
                    //decrease angle by 10 degrees for each decrease
                    if (this.rowNum % 2 != 0)
                    {
                        angle -= (10 * (lastStitch.getStitchesBelow().length - 1));
                    }
                    else
                    {
                        angle += (10 * (lastStitch.getStitchesBelow().length - 1));
                    }
                    console.log("decrease detected, angle is now: " + angle);
                }
                else
                {
                    console.log("normal stitch, maintaining angle of: " + angle);
                }
                return  angle;
            }
            else
            {
                return 0;
            }
        };

        Stitch.prototype.populateRenderingData = function populateRenderingData(renderContext)
        {
            var renderPosition =
            {
                x: this.getRenderXPos(renderContext),
                y: this.getRenderYPos(renderContext)
            };
            var angleOfRotation = this.getAngleOfRotation(this, renderContext);
            var renderedStitch = new RenderedStitch(renderPosition, angleOfRotation, this.imgWidth, this.imgHeight, this.rowNum);

            renderContext.addRenderedStitch(this.getId(), renderedStitch);

            $.each(this.getStitchesBelow(), function (idx, stitch)
            {
                stitch.notifyStitchAboveRenderingDataUpdated(renderedStitch);
            });

            if (this.nextStitch != null)
            {
                this.nextStitch.populateRenderingData(renderContext);
            }
        };

        Stitch.prototype.render = function render(canvasContext, renderContext)
        {
            var renderedStitch = renderContext.getRenderedStitchFor(this);
            this.renderIconAndConnections(canvasContext, renderContext, this.icon, 0, renderedStitch);

            if (this.nextStitch != null)
            {
                this.nextStitch.render(canvasContext, renderContext);
            }
        };

        Stitch.prototype.notifyStitchAboveRenderingDataUpdated = function notifyStitchAboveRenderingDataUpdated(renderedStitchAbove)
        {
            //no op by default
        };

        Stitch.prototype.toString = function toString()
        {
            console.error("Implementation missing for toString()");
        };

        return Stitch;

    })();
});