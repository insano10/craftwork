define(["jquery", "stitchRenderer", "stitchPreRenderHelper", "stitchUtils"], function ($, StitchRenderer, StitchPreRenderHelper, StitchUtils)
{
    return (function ()
    {
        function StitchGroup(rowNum, stitches)
        {
            this.id = StitchUtils.generateId();
            this.rowNum = rowNum;
            this.stitches = stitches;
            this.previousGroup = null;
            this.nextGroup = null;
            this.renderer = new StitchRenderer();
            this.preRenderHelper = new StitchPreRenderHelper();

            //join the stitches together
            for (var i = 0; i < stitches.length-1; i++)
            {
                stitches[i].setNextStitch(stitches[i+1]);
                stitches[i+1].setPreviousStitch(stitches[i]);
            }
        }

        StitchGroup.prototype.attachToChain = function attachToChain()
        {
            var tailStitch = this.stitches[0].getPreviousStitch();

            for (var i = 0; i < this.stitches.length; i++)
            {
                this.connectStitchToRowBelow(this.stitches[i], tailStitch, i);
            }
        };

        StitchGroup.prototype.connectStitchToRowBelow = function connectStitchToRowBelow(stitch, chainTail, groupIndex)
        {
            if (stitch.renderRelativeTo())
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

        StitchGroup.prototype.setNextGroup = function setNextGroup(group)
        {
            this.nextGroup = group;

            //join the last stitch in this group to the first stitch in the next group
            this.stitches[this.stitches.length-1].setNextStitch(group.getStitches()[0]);
            group.getStitches()[0].setPreviousStitch(this.stitches[this.stitches.length-1]);
        };

        StitchGroup.prototype.setPreviousGroup = function setPreviousGroup(group)
        {
            this.previousGroup = group;
        };

        StitchGroup.prototype.getPreviousGroup = function getPreviousGroup()
        {
            return this.previousGroup;
        };

        StitchGroup.prototype.getStitches = function getStitches()
        {
            return this.stitches;
        };

        StitchGroup.prototype.preRender1 = function preRender1(renderContext)
        {
            for (var i = 0; i < this.stitches.length; i++)
            {
                this.preRenderHelper.calculateStartingAngle(this.stitches[i], renderContext, i);

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


