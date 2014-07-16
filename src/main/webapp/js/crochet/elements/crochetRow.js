define(["jquery"], function ($)
{
    function CrochetRow(rowNum)
    {
        var stitches = [];

        this.appendStitch = function appendStitch(stitch)
        {
            stitches.push(stitch);
        };

        this.connectStitchFromBelow = function connectStitchFromBelow(stitch, rowIdx)
        {
            stitches[rowIdx].connectStitchFromBelow(stitch);
        };

        this.connectStitchFromAbove = function connectStitchFromAbove(stitch, rowIdx)
        {
            var stitchAtIdx = stitches[rowIdx];

            if (stitchAtIdx != null)
            {
                stitchAtIdx.connectStitchFromAbove(stitch);
                stitch.connectStitchFromBelow(stitchAtIdx);
            }
            else
            {
                console.error("Cannot connect stitch " + stitch.toString() + " to row " + rowNum + " index " + rowIdx + " as no stitch exists at that location")
            }
        };

        this.render = function render(canvasContext, maxYPos)
        {
            for (var i = 0; i < stitches.length; i++)
            {
                stitches[i].render(canvasContext, rowNum, i, maxYPos);
            }
        }
    }

    return CrochetRow;
});