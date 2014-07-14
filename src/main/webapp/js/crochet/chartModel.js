define(function()
{
    function ChartModel(chartRenderer)
    {
        /*
        PRIVATE
         */
        var rowStitches = {};

        /*
         PRIVILEGED
         */

        this.clear = function clear()
        {
            rowStitches = {};
        };

        this.appendStitchToRow = function appendStitchToRow(stitch, row)
        {
            console.log("Appending stitch " + stitch.toString() + " to row " + row);

            if(rowStitches[row] == null)
            {
                rowStitches[row] = [];
            }
            rowStitches[row].push(stitch);
        };

        this.redrawChart = function redrawChart()
        {
            chartRenderer.renderStitches(rowStitches);
        };
    }

    return ChartModel;
});


