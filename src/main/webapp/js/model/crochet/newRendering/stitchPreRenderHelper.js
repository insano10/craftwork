define(["jquery", "renderedStitch"], function ($, RenderedStitch)
{
    return (function ()
    {
        var STITCH_SPACER = 5;

        function StitchPreRenderHelper()
        {

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

        StitchPreRenderHelper.prototype.getAngleOfRotation = function getAngleOfRotation(stitch, renderContext)
        {
            var lastStitch = stitch.getPreviousStitch();

            if (lastStitch != null)
            {
                var angle = renderContext.getRenderedStitchFor(lastStitch).getRenderAngle();

                if (lastStitch.getStitchesBelow().length > 1)
                {
                    //decrease angle by 10 degrees for each decrease
                    if (stitch.getRowNum() % 2 != 0)
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
                return angle;
            }
            else
            {
                return 0;
            }
        };

        StitchPreRenderHelper.prototype.calculateStartingAngle = function calculateStartingAngle(stitch, renderContext)
        {
            var renderPosition =
            {
                x: 0,
                y: 0
            };

            var angleOfRotation = this.getAngleOfRotation(stitch, renderContext);
            var renderedStitch = new RenderedStitch(renderPosition, angleOfRotation, stitch.getWidth(), stitch.getHeight(), stitch.getRowNum(), stitch.getRenderYOffset());
            renderContext.addRenderedStitch(stitch.getId(), renderedStitch);

            console.log(stitch.toString() + " has starting angle " + angleOfRotation);
        };


        StitchPreRenderHelper.prototype.calculateRelativeAngle = function calculateRelativeAngle(stitch, renderContext)
        {
            var relativeAngle = renderContext.getRenderedStitchFor(stitch).getRenderAngle();

            var stitchesAbove = stitch.getStitchesAbove();
            var stitchesBelow = stitch.getStitchesBelow();

            //ask the stitch above what angle this stich should be connected at
            if (stitchesAbove.length == 1 && stitchesBelow.length <= 1)
            {
                relativeAngle = stitchesAbove[0].getConnectionAngleFor(stitch, renderContext);

                var renderedStitch = new RenderedStitch({
                    x: 0,
                    y: 0
                }, relativeAngle, stitch.getWidth(), stitch.getHeight(), stitch.getRowNum(), stitch.getRenderYOffset());
                renderContext.addRenderedStitch(stitch.getId(), renderedStitch);
            }
            else
            {
                console.log(stitch.toString() + " is not a single stitch. Not updating relative angle");
            }

            console.log(stitch.toString() + " has relative angle " + relativeAngle);
        };


        StitchPreRenderHelper.prototype.calculatePosition = function calculatePosition(stitch, renderContext)
        {
            var renderPosition =
            {
                x: this.getRenderXPos(stitch, renderContext),
                y: this.getRenderYPos(stitch, renderContext)
            };

            var oldStitch = renderContext.getRenderedStitchFor(stitch);
            var newStitch = new RenderedStitch(renderPosition, oldStitch.getRenderAngle(), stitch.getWidth(), stitch.getHeight(), stitch.getRowNum(), stitch.getRenderYOffset());

            console.log(stitch.toString() + " is at position " + JSON.stringify(renderPosition) + " with angle " + newStitch.getRenderAngle());

            renderContext.addRenderedStitch(stitch.getId(), newStitch);
        };

        StitchPreRenderHelper.prototype.getRenderXPos = function getRenderXPos(stitch, renderContext)
        {
            var xPos = 0;
            var previousStitch = getPreviousStitchToRenderFrom(stitch);

            if (previousStitch == null)
            {
                xPos = renderContext.getStartXPos();
            }
            else
            {
                var previousRenderInfo = renderContext.getRenderedStitchFor(previousStitch);

                if (previousStitch.getRowNum() < stitch.getRowNum())
                {
                    //first stitch in the row, render above previous stitch
                    xPos = previousRenderInfo.getXPos();
                }
                else
                {
                    var xOffsetForAngle = previousRenderInfo.getXRotationLength();

                    if (stitch.getRowNum() % 2 != 0)
                    {
                        //to the right
                        xPos = previousRenderInfo.getXPos() + previousStitch.getWidth() + STITCH_SPACER - xOffsetForAngle;
                    }
                    else
                    {
                        //to the left
                        xPos = previousRenderInfo.getXPos() - stitch.getWidth() - STITCH_SPACER + xOffsetForAngle;
                    }
                }
            }

            return xPos;
        };

        StitchPreRenderHelper.prototype.getRenderYPos = function getRenderYPos(stitch, renderContext)
        {
            var yPos = 0;
            var previousStitch = getPreviousStitchToRenderFrom(stitch);

            if (previousStitch == null)
            {
                yPos = renderContext.getStartYPos();
            }
            else
            {
                var previousRenderInfo = renderContext.getRenderedStitchFor(previousStitch);

                if (previousStitch.getRowNum() < stitch.getRowNum())
                {
                    //move up
                    yPos = previousRenderInfo.getYPos() - stitch.getHeight();
                }
                else
                {
                    var yOffsetForAngle = previousRenderInfo.getYRotationLength();
                    if (stitch.getRowNum() % 2 != 0)
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


        return StitchPreRenderHelper;

    })();
});
