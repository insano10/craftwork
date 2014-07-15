define(["jquery"], function ($)
{
    function CrochetRow(rowNum)
    {
        var stitches = [];

        this.appendStitch = function appendStitch(stitch)
        {
            stitches.push(stitch);
        };

        this.drawToCanvas = function drawToCanvas(canvasContext, maxYPos)
        {
            for (var i = 0; i < stitches.length; i++)
            {
                stitches[i].drawToCanvas(canvasContext, rowNum, i, maxYPos);
            }
        }
    }

    return CrochetRow;
});