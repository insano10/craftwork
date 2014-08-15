define(["jquery"], function ($)
{

    /*
     IncreaseGroup holds metadata about a group of IncreaseStitches
     */
    function IncreaseGroup(totalStitches, stitchWidth)
    {
        this.offsetOfFirstStitch = (totalStitches / 2) * stitchWidth;
        this.connectionOffset = 0.5 * stitchWidth;

        this.renderConnectionLines = function renderConnectionLines(canvasContext, renderXPos, renderYPos, groupIndex, rowNum)
        {
            var xPos = renderXPos + (0.5 * stitchWidth);
            var yPos = renderYPos + (0.5 * stitchWidth);
            var xOffset;

            if(rowNum%2 == 0)
            {
                //right to left
                xOffset = -this.offsetOfFirstStitch + (groupIndex * stitchWidth)  + this.connectionOffset;
            }
            else
            {
                //left to right
                xOffset = this.offsetOfFirstStitch - (groupIndex * stitchWidth) - this.connectionOffset;
            }

            canvasContext.beginPath();

            canvasContext.moveTo(xPos, yPos);
            canvasContext.lineTo(xPos + xOffset, yPos + stitchWidth);
            canvasContext.stroke();
        };
    }

    return IncreaseGroup;
});