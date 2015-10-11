define(["jquery", "renderGroup"], function ($, RenderGroup)
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

        this.render = function addStitch(headStitch, canvasContext, renderContext)
        {
            console.log("Rendering model");

            if (headStitch != null)
            {
                //split stitches into render groups
                var headRenderGroup = new RenderGroup(headStitch.getType());

                var currentRenderGroup = headRenderGroup;
                var currentStitch = headStitch;

                while(currentStitch != null)
                {
                    if (currentRenderGroup.accept(currentStitch))
                    {
                        currentStitch = currentStitch.getNextStitch();
                    }
                    else
                    {
                        currentRenderGroup.close();

                        var renderGroup = new RenderGroup(currentStitch.getType());
                        renderGroup.setPreviousGroup(currentRenderGroup);
                        currentRenderGroup.setNextGroup(renderGroup);
                        currentRenderGroup = renderGroup;
                    }
                }
                currentRenderGroup.close();

                //precalculate positions and angles before rendering
                headRenderGroup.preRender1(renderContext);
                headRenderGroup.preRender2(renderContext);
                headRenderGroup.preRender3(renderContext);
                headRenderGroup.render(canvasContext, renderContext);
                renderRowNumbers(canvasContext, renderContext);
            }
        };

    }

    return ModelRenderer;
});


