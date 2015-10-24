define(["jquery", "renderedStitch", "renderedStitchGroup", "renderingUtils"], function ($, RenderedStitch, RenderedStitchGroup, RenderingUtils)
{
    return (function ()
    {
        function StitchPreRenderHelper()
        {

        }

        var getPreviousStitchGroupToRenderFrom = function getPreviousStitchGroupToRenderFrom(startingStitchGroup)
        {
            var group = startingStitchGroup.getPreviousGroup();

            while (group != null)
            {
                if (group.renderRelativeTo())
                {
                    break;
                }
                group = group.getPreviousGroup();
            }
            return group;
        };

        StitchPreRenderHelper.prototype.calculatePosition = function calculatePosition(stitchGroup, renderContext)
        {
            var renderPosition =
            {
                x: this.getRenderXPos(stitchGroup, renderContext),
                y: this.getRenderYPos(stitchGroup, renderContext)
            };

            var oldStitchGroup = renderContext.getRenderedStitchGroupFor(stitchGroup);
            var newStitchGroup = new RenderedStitchGroup(renderPosition, oldStitchGroup.getRenderAngle(), stitchGroup.getWidth(), stitchGroup.getHeight(), stitchGroup.getRowNum(), stitchGroup.getYOffset());

            console.log(stitchGroup.toString() + " is at position " + JSON.stringify(renderPosition) + " with angle " + newStitchGroup.getRenderAngle());

            renderContext.addRenderedStitchGroup(stitchGroup.getId(), newStitchGroup);
        };

        StitchPreRenderHelper.prototype.getRenderXPos = function getRenderXPos(stitchGroup, renderContext)
        {
            var xPos = 0;
            var previousStitchGroup = getPreviousStitchGroupToRenderFrom(stitchGroup);

            if (previousStitchGroup == null)
            {
                xPos = renderContext.getStartXPos();
            }
            else
            {
                var previousRenderInfo = renderContext.getRenderedStitchGroupFor(previousStitchGroup);

                if (previousStitchGroup.getRowNum() < stitchGroup.getRowNum())
                {
                    //first stitch group in the row, render above previous stitch (taking into account the difference in width between the 2 stitches)
                    xPos = previousRenderInfo.getXPos() + previousRenderInfo.getWidth() - stitchGroup.getWidth();
                }
                else
                {
                    //var xOffsetForAngle = previousRenderInfo.getXRotationLength();

                    if (stitchGroup.getRowNum() % 2 != 0)
                    {
                        //to the right
                        xPos = previousRenderInfo.getXPos() + previousStitchGroup.getWidth() + RenderingUtils.HORIZONTAL_STITCH_GROUP_SPACER;// - xOffsetForAngle;
                    }
                    else
                    {
                        //to the left
                        xPos = previousRenderInfo.getXPos() - stitchGroup.getWidth() - RenderingUtils.HORIZONTAL_STITCH_GROUP_SPACER;// + xOffsetForAngle;
                    }
                }
            }

            return xPos;
        };

        StitchPreRenderHelper.prototype.getRenderYPos = function getRenderYPos(stitchGroup, renderContext)
        {
            var yPos = 0;
            var previousStitchGroup = getPreviousStitchGroupToRenderFrom(stitchGroup);

            if (previousStitchGroup == null)
            {
                yPos = renderContext.getStartYPos();
            }
            else
            {
                var previousRenderInfo = renderContext.getRenderedStitchGroupFor(previousStitchGroup);

                if (previousStitchGroup.getRowNum() < stitchGroup.getRowNum())
                {
                    //move up
                    yPos = previousRenderInfo.getYPos() - stitchGroup.getHeight() - RenderingUtils.VERTICAL_STITCH_GROUP_SPACER;
                }
                else
                {
                    //var yOffsetForAngle = previousRenderInfo.getYRotationLength();
                    if (stitchGroup.getRowNum() % 2 != 0)
                    {
                        //to the right, angle up
                        yPos = previousRenderInfo.getYPos();// + yOffsetForAngle;
                    }
                    else
                    {
                        //to the left, angle down
                        yPos = previousRenderInfo.getYPos();// - yOffsetForAngle;
                    }
                }
            }
            return yPos;
        };


        return StitchPreRenderHelper;

    })();
});
