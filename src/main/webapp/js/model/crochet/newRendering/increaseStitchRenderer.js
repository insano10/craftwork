define(["jquery"], function ($)
{
    function IncreaseStitchRenderer(stitches)
    {
        this.stitches = stitches;

        var renderIcon = function renderIcon(canvasContext, icon, renderedStitch)
        {
            console.log("drawing icon at " + renderedStitch.getXPos() + ", " + renderedStitch.getYPos() + " at angle " + renderedStitch.getRenderAngle());

            canvasContext.save();

            canvasContext.translate(renderedStitch.getXRotationPoint(), renderedStitch.getYRotationPoint());
            canvasContext.rotate(renderedStitch.getRenderAngle() * Math.PI / 180);
            canvasContext.drawImage(icon, renderedStitch.getXRenderPointAfterTranslation(), renderedStitch.getYRenderPointAfterTranslation() - renderedStitch.getRenderYOffset());

            canvasContext.restore();
        };

        this.renderIconAndConnections = function renderIconAndConnections(canvasContext, renderContext, icon, attempts, renderedStitch)
        {
            if (!icon.complete && attempts < 10)
            {
                var renderer = this;
                setTimeout(function ()
                           {
                               renderer.renderIconAndConnections(canvasContext, renderContext, icon, (attempts + 1), renderedStitch);
                           }, 100);
            }
            else if (icon.complete)
            {
                renderIcon(canvasContext, icon, renderedStitch);
            }
            else
            {
                console.error("failed to load icon " + this.icon.src);
            }
        };

        this.render = function render(canvasContext, renderContext)
        {
            for (var i = 0; i < this.stitches.length; i++)
            {
                var renderedStitch = renderContext.getRenderedStitchFor(this.stitches[i]);
                this.renderIconAndConnections(canvasContext, renderContext, this.stitches[i].getIcon(), 0, renderedStitch);
            }
        };
    }

    return IncreaseStitchRenderer;
});


