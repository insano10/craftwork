define(["jquery"], function($)
{
    function RenderContext(startXPos, startYPos)
    {
        this.startXPos = startXPos;
        this.startYPos = startYPos;
        this.stitches = {};
        this.lastRenderedStitch = null;
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

        this.getLastRenderedStitch = function getLastRenderedStitch()
        {
            return this.lastRenderedStitch;
        };

        this.addRenderedStitch = function addRenderedStitch(id, renderedStitch)
        {
            this.stitches[id] = renderedStitch;
            this.lastRenderedStitch = renderedStitch;
            this.updateRowInfo(renderedStitch);
        };

        this.updateRowInfo = function updateRowInfo(renderedStitch)
        {
            var rowNum = renderedStitch.getRowNum();
            if(rowNum > this.maxRowNum)
            {
                this.maxRowNum = rowNum;
            }

            if(this.rowHeights[rowNum] == null)
            {
                this.rowHeights[rowNum] = renderedStitch.getHeight();
            }

            this.rowHeights[rowNum] = Math.max(this.rowHeights[rowNum], renderedStitch.getHeight());
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
