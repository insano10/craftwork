define(["jquery"], function($)
{
    function ChartModel()
    {
        var ROW_NUM_RENDER_X_OFFSET = -50;

        var headStitch = null;
        var tailStitch = null;

        var renderRowNumbers = function renderRowNumbers(canvasContext, renderContext)
        {
            var yOffset = renderContext.getHeightOfRow(1) + 10;
            canvasContext.font = "10px Arial";

            for(var i = 0 ; i < renderContext.getMaxRowNum() ; i++)
            {
                var rowNum = i+1;
                yOffset -= renderContext.getHeightOfRow(rowNum);
                canvasContext.fillText(rowNum, renderContext.getStartXPos() + ROW_NUM_RENDER_X_OFFSET, renderContext.getStartYPos() + yOffset);
            }
        };

        this.clear = function clear()
        {
            headStitch = null;
            tailStitch = null;
        };

        this.addStitch = function addStitch(stitch, rowNum)
        {
            console.log("Appending stitch " + stitch.toString());

            if(headStitch == null)
            {
                headStitch = stitch;
                tailStitch = stitch;
            }
            else
            {
                tailStitch.setNextStitch(stitch, rowNum);
                stitch.connectToRowBelow(tailStitch);
                tailStitch = stitch;
            }
        };

        this.render = function render(canvasContext, renderContext)
        {

            if(headStitch != null)
            {
                headStitch.populateRenderingData(renderContext, true);

                renderRowNumbers(canvasContext, renderContext);
                headStitch.render(canvasContext, renderContext);
            }
        };

        this.requiresRender = function requiresRender()
        {
            return headStitch != null;
        }
    }

    return ChartModel;
});


