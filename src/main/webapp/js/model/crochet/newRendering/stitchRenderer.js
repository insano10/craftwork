define(["jquery", "renderingUtils"], function ($, RenderingUtils)
{
    return (function ()
    {
        function StitchRenderer()
        {

        }

        var iconsReady = function iconsReady(stitches)
        {
            for (var i = 0; i < stitches.length; i++)
            {
                if (!stitches[i].icon.complete)
                {
                    return false;
                }
            }
            return true;
        };

        var doRender = function doRender(canvasContext, renderContext, stitches)
        {
            for (var i = 0; i < stitches.length; i++)
            {
                var renderedStitch = renderContext.getRenderedStitchFor(stitches[i]);

                console.log("drawing icon at " + renderedStitch.getXPos() + ", " + renderedStitch.getYPos() + " at angle " + renderedStitch.getRenderAngle());

                if(RenderingUtils.DEBUG_RENDER)
                {
                    RenderingUtils.renderGridLines(canvasContext, renderedStitch);
                    RenderingUtils.renderStitchRotationPoint(canvasContext, renderedStitch);
                }

                canvasContext.save();

                canvasContext.translate(renderedStitch.getXRotationPoint(), renderedStitch.getYRotationPoint());
                canvasContext.rotate(renderedStitch.getRenderAngle() * Math.PI / 180);
                canvasContext.drawImage(stitches[i].icon, renderedStitch.getXRenderPointAfterTranslation(), renderedStitch.getYRenderPointAfterTranslation() - renderedStitch.getRenderYOffset());

                canvasContext.restore();
            }
        };

        StitchRenderer.prototype.renderStitches = function renderStitches(canvasContext, renderContext, stitches, attempts)
        {
            if (!iconsReady(stitches) && attempts < 10)
            {
                var renderer = this;
                setTimeout(function ()
                           {
                               renderer.renderStitches(canvasContext, renderContext, stitches, (attempts + 1));
                           }, 100);
            }
            else if (iconsReady(stitches))
            {
                doRender(canvasContext, renderContext, stitches);
            }
            else
            {
                console.error("failed to load icons");
            }
        };

        StitchRenderer.prototype.render = function render(stitches, canvasContext, renderContext)
        {
            this.renderStitches(canvasContext, renderContext, stitches, 0);
        };

        StitchRenderer.prototype.getXPos = function getXPos(stitch, renderContext)
        {

        };

        StitchRenderer.prototype.getYPos = function getYPos(stitch, renderContext)
        {

        };

        return StitchRenderer;

    })();
});
