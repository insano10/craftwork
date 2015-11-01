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

            console.log("row: " + renderStitchGroup.getRowNum() + " - translating to [" + renderStitchGroup.getXRotationPoint() + ", " + renderStitchGroup.getYRotationPoint() + "]");

            canvasContext.translate(renderStitchGroup.getXRotationPoint(), renderStitchGroup.getYRotationPoint());
            canvasContext.rotate(renderStitchGroup.getRenderAngle() * Math.PI / 180);


            var startX = renderStitchGroup.getXRenderPointAfterTranslation();
            var startY = renderStitchGroup.getYRenderPointAfterTranslation() - renderStitchGroup.getRenderYOffset();

            console.log("drawing box: pos [" + startX + ", " + startY + "]," +
                        " width [" + renderStitchGroup.getWidth() + ", " + renderStitchGroup.getHeight() + "] at angle [" + renderStitchGroup.getRenderAngle() + "]");

            drawLine(canvasContext,
                     startX, startY,
                     startX + renderStitchGroup.getWidth(), startY, '#000000');

            drawLine(canvasContext,
                     startX + renderStitchGroup.getWidth(), startY,
                     startX + renderStitchGroup.getWidth(), startY + renderStitchGroup.getHeight(), '#FF0000');

            drawLine(canvasContext,
                     startX + renderStitchGroup.getWidth(), startY + renderStitchGroup.getHeight(),
                     startX, startY + renderStitchGroup.getHeight(), '#00FF00');

            drawLine(canvasContext,
                     startX, startY + renderStitchGroup.getHeight(),
                     startX, startY, '#0000FF');

            canvasContext.restore();
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

        var drawLine = function drawLine(canvasContext, x1, y1, x2, y2, colour)
        {
            canvasContext.strokeStyle = colour;
            canvasContext.beginPath();
            canvasContext.moveTo(x1, y1);
            canvasContext.lineTo(x2, y2);
            canvasContext.stroke();
        };

        return StitchRenderer;

    })();
});
