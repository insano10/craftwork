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

        this.addStitch = function addStitch(stitch)
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
                tailStitch.setNextStitch(stitch, stitch.getRowNum());
                tailStitch = stitch;
            }

            if (tailStitchGroup.accept(stitch))
            {
                tailStitchGroup.addToGroup(stitch);
            }
            else
            {
                //close current stitch group and start another with the new stitch
                tailStitchGroup.close(tailStitch);

                var stitchGroup = stitch.createStitchGroup();
                stitchGroup.addToGroup(stitch);

                tailStitchGroup.setNextGroup(stitchGroup);
                stitchGroup.setPreviousGroup(tailStitchGroup);
                tailStitchGroup = stitchGroup;
            }
        };

        this.modelComplete = function modelComplete()
        {
            tailStitchGroup.close(tailStitch);
        };

        this.render = function render(canvasContext, renderContext)
        {
            var modelRenderer = new ModelRenderer();
            modelRenderer.render(headStitchGroup, canvasContext, renderContext);
        };
    }

    return ChartModel;
});


