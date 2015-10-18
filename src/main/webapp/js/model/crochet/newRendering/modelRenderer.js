define(["jquery", "stitchGroup", "renderingUtils"], function ($, StitchGroup, RenderingUtils)
{
    function ModelRenderer()
    {
        var ROW_NUM_RENDER_X_OFFSET = -50;

        var renderRowNumbers = function renderRowNumbers(canvasContext, renderContext)
        {
            var yOffset = renderContext.getHeightOfRow(1) + 10;
            canvasContext.font = "10px Arial";

            for (var i = 0; i < renderContext.getMaxRowNum(); i++)
            {
                var rowNum = i + 1;
                yOffset -= renderContext.getHeightOfRow(rowNum);
                canvasContext.fillText(rowNum, renderContext.getStartXPos() + ROW_NUM_RENDER_X_OFFSET, renderContext.getStartYPos() + yOffset);
            }
        };

        this.render = function addStitch(headStitchGroup, canvasContext, renderContext)
        {
            console.log("Rendering model");

            if (headStitchGroup != null)
            {
                //precalculate positions and angles before rendering
                headStitchGroup.preRender1(renderContext);
                headStitchGroup.preRender2(renderContext);
                headStitchGroup.preRender3(renderContext);
                headStitchGroup.render(canvasContext, renderContext);
                renderRowNumbers(canvasContext, renderContext);
            }
        };

    }

    return ModelRenderer;
});


