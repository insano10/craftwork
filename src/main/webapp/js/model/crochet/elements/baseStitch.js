define(["jquery", "stitchUtils", "stitchGroup"], function ($, StitchUtils, StitchGroup)
{
    return (function ()
    {
        function Stitch(chainIndex, imgFile, imgWidth, imgHeight, rowNum, renderYOffset)
        {
            this.chainIndex = chainIndex;
            this.id = StitchUtils.generateId();
            this.imgFile = imgFile;
            this.imgWidth = imgWidth;
            this.imgHeight = imgHeight;
            this.rowNum = rowNum;
            this.renderYOffset = renderYOffset;
            this.previousStitch = null;
            this.nextStitch = null;
            this.stitchesAbove = [];
            this.stitchesBelow = [];
            this.icon = new Image();
            this.icon.src = "../../../../images/" + this.imgFile;
        }

        Stitch.prototype.getId = function getId()
        {
            return this.id;
        };

        Stitch.prototype.getIcon = function getIcon()
        {
            return this.icon;
        };

        Stitch.prototype.getType = function getType()
        {
            throw "getType must be implemented in concrete stitch implementation";
        };

        //todo: ewwww
        Stitch.prototype.getRenderYOffset = function getRenderYOffset()
        {
            return this.renderYOffset;
        };

        Stitch.prototype.renderRelativeTo = function renderRelativeTo()
        {
            return true;
        };

        Stitch.prototype.getWidth = function getWidth()
        {
            return this.imgWidth;
        };

        Stitch.prototype.getHeight = function getHeight()
        {
            return this.imgHeight;
        };

        Stitch.prototype.setPreviousStitch = function setPreviousStitch(stitch)
        {
            this.previousStitch = stitch;
        };

        Stitch.prototype.getPreviousStitch = function getPreviousStitch()
        {
            return this.previousStitch;
        };

        Stitch.prototype.setStitchAbove = function setStitchAbove(stitch)
        {
            this.stitchesAbove.push(stitch);
        };

        Stitch.prototype.getStitchesAbove = function getStitchesAbove()
        {
            return this.stitchesAbove;
        };

        Stitch.prototype.setStitchBelow = function setStitchBelow(stitch)
        {
            this.stitchesBelow.push(stitch);
        };

        Stitch.prototype.getStitchesBelow = function getStitchesBelow()
        {
            return this.stitchesBelow;
        };

        Stitch.prototype.isAvailableForConnection = function isAvailableForConnection()
        {
            return this.stitchesAbove.length == 0;
        };

        Stitch.prototype.setNextStitch = function setNextStitch(stitch)
        {
            if (this.nextStitch == null)
            {
                this.nextStitch = stitch;
                stitch.setPreviousStitch(this);
            }
            else
            {
                console.error("Cannot connect " + stitch.toString() + " to " + this.toString() + " as it is already connected");
            }
        };

        //todo: either have each stitch chain to the next internally OR expose getter, not both
        Stitch.prototype.getNextStitch = function getNextStitch()
        {
            return this.nextStitch;
        };

        Stitch.prototype.getIcon = function getIcon()
        {
            return this.icon;
        };

        Stitch.prototype.getRowNum = function getRowNum()
        {
            return this.rowNum;
        };

        Stitch.prototype.getConnectionAngleFor = function getConnectionAngleFor(stitchBelow, renderContext)
        {
            //connect using the angle of this stitch
            return renderContext.getRenderedStitchFor(this).getRenderAngle();
        };

        Stitch.prototype.createStitchGroup = function createStitchGroup()
        {
            return new StitchGroup(this.rowNum);
        };

        Stitch.prototype.toString = function toString()
        {
            console.error("Implementation missing for toString()");
        };

        return Stitch;

    })();
});