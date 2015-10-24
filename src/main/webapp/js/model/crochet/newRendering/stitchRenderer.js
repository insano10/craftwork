define(["jquery", "renderingUtils"], function ($, RenderingUtils)
{
    return (function ()
    {
        function StitchRenderer()
        {

        }

        var iconsReady = function iconsReady(stitchGroup)
        {
            var stitches = stitchGroup.getStitches();
            for (var i = 0; i < stitches.length; i++)
            {
                if (!stitches[i].icon.complete)
                {
                    return false;
                }
            }
            return true;
        };

        var doRender = function doRender(canvasContext, renderContext, stitchGroup)
        {
            var renderStitchGroup = renderContext.getRenderedStitchGroupFor(stitchGroup);

            if (RenderingUtils.DEBUG_RENDER)
            {
                RenderingUtils.renderGridLines(canvasContext, renderStitchGroup);
            }

            canvasContext.save();

            canvasContext.strokeStyle = '#000000';
            console.log("drawing box: pos [" + renderStitchGroup.getXPos() + ", " + renderStitchGroup.getYPos() + "]," +
                        " width [" + renderStitchGroup.getWidth() + ", " + renderStitchGroup.getHeight() + "]");

            canvasContext.beginPath();
            canvasContext.moveTo(renderStitchGroup.getXPos(), renderStitchGroup.getYPos());
            canvasContext.lineTo(renderStitchGroup.getXPos() + renderStitchGroup.getWidth(), renderStitchGroup.getYPos());
            canvasContext.lineTo(renderStitchGroup.getXPos() + renderStitchGroup.getWidth(), renderStitchGroup.getYPos() + renderStitchGroup.getHeight());
            canvasContext.lineTo(renderStitchGroup.getXPos(), renderStitchGroup.getYPos() + renderStitchGroup.getHeight());
            canvasContext.lineTo(renderStitchGroup.getXPos(), renderStitchGroup.getYPos());
            canvasContext.stroke();

            canvasContext.restore();

            //for (var i = 0; i < stitches.length; i++)
            //{
            //    var renderedStitchGroup = renderContext.getRenderedStitchGroupFor(stitchGroup);
            //
            //    console.log("drawing stitch group at " + renderedStitchGroup.getXPos() + ", " + renderedStitchGroup.getYPos() + " at angle " + renderedStitchGroup.getRenderAngle());
            //
            //    if(RenderingUtils.DEBUG_RENDER)
            //    {
            //        RenderingUtils.renderGridLines(canvasContext, renderedStitchGroup);
            //        RenderingUtils.renderStitchRotationPoint(canvasContext, renderedStitchGroup);
            //    }
            //
            //    canvasContext.save();
            //
            //    canvasContext.translate(renderedStitch.getXRotationPoint(), renderedStitch.getYRotationPoint());
            //    canvasContext.rotate(renderedStitch.getRenderAngle() * Math.PI / 180);
            //    canvasContext.drawImage(stitches[i].icon, renderedStitch.getXRenderPointAfterTranslation(), renderedStitch.getYRenderPointAfterTranslation() - renderedStitch.getRenderYOffset());
            //
            //    canvasContext.restore();
            //}
        };

        StitchRenderer.prototype.renderStitchGroup = function renderStitchGroup(canvasContext, renderContext, stitchGroup, attempts)
        {
            if (!iconsReady(stitchGroup) && attempts < 10)
            {
                var renderer = this;
                setTimeout(function ()
                           {
                               renderer.renderStitchGroup(canvasContext, renderContext, stitchGroup, (attempts + 1));
                           }, 100);
            }
            else if (iconsReady(stitchGroup))
            {
                doRender(canvasContext, renderContext, stitchGroup);
            }
            else
            {
                console.error("failed to load icons");
            }
        };

        StitchRenderer.prototype.render = function render(canvasContext, renderContext, stitchGroup)
        {
            this.renderStitchGroup(canvasContext, renderContext, stitchGroup, 0);
        };

        return StitchRenderer;

    })();
});
