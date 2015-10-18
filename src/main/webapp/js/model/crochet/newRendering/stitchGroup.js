define(["jquery", "stitchRenderer", "stitchPreRenderHelper", "stitchUtils"], function ($, StitchRenderer, StitchPreRenderHelper, StitchUtils)
{
    return (function ()
    {
        function StitchGroup()
        {
            this.id = StitchUtils.generateId();
            this.stitches = [];
            this.nextGroup = null;
            this.renderer = null;
            this.preRenderHelper = null;
        }

        StitchGroup.prototype.accept = function accept(stitch)
        {
            //group allows 1 stitch only
            return this.stitches.length == 0;
        };

        StitchGroup.prototype.addToGroup = function addToGroup(stitch)
        {
            this.stitches.push(stitch);
        };

        StitchGroup.prototype.close = function close()
        {
            this.renderer = new StitchRenderer(this.stitches);
            this.preRenderHelper = new StitchPreRenderHelper();
        };

        StitchGroup.prototype.getStitches = function getStitches()
        {
            return this.stitches;
        };

        StitchGroup.prototype.setNextGroup = function setNextGroup(group)
        {
            this.nextGroup = group;
        };

        StitchGroup.prototype.printStitches = function printStitches()
        {
            console.log("Stitch group");
            for (var i = 0; i < this.stitches.length; i++)
            {
                console.log(this.stitches[i].toString());
            }

            if (this.nextGroup != null)
            {
                this.nextGroup.printStitches();
            }
        };

        StitchGroup.prototype.preRender1 = function preRender1(renderContext)
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

        StitchGroup.prototype.preRender2 = function preRender2(renderContext)
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

        StitchGroup.prototype.preRender3 = function preRender3(renderContext)
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

        StitchGroup.prototype.render = function render(canvasContext, renderContext)
        {
            this.renderer.render(canvasContext, renderContext);

            if (this.nextGroup != null)
            {
                this.nextGroup.render(canvasContext, renderContext);
            }
        };

        return StitchGroup;

    })();
});


