define(["jquery", "modelRenderer", "stitchGroup", "increaseStitchGroup"], function ($, ModelRenderer, StitchGroup, IncreaseStitchGroup)
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

                headStitchGroup = stitch.createStitchGroup();
                tailStitchGroup = headStitchGroup;
            }
            else
            {
                tailStitch.setNextStitch(stitch, rowNum);
                tailStitch = stitch;
            }

            if (tailStitchGroup.accept(stitch))
            {
                tailStitchGroup.addToGroup(stitch);
            }
            else
            {
                tailStitchGroup.close(tailStitch);

                var stitchGroup = stitch.createStitchGroup();
                stitchGroup.addToGroup(stitch);

                tailStitchGroup.setNextGroup(stitchGroup);
                tailStitchGroup = stitchGroup;
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


