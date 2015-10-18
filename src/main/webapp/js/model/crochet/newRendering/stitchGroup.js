define(["jquery", "stitchRenderer", "stitchPreRenderHelper", "stitchUtils"], function ($, StitchRenderer, StitchPreRenderHelper, StitchUtils)
{
    return (function ()
    {
        function StitchGroup(rowNum)
        {
            this.id = StitchUtils.generateId();
            this.rowNum = rowNum;
            this.stitches = [];
            this.nextGroup = null;
            this.renderer = new StitchRenderer();
            this.preRenderHelper = new StitchPreRenderHelper();
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

        StitchGroup.prototype.close = function close(tailStitch)
        {
            for (var i = 0; i < this.stitches.length; i++)
            {
                this.connectStitchToRowBelow(this.stitches[i], tailStitch, i);
            }
        };

        StitchGroup.prototype.connectStitchToRowBelow = function connectStitchToRowBelow(stitch, chainTail, groupIndex)
        {
            if(stitch.renderRelativeTo())
            {
                var candidateStitch = chainTail;

                while (candidateStitch != null)
                {
                    if (this.rowNum > candidateStitch.getRowNum())
                    {
                        //row below this stitch
                        if (candidateStitch.isAvailableForConnection())
                        {
                            console.log("Connecting stitch " + stitch.toString() + " to stitch " + candidateStitch.toString());
                            candidateStitch.setStitchAbove(stitch);
                            stitch.setStitchBelow(candidateStitch);
                            break;
                        }
                        else
                        {
                            console.log("not free, continuing");
                        }
                    }
                    candidateStitch = candidateStitch.getPreviousStitch();
                }

                if (candidateStitch == null && this.rowNum > 1)
                {
                    console.error("Could not find connecting stitch for " + stitch.toString());
                }
            }
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
            this.renderer.render(this.stitches, canvasContext, renderContext);

            if (this.nextGroup != null)
            {
                this.nextGroup.render(canvasContext, renderContext);
            }
        };

        return StitchGroup;

    })();
});


