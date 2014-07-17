define(["mesh"], function(Mesh)
{
    function ChartModel(chartRenderer)
    {
        var mesh = new Mesh();


        this.clear = function clear()
        {
            mesh.clear();
        };

        this.addChain = function addChain(stitch, rowNum, rowIdx)
        {
            mesh.addStitch(stitch, rowNum, [rowIdx]);
        };

        this.addSingleCrochet = function addSingleCrochet(stitch, rowNum, connectedToIndices)
        {
            mesh.addStitch(stitch, rowNum, connectedToIndices);
        };

        this.redrawChart = function redrawChart()
        {
            chartRenderer.renderMesh(mesh);
        };
    }

    return ChartModel;
});


