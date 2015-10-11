define(["jquery", "modelRenderer"], function ($, ModelRenderer)
{
    function ChartModel()
    {
        var headStitch = null;
        var tailStitch = null;

        this.clear = function clear()
        {
            headStitch = null;
            tailStitch = null;
        };

        this.addStitch = function addStitch(stitch, rowNum)
        {
            console.log("Appending stitch " + stitch.toString());

            if (headStitch == null)
            {
                headStitch = stitch;
                tailStitch = stitch;
            }
            else
            {
                tailStitch.setNextStitch(stitch, rowNum);
                stitch.connectToRowBelow(tailStitch);
                tailStitch = stitch;
            }
        };

        this.render = function render(canvasContext, renderContext)
        {
            var modelRenderer = new ModelRenderer();
            modelRenderer.render(headStitch, canvasContext, renderContext);
        };
    }

    return ChartModel;
});


