define(["jquery", "modelRenderer", "stitchGroup", "increaseStitchGroup"], function ($, ModelRenderer, StitchGroup, IncreaseStitchGroup)
{
    function ChartModel()
    {
        var headStitchGroup = null;
        var tailStitchGroup = null;

        this.clear = function clear()
        {
            headStitchGroup = null;
        };

        this.addStitchGroup = function addStitchGroup(stitchGroup)
        {
            if (headStitchGroup == null)
            {
                headStitchGroup = stitchGroup;
                tailStitchGroup = stitchGroup;
            }
            else
            {
                tailStitchGroup.setNextGroup(stitchGroup);
                stitchGroup.setPreviousGroup(tailStitchGroup);
                stitchGroup.attachToChain();
                tailStitchGroup = stitchGroup;
            }
        };


        this.render = function render(canvasContext, renderContext)
        {
            var modelRenderer = new ModelRenderer();
            modelRenderer.render(headStitchGroup, canvasContext, renderContext);
        };
    }

    return ChartModel;
});


