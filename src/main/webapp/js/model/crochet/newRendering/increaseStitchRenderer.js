define(["jquery", "stitchRenderer"], function ($, StitchRenderer)
{
    return (function ()
    {
        function IncreaseStitchRenderer()
        {
            StitchRenderer.call(this);
        }

        IncreaseStitchRenderer.prototype = Object.create(StitchRenderer.prototype);
        IncreaseStitchRenderer.prototype.constructor = IncreaseStitchRenderer;

        return IncreaseStitchRenderer;

    })();
});


