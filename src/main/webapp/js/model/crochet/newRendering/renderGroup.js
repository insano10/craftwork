define(["jquery", "stitchRenderer", "increaseStitchRenderer", "stitchPreRenderHelper", "increaseStitchPreRenderHelper", "renderingUtils"],
    function ($, StitchRenderer, IncreaseStitchRenderer, StitchPreRenderHelper, IncreaseStitchPreRenderHelper, RenderingUtils)
{
    function RenderGroup(type)
    {
        this.type = type;
        this.stitches = [];
        this.previousGroup = null;
        this.nextGroup = null;
        this.renderer = null;
        this.preRenderHelper = null;

        this.accept = function accept(stitch)
        {
            if (stitch.getType() == "INCREASE" && this.type == "INCREASE")
            {
                //group allows multiple stitches of the same type
                this.stitches.push(stitch);
                return true;
            }
            else
            {
                //group allows 1 stitch only
                if (this.stitches.length == 0)
                {
                    this.stitches.push(stitch);
                    return true;
                }
            }
            return false;
        };

        this.close = function close()
        {
            if (this.type == "INCREASE")
            {
                this.renderer = new IncreaseStitchRenderer(this.stitches);
                this.preRenderHelper = new IncreaseStitchPreRenderHelper();
            }
            else
            {
                this.renderer = new StitchRenderer(this.stitches);
                this.preRenderHelper = new StitchPreRenderHelper();
            }
        };

        this.setPreviousGroup = function setPreviousGroup(group)
        {
            this.previousGroup = group;
        };

        this.setNextGroup = function setNextGroup(group)
        {
            this.nextGroup = group;
        };

        this.preRender1 = function preRender1(renderContext)
        {
            for (var i = 0; i < this.stitches.length; i++)
            {
                this.preRenderHelper.calculateStartingAngle(this.stitches[i], renderContext);

            }

            if (this.nextGroup != null)
            {
                this.nextGroup.preRender1(renderContext);
            }
        };

        this.preRender2 = function preRender2(renderContext)
        {
            for (var i = 0; i < this.stitches.length; i++)
            {
                this.preRenderHelper.calculateRelativeAngle(this.stitches[i], renderContext);
            }

            if (this.nextGroup != null)
            {
                this.nextGroup.preRender2(renderContext);
            }
        };

        this.preRender3 = function preRender3(renderContext)
        {
            for (var i = 0; i < this.stitches.length; i++)
            {
                this.preRenderHelper.calculatePosition(this.stitches[i], renderContext);
            }

            if (this.nextGroup != null)
            {
                this.nextGroup.preRender3(renderContext);
            }
        };

        this.render = function render(canvasContext, renderContext)
        {
            if(RenderingUtils.DEBUG_RENDER)
            {
                var firstRenderedStitch = renderContext.getRenderedStitchFor(this.stitches[0]);
                RenderingUtils.renderGridLines(canvasContext, firstRenderedStitch);
                RenderingUtils.renderStitchOrigin(canvasContext, firstRenderedStitch);
            }

            this.renderer.render(canvasContext, renderContext);

            if (this.nextGroup != null)
            {
                this.nextGroup.render(canvasContext, renderContext);
            }
        };
    }

    return RenderGroup;
});


