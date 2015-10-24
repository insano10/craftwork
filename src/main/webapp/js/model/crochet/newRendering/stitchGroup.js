define(["jquery", "stitchRenderer", "stitchPreRenderHelper", "stitchUtils", "renderedStitchGroup"], function ($, StitchRenderer, StitchPreRenderHelper, StitchUtils, RenderedStitchGroup)
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
            this.groupBelow = null;
            this.groupAbove = null;
            this.renderer = new StitchRenderer();
            this.preRenderHelper = new StitchPreRenderHelper();

            //set the stitches' group
            for (var i = 0; i < stitches.length; i++)
            {
                stitches[i].setStitchGroup(this);
            }

            //join the stitches together
            for (var i = 0; i < stitches.length - 1; i++)
            {
                stitches[i].setNextStitch(stitches[i + 1]);
                stitches[i + 1].setPreviousStitch(stitches[i]);
            }
        }

        StitchGroup.prototype.getId = function getId()
        {
            return this.id;
        };

        StitchGroup.prototype.getWidth = function getWidth()
        {
            return this.stitches[0].getWidth();
        };

        StitchGroup.prototype.getHeight = function getHeight()
        {
            return this.stitches[0].getHeight();
        };

        StitchGroup.prototype.getRowNum = function getRowNum()
        {
            return this.rowNum;
        };

        StitchGroup.prototype.getYOffset = function getYOffset()
        {
            return 0;
        };

        StitchGroup.prototype.renderRelativeTo = function renderRelativeTo()
        {
            return this.stitches[0].renderRelativeTo();
        };

        StitchGroup.prototype.attachToChain = function attachToChain()
        {
            var tailStitch = this.stitches[0].getPreviousStitch();

            //connect the stitches to ones below
            for (var i = 0; i < this.stitches.length; i++)
            {
                this.connectStitchToRowBelow(this.stitches[i], tailStitch, i);
            }

            //connect the group to one below
            if (this.stitches[0].getStitchesBelow().length > 0)
            {
                var groupBelow = this.stitches[0].getStitchesBelow()[0].getStitchGroup();

                this.groupBelow = groupBelow;
                groupBelow.groupAbove = this;
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
            this.stitches[this.stitches.length - 1].setNextStitch(group.getStitches()[0]);
            group.getStitches()[0].setPreviousStitch(this.stitches[this.stitches.length - 1]);
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

        StitchGroup.prototype.getOutputAngle = function getOutputAngle(inputAngle)
        {
            console.log("normal stitch, maintaining angle of: " + inputAngle);

            return inputAngle;
        };

        StitchGroup.prototype.calculateRelativeAngle = function calculateRelativeAngle(renderContext)
        {
            //ask the group above what angle this group should be connected at
            if (this.groupAbove != null)
            {

                var relativeAngle = renderContext.getRenderedStitchGroupFor(this.groupAbove).getRenderAngle();

                var renderedStitchGroup = new RenderedStitchGroup({
                    x: 0,
                    y: 0
                }, relativeAngle, this.getWidth(), this.getHeight(), this.getRowNum(), this.getYOffset());

                renderContext.addRenderedStitchGroup(this.getId(), renderedStitchGroup);

                console.log(this.toString() + " has relative angle " + relativeAngle);
            }
            else
            {
                console.log(this.toString() + " has no group above, not calculating relative angle");
            }
        };

        StitchGroup.prototype.preRender1 = function preRender1(renderContext)
        {
            var lastStitchGroup = this.getPreviousGroup();

            var angleOfRotation = 0;
            if (lastStitchGroup != null)
            {
                var inputAngle = renderContext.getRenderedStitchGroupFor(lastStitchGroup).getRenderAngle();
                angleOfRotation = lastStitchGroup.getOutputAngle(inputAngle);
            }

            var renderedStitchGroup = new RenderedStitchGroup({
                x: 0,
                y: 0
            }, angleOfRotation, this.getWidth(), this.getHeight(), this.getRowNum(), this.getYOffset());
            renderContext.addRenderedStitchGroup(this.getId(), renderedStitchGroup);

            console.log(this.toString() + " has starting angle " + angleOfRotation);

            if (this.nextGroup != null)
            {
                this.nextGroup.preRender1(renderContext);
            }
        };

        StitchGroup.prototype.preRender2 = function preRender2(renderContext)
        {
            this.calculateRelativeAngle(renderContext);

            if (this.nextGroup != null)
            {
                this.nextGroup.preRender2(renderContext);
            }
        };

        StitchGroup.prototype.preRender3 = function preRender3(renderContext)
        {
            this.preRenderHelper.calculatePosition(this, renderContext);

            if (this.nextGroup != null)
            {
                this.nextGroup.preRender3(renderContext);
            }
        };

        StitchGroup.prototype.render = function render(canvasContext, renderContext)
        {
            this.renderer.render(canvasContext, renderContext, this);

            if (this.nextGroup != null)
            {
                this.nextGroup.render(canvasContext, renderContext);
            }
        };


        return StitchGroup;

    })();
});


