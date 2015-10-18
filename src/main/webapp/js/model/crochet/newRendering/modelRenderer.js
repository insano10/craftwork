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

        this.render = function addStitch(headStitch, canvasContext, renderContext)
        {
            console.log("Rendering model");

            if (headStitch != null)
            {
                //split stitches into render groups
                var headStitchGroup = new StitchGroup(headStitch.getType());

                var currentStitchGroup = headStitchGroup;
                var currentStitch = headStitch;

                while(currentStitch != null)
                {
                    if (currentStitchGroup.accept(currentStitch))
                    {
                        currentStitch = currentStitch.getNextStitch();
                    }
                    else
                    {
                        currentStitchGroup.close();

                        var renderGroup = new StitchGroup(currentStitch.getType());
                        currentStitchGroup.setNextGroup(renderGroup);
                        currentStitchGroup = renderGroup;
                    }
                }
                currentStitchGroup.close();

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


