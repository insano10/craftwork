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



        return IncreaseStitchPreRenderHelper;

    })();
});