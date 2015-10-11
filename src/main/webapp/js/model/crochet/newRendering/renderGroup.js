define(["jquery", "singleStitchRenderer", "increaseStitchRenderer"], function ($, SingleStitchRenderer, IncreaseStitchRenderer)
{
    function RenderGroup(type)
    {
        this.type = type;
        this.stitches = [];
        this.previousGroup = null;
        this.nextGroup = null;

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
                this.stitches[i].calculateStartingAngle(renderContext);
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
                this.stitches[i].calculateRelativeAngle(renderContext);
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
                this.stitches[i].calculatePosition(renderContext);
            }

            if (this.nextGroup != null)
            {
                this.nextGroup.preRender3(renderContext);
            }
        };

        this.render = function render(canvasContext, renderContext)
        {
            var renderer;

            if (this.type == "INCREASE")
            {
                renderer = new IncreaseStitchRenderer(this.stitches);
            }
            else
            {
                renderer = new SingleStitchRenderer(this.stitches[0]);
            }

            renderer.render(canvasContext, renderContext);

            if (this.nextGroup != null)
            {
                this.nextGroup.render(canvasContext, renderContext);
            }
        };
    }

    return RenderGroup;
});


