define([], function ()
{
    function ChainRenderer()
    {
        this.render = function render(headStitch, canvasContext, renderContext)
        {

            if(headStitch != null)
            {
                headStitch.populateRenderingData(renderContext, true);
                headStitch.render(canvasContext, renderContext);
            }
        };
    }

    return ChainRenderer;
});