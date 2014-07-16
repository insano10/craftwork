define(["jquery"], function ($)
{
    function CrochetRow(rowNum)
    {
        var stitches = [];

        this.appendStitch = function appendStitch(stitch)
        {
            stitches.push(stitch);
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