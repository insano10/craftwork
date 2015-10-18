define(["jquery", "modelRenderer", "stitchGroup"], function ($, ModelRenderer, StitchGroup)
{
    function ChartModel()
    {
        var headStitchGroup = null;
        var tailStitchGroup = null;
        var tailStitch = null;

        this.clear = function clear()
        {
            headStitchGroup = null;
            tailStitch = null;
        };

        this.addStitch = function addStitch(stitch, rowNum)
        {
            console.log("Appending stitch " + stitch.toString());

            if (headStitchGroup == null)
            {
                tailStitch = stitch;

                headStitchGroup = new StitchGroup(stitch.getType());
                tailStitchGroup = headStitchGroup;
            }
            else
            {
                tailStitch.setNextStitch(stitch, rowNum);
                stitch.connectToRowBelow(tailStitch);
                tailStitch = stitch;
            }

            if (!tailStitchGroup.accept(stitch))
            {
                tailStitchGroup.close();

                var stitchGroup = new StitchGroup(stitch.getType());
                tailStitchGroup.setNextGroup(stitchGroup);
                tailStitchGroup = stitchGroup;
                tailStitchGroup.accept(stitch);
            }
        };

        this.modelComplete = function modelComplete()
        {
            tailStitchGroup.close();
        };

        this.render = function render(canvasContext, renderContext)
        {
            var modelRenderer = new ModelRenderer();
            modelRenderer.render(headStitchGroup, canvasContext, renderContext);
        };
    }

    return ChartModel;
});


