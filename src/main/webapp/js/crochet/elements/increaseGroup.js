define(["jquery"], function ($)
{

    /*
     IncreaseGroup holds metadata about a group of IncreaseStitches
     */
    function IncreaseGroup(totalStitches, stitchWidth)
    {
        this.offsetOfFirstStitch = (totalStitches / 2) * stitchWidth;
        this.widthOffset = 0.5 * stitchWidth;

        this.renderConnectionLines = function renderConnectionLines(canvasContext, renderContext, groupIndex, rowNum)
        {
            var xPos = renderContext.currentRenderXPos + (0.5 * stitchWidth);
            var yPos = renderContext.currentRenderYPos + (0.5 * stitchWidth);
            var xOffset;

            if(rowNum%2 == 0)
            {
                //right to left
                xOffset = -this.offsetOfFirstStitch + (groupIndex * stitchWidth)  + this.widthOffset;
            }
            else
            {
                //left to right
                xOffset = this.offsetOfFirstStitch - (groupIndex * stitchWidth) - this.widthOffset;
            }

            canvasContext.beginPath();

            canvasContext.moveTo(xPos, yPos);
            canvasContext.lineTo(xPos + xOffset, yPos + stitchWidth);
            canvasContext.stroke();
        };

        this.calculateRenderXPos = function calculateRenderXPos(groupIndex, rowNum, centreXPos)
        {
            var xPos;

            if(rowNum%2 == 0)
            {
                //right to left
                xPos = centreXPos + this.offsetOfFirstStitch - (groupIndex * stitchWidth) - this.widthOffset;
            }
            else
            {
                //left to right
                xPos = centreXPos - this.offsetOfFirstStitch + (groupIndex * stitchWidth) + this.widthOffset;
            }
            return xPos;
        }
    }

    return IncreaseGroup;
});