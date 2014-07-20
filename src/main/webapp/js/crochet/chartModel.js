define(["mesh"], function(Mesh)
{
    function ChartModel(chartRenderer)
    {
        var mesh = new Mesh();


        this.clear = function clear()
        {
            mesh.clear();
        };

        this.addChain = function addChain(stitch, rowNum)
        {
            mesh.addStitch(stitch, rowNum);
        };

        this.addSingleCrochet = function addSingleCrochet(stitch, rowNum)
        {
            mesh.addStitch(stitch, rowNum);
        };

        this.redrawChart = function redrawChart()
        {
            chartRenderer.renderMesh(mesh);
        };
    }

    return ChartModel;
});


