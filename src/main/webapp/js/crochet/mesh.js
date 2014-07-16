define(["jquery", "crochetRow"], function ($, CrochetRow)
{
    function Mesh()
    {
        var rows = {};

        var ensureRowExists = function (rowNum)
        {
            if (rows[rowNum] == null)
            {
                rows[rowNum] = new CrochetRow(rowNum);
            }
        };

        var addStitchToRow = function addStitchToRow(stitch, row)
        {
            row.appendStitch(stitch);
        };

        var connectStitchToMesh = function connectStitchToMesh(stitch, rowNum, rowIdx)
        {
            var rowBelow = rows[rowNum-1];

            if(rowBelow != null)
            {
                console.log("connecting stitch " + stitch.toString() + " to lower row " + (rowNum-1) + " at index " + rowIdx);
                rowBelow.connectStitchFromAbove(stitch, rowIdx);
            }
            else
            {
                if(rowNum != 1)
                {
                    console.error("Cannot connect stitch " + stitch.toString() + " on row " + rowNum + " to row below as there isn't one");
                }
            }
        };

        this.clear = function clear()
        {
            rows = {};
        };

        this.addStitch = function addStitch(stitch, rowNum, rowIdx)
        {
            console.log("Appending stitch " + stitch.toString() + " to row " + rowNum + " at index " + rowIdx);

            ensureRowExists(rowNum);
            addStitchToRow(stitch, rows[rowNum]);
            connectStitchToMesh(stitch, rowNum, rowIdx);
        };

        this.render = function render(ctx, maxYPos)
        {
            for (var rowNum in rows)
            {
                rows[rowNum].render(ctx, maxYPos);
            }
        };

    }

    return Mesh;
});