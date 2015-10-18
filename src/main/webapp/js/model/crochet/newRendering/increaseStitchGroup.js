define(["jquery", "stitchGroup", "increaseStitchRenderer", "increaseStitchPreRenderHelper"], function ($, StitchGroup, IncreaseStitchRenderer, IncreaseStitchPreRenderHelper)
{
    return (function ()
    {
        function IncreaseStitchGroup()
        {
            StitchGroup.call(this);

            this.renderer = new IncreaseStitchRenderer();
            this.preRenderHelper = new IncreaseStitchPreRenderHelper();
        }

        IncreaseStitchGroup.prototype = Object.create(StitchGroup.prototype);
        IncreaseStitchGroup.prototype.constructor = IncreaseStitchGroup;


        IncreaseStitchGroup.prototype.accept = function accept(stitch)
        {
            //only accept increase stitches
            return stitch.getType() == "INCREASE";
        };

        return IncreaseStitchGroup;

    })();
});


