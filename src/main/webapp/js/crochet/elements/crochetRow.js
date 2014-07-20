define(["jquery"], function ($)
{
    function CrochetRow(rowNum)
    {
        var stitches = [];
        var rowWidth = 0;

        var getRenderDirection = function getRenderDirection(stitchIndex, maxStitchIndex)
        {
            if (stitchIndex == maxStitchIndex)
            {
                //start of row: above last stitch on previous row
                return 'U';
            }

            if (rowNum % 2 != 0)
            {
                //odd row: left -> right
                return 'R';
            }
            else
            {
                //even row: right -> left
                return 'L';
            }
        };

        this.appendStitch = function appendStitch(stitch)
        {
            var widthOfRowBeforeInsertingNewStitch = rowWidth;

            stitches.push(stitch);
            rowWidth += stitch.getWidth();

            return widthOfRowBeforeInsertingNewStitch;
        };

        this.connectStitchFromBelow = function connectStitchFromBelow(stitch, rowIdx)
        {
            stitches[rowIdx].connectStitchFromBelow(stitch);
        };

        this.connectStitchFromAbove = function connectStitchFromAbove(stitch, rowIdxAbove)
        {
            for (var i = 0; i < stitch.getWidth(); i++)
            {
                var indexToAttachTo = stitches.length - 1 - rowIdxAbove - i;
                var stitchAtIdx = stitches[indexToAttachTo];

                if (stitchAtIdx != null)
                {
                    console.log("connected to lower index: " + indexToAttachTo);
                    stitchAtIdx.connectStitchFromAbove(stitch);
                    stitch.connectStitchFromBelow(stitchAtIdx);
                }
                else
                {
                    console.error("Cannot connect stitch " + stitch.toString() + " to row " + rowNum + " index " + indexToAttachTo + " as no stitch exists at that location")
                }
            }
        };

        this.render = function render(canvasContext, renderContext)
        {
            for (var i = 0; i < stitches.length; i++)
            {
                renderContext.renderDirection = getRenderDirection(i, stitches.length - 1);

                stitches[i].render(canvasContext, renderContext);
            }
        }
    }

    return CrochetRow;
});