define(["jquery", "stitchRenderer"], function ($, StitchRenderer)
{
    return (function ()
    {
        function IncreaseStitchRenderer(stitches)
        {
            StitchRenderer.call(this, stitches);
        }

        IncreaseStitchRenderer.prototype = Object.create(StitchRenderer.prototype);
        IncreaseStitchRenderer.prototype.constructor = IncreaseStitchRenderer;

        return IncreaseStitchRenderer;

    })();
});


