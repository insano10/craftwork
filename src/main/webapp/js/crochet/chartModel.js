define(["crochetRow"], function(CrochetRow)
{
    function ChartModel(chartRenderer)
    {
        /*
        PRIVATE
         */
        var rows = {};

        /*
         PRIVILEGED
         */

        this.clear = function clear()
        {
            rows = {};
        };

        this.appendStitchToRow = function appendStitchToRow(stitch, rowNum)
        {
            console.log("Appending stitch " + stitch.toString() + " to row " + rowNum);

            if(rows[rowNum] == null)
            {
                rows[rowNum] = new CrochetRow(rowNum);
            }
            rows[rowNum].appendStitch(stitch);
        };

        this.redrawChart = function redrawChart()
        {
            console.log("rendering rows: " + JSON.stringify(rows));
            chartRenderer.renderRows(rows);
        };
    }

    return ChartModel;
});


