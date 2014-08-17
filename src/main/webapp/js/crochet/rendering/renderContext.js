define(["jquery"], function($)
{
    function RenderContext(startXPos, startYPos)
    {
        this.startXPos = startXPos;
        this.startYPos = startYPos;
        this.stitches = {};
        this.lastRenderedStitch = null;

        this.getStartXPos = function getStartXPos()
        {
            return this.startXPos;
        };

        this.getStartYPos = function getStartYPos()
        {
            return this.startYPos;
        };

        this.getRenderedStitchFor = function getRenderedStitchFor(stitch)
        {
            return this.stitches[stitch.getId()];
        };

        this.getLastRenderedStitch = function getLastRenderedStitch()
        {
            return this.lastRenderedStitch;
        };

        this.addRenderedStitch = function addRenderedStitch(id, renderedStitch)
        {
            this.stitches[id] = renderedStitch;
            this.lastRenderedStitch = renderedStitch;
        };
    }

    return RenderContext;
});
