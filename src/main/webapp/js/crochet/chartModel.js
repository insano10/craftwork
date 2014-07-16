define(["mesh"], function(Mesh)
{
    function ChartModel(chartRenderer)
    {
        var mesh = new Mesh();


        this.clear = function clear()
        {
            mesh.clear();
        };

        this.addSingleCrochet = function addSingleCrochet(stitch, rowNum, rowIdx)
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


