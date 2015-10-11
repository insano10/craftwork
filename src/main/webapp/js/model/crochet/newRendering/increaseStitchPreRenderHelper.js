define(["jquery", "stitchPreRenderHelper", "renderedStitch"], function ($, StitchPreRenderHelper, RenderedStitch)
{
    return (function ()
    {
        function IncreaseStitchPreRenderHelper()
        {
            StitchPreRenderHelper.call(this);
        }

        IncreaseStitchPreRenderHelper.prototype = Object.create(StitchPreRenderHelper.prototype);
        IncreaseStitchPreRenderHelper.prototype.constructor = IncreaseStitchPreRenderHelper;

        IncreaseStitchPreRenderHelper.prototype.getAngleOfRotation = function getAngleOfRotation(stitch, renderContext)
        {
            var lastStitch = stitch.getPreviousStitch();

            if (lastStitch != null)
            {
                var angle = renderContext.getRenderedStitchFor(lastStitch).getRenderAngle();

                if (stitch.getGroupIndex() > 0)
                {
                    if (stitch.getRowNum() % 2 != 0)
                    {
                        angle += 10;
                    }
                    else
                    {
                        angle -= 10;
                    }
                    console.log("increase detected, angle is now: " + angle);
                }
                else
                {
                    console.log("first stitch of an increase, keeping the angle at: " + angle);
                }

                return angle;
            }
            else
            {
                return 0;
            }
        };

        return IncreaseStitchPreRenderHelper;

    })();
});