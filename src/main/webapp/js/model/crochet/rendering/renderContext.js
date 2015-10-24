define(["jquery"], function($)
{
    function RenderContext(startXPos, startYPos)
    {
        this.startXPos = startXPos;
        this.startYPos = startYPos;
        this.stitches = {};
        this.stitchGroups = {};
        this.lastRenderedStitch = null;
        this.lastRenderedStitchGroup = null;
        this.maxRowNum = 0;
        this.rowHeights = {};

        this.getStartXPos = function getStartXPos()
        {
            return this.startXPos;
        };

        this.getStartYPos = function getStartYPos()
        {
            return this.startYPos;
        };

        this.getRenderedStitchFor = function getRenderedStitchFor(stitch)
        {
            return this.stitches[stitch.getId()];
        };

        this.getRenderedStitchGroupFor = function getRenderedStitchGroupFor(stitchGroup)
        {
            return this.stitchGroups[stitchGroup.getId()];
        };

        this.getLastRenderedStitch = function getLastRenderedStitch()
        {
            return this.lastRenderedStitch;
        };

        this.addRenderedStitchGroup = function addRenderedStitchGroup(id, renderedStitchGroup)
        {
            this.stitchGroups[id] = renderedStitchGroup;
            this.lastRenderedStitchGroup = renderedStitchGroup;
            this.updateRowInfo(renderedStitchGroup);
        };

        this.updateRowInfo = function updateRowInfo(renderedStitchGroup)
        {
            var rowNum = renderedStitchGroup.getRowNum();
            if(rowNum > this.maxRowNum)
            {
                this.maxRowNum = rowNum;
            }

            if(this.rowHeights[rowNum] == null)
            {
                this.rowHeights[rowNum] = renderedStitchGroup.getHeight();
            }

            this.rowHeights[rowNum] = Math.max(this.rowHeights[rowNum], renderedStitchGroup.getHeight());
        };

        this.getMaxRowNum = function getMaxRowNum()
        {
            return this.maxRowNum;
        };

        this.getHeightOfRow = function getHeightOfRow(rowNum)
        {
            return this.rowHeights[rowNum];
        };
    }

    return RenderContext;
});
