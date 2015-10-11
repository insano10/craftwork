define(["jquery", "stitchUtils", "renderedStitch"], function ($, StitchUtils, RenderedStitch)
{
    return (function ()
    {
        function Stitch(chainIndex, imgFile, imgWidth, imgHeight, rowNum, renderYOffset)
        {
            this.chainIndex = chainIndex;
            this.id = StitchUtils.generateId();
            this.imgFile = imgFile;
            this.imgWidth = imgWidth;
            this.imgHeight = imgHeight;
            this.rowNum = rowNum;
            this.renderYOffset = renderYOffset;
            this.previousStitch = null;
            this.nextStitch = null;
            this.stitchesAbove = [];
            this.stitchesBelow = [];
            this.icon = new Image();
            this.icon.src = "../../../../images/" + this.imgFile;
        }

        var getPreviousStitchToRenderFrom = function getPreviousStitchToRenderFrom(startingStitch)
        {
            var stitch = startingStitch.getPreviousStitch();

            while(stitch != null)
            {
                if(stitch.renderRelativeTo())
                {
                    break;
                }
                stitch = stitch.getPreviousStitch();
            }
            return stitch;
        };

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

        var renderIcon = function renderIcon(canvasContext, icon, renderedStitch)
        {
            console.log("drawing icon at " + renderedStitch.getXPos() + ", " + renderedStitch.getYPos() + " at angle " + renderedStitch.getRenderAngle());

            canvasContext.save();

            canvasContext.translate(renderedStitch.getXRotationPoint(), renderedStitch.getYRotationPoint());
            canvasContext.rotate(renderedStitch.getRenderAngle() * Math.PI / 180);
            canvasContext.drawImage(icon, renderedStitch.getXRenderPointAfterTranslation(), renderedStitch.getYRenderPointAfterTranslation() - renderedStitch.getRenderYOffset());

            //circle shows the rotation point of the stitch
            //canvasContext.beginPath();
            //canvasContext.arc(0, 0, 2, 0, 2 * Math.PI, false);
            //canvasContext.fillStyle = 'green';
            //canvasContext.fill();
            //canvasContext.lineWidth = 1;
            //canvasContext.strokeStyle = '#003300';
            //canvasContext.stroke();

            canvasContext.restore();
        };


        Stitch.prototype.getId = function getId()
        {
            return this.id;
        };

        Stitch.prototype.getType = function getType()
        {
            throw "getType must be implemented in concrete stitch implementation";
        };

        Stitch.prototype.renderRelativeTo = function renderRelativeTo()
        {
            return true;
        };

        Stitch.prototype.getWidth = function getWidth()
        {
            return this.imgWidth;
        };

        Stitch.prototype.getHeight = function getHeight()
        {
            return this.imgHeight;
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

        Stitch.prototype.connectToRowBelow = function connectToRowBelow(chainTail)
        {
            var candidateStitch = chainTail;

            while(candidateStitch != null)
            {
                if(this.rowNum > candidateStitch.getRowNum())
                {
                    //row below this stitch
                    if(candidateStitch.isAvailableForConnection())
                    {
                        console.log("Connecting stitch " + this.toString() + " to stitch " + candidateStitch.toString());
                        candidateStitch.setStitchAbove(this);
                        this.setStitchBelow(candidateStitch);
                        break;
                    }
                    else
                    {
                        console.log("not free, continuing");
                    }
                }
                candidateStitch = candidateStitch.getPreviousStitch();
            }

            if(candidateStitch == null && this.rowNum > 1)
            {
                console.error("Could not find connecting stitch for " + this.toString());
            }
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

        //todo: either have each stitch chain to the next internally OR expose getter, not both
        Stitch.prototype.getNextStitch = function getNextStitch()
        {
            return this.nextStitch;
        };

        Stitch.prototype.getIcon = function getIcon()
        {
            return this.icon;
        };

        Stitch.prototype.getRowNum = function getRowNum()
        {
            return this.rowNum;
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
                //renderConnectionLines(canvasContext, renderContext, renderedStitch, this.stitchesBelow);
            }
            else
            {
                console.error("failed to load icon " + this.icon.src);
            }
        };

        Stitch.prototype.getRenderXPos = function getRenderXPos(renderContext)
        {
            var xPos = 0;
            var previousStitch = getPreviousStitchToRenderFrom(this);

            if (previousStitch == null)
            {
                xPos = renderContext.getStartXPos();
            }
            else
            {
                var previousRenderInfo = renderContext.getRenderedStitchFor(previousStitch);

                if (previousStitch.rowNum < this.rowNum)
                {
                    //first stitch in the row, render above previous stitch
                    xPos = previousRenderInfo.getXPos();
                }
                else
                {
                    var xOffsetForAngle = previousRenderInfo.getXRotationLength();

                    if (this.rowNum % 2 != 0)
                    {
                        //to the right
                        xPos = previousRenderInfo.getXPos() + previousStitch.getWidth() - xOffsetForAngle;
                    }
                    else
                    {
                        //to the left
                        xPos = previousRenderInfo.getXPos() - this.getWidth() + xOffsetForAngle;
                    }
                }
            }

            return xPos;
        };

        Stitch.prototype.getRenderYPos = function getRenderYPos(renderContext)
        {
            var yPos = 0;
            var previousStitch = getPreviousStitchToRenderFrom(this);

            if (previousStitch == null)
            {
                yPos = renderContext.getStartYPos();
            }
            else
            {
                var previousRenderInfo = renderContext.getRenderedStitchFor(previousStitch);

                if (previousStitch.getRowNum() < this.rowNum)
                {
                    //move up
                    yPos = previousRenderInfo.getYPos() - this.imgHeight;
                }
                else
                {
                    var yOffsetForAngle = previousRenderInfo.getYRotationLength();
                    if (this.rowNum % 2 != 0)
                    {
                        //to the right, angle up
                        yPos = previousRenderInfo.getYPos() + yOffsetForAngle;
                    }
                    else
                    {
                        //to the left, angle down
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
                        //to the right
                        angle -= (10 * (lastStitch.getStitchesBelow().length - 1));
                    }
                    else
                    {
                        //to the left
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

        Stitch.prototype.populateRenderingData = function populateRenderingData(renderContext, notifyStitchesBelow)
        {
            var renderPosition =
            {
                x: this.getRenderXPos(renderContext),
                y: this.getRenderYPos(renderContext)
            };

            var angleOfRotation = this.getAngleOfRotation(this, renderContext);
            var renderedStitch = new RenderedStitch(renderPosition, angleOfRotation, this.imgWidth, this.imgHeight, this.rowNum, this.renderYOffset);

            console.log(this.toString() + " is at position " + JSON.stringify(renderPosition) + " with angle " + angleOfRotation);

            renderContext.addRenderedStitch(this.getId(), renderedStitch);

            if (notifyStitchesBelow)
            {
                $.each(this.getStitchesBelow(), function (idx, stitch)
                {
                    stitch.notifyStitchAboveRenderingDataUpdated(renderedStitch, renderContext);
                });
            }

            if (this.nextStitch != null)
            {
                this.nextStitch.populateRenderingData(renderContext, notifyStitchesBelow);
            }
        };

        Stitch.prototype.calculateStartingAngle = function calculateStartingAngle(renderContext)
        {
            var renderPosition =
            {
                x: 0,
                y: 0
            };

            var angleOfRotation = this.getAngleOfRotation(this, renderContext);
            var renderedStitch = new RenderedStitch(renderPosition, angleOfRotation, this.imgWidth, this.imgHeight, this.rowNum, this.renderYOffset);
            renderContext.addRenderedStitch(this.getId(), renderedStitch);

            console.log(this.toString() + " has starting angle " + angleOfRotation);

            if (this.nextStitch != null)
            {
                this.nextStitch.calculateStartingAngle(renderContext);
            }
        };

        Stitch.prototype.calculateRelativeAngle = function calculateRelativeAngle(renderContext)
        {
            var relativeAngle = renderContext.getRenderedStitchFor(this).getRenderAngle();

            var stitchesAbove = this.getStitchesAbove();
            var stitchesBelow = this.getStitchesBelow();

            //ask the stitch above what angle this stich should be connected at
            if(stitchesAbove.length == 1 && stitchesBelow.length <= 1)
            {
                relativeAngle = stitchesAbove[0].getConnectionAngleFor(this, renderContext);

                var renderedStitch = new RenderedStitch({x:0,y:0}, relativeAngle, this.imgWidth, this.imgHeight, this.rowNum, this.renderYOffset);
                renderContext.addRenderedStitch(this.getId(), renderedStitch);
            }
            else
            {
                console.log(this.toString() + " is not a single stitch. Not updating relative angle");
            }

            console.log(this.toString() + " has relative angle " + relativeAngle);

            if (this.nextStitch != null)
            {
                this.nextStitch.calculateRelativeAngle(renderContext);
            }
        };

        Stitch.prototype.calculatePosition = function calculatePosition(renderContext)
        {
            var renderPosition =
            {
                x: this.getRenderXPos(renderContext),
                y: this.getRenderYPos(renderContext)
            };

            var oldMe = renderContext.getRenderedStitchFor(this);
            var newMe = new RenderedStitch(renderPosition, oldMe.getRenderAngle(), this.imgWidth, this.imgHeight, this.rowNum, this.renderYOffset);

            console.log(this.toString() + " is at position " + JSON.stringify(renderPosition) + " with angle " + newMe.getRenderAngle());

            renderContext.addRenderedStitch(this.getId(), newMe);

            if (this.nextStitch != null)
            {
                this.nextStitch.calculatePosition(renderContext);
            }
        };

        Stitch.prototype.render = function render(canvasContext, renderContext)
        {
            var renderedStitch = renderContext.getRenderedStitchFor(this);
            this.renderIconAndConnections(canvasContext, renderContext, this.icon, 0, renderedStitch);
        };

        Stitch.prototype.notifyStitchAboveRenderingDataUpdated = function notifyStitchAboveRenderingDataUpdated(renderedStitchAbove, renderContext)
        {
            //no-op
        };

        Stitch.prototype.getConnectionAngleFor = function getConnectionAngleFor(stitchBelow, renderContext)
        {
            //connect using the angle of this stitch
            return renderContext.getRenderedStitchFor(this).getRenderAngle();
        };

        Stitch.prototype.toString = function toString()
        {
            console.error("Implementation missing for toString()");
        };

        return Stitch;

    })();
});