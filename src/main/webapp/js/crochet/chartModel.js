define(["mesh"], function(Mesh)
{
    function ChartModel(chartRenderer)
    {
        /*
        PRIVATE
         */
        var mesh = new Mesh();

        /*
         PRIVILEGED
         */

        this.clear = function clear()
        {
            mesh.clear();
        };

        this.addStitch = function addStitch(stitch, rowNum, rowIdx)
        {
            mesh.addStitch(stitch, rowNum, rowIdx);
        };

        this.redrawChart = function redrawChart()
        {
            chartRenderer.renderMesh(mesh);
        };
    }

    return ChartModel;
});


