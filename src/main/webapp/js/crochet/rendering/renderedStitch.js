define(["jquery"], function($)
{
    function RenderedStitch(renderPosition, width)
    {
        this.xPos = renderPosition.x;
        this.yPos = renderPosition.y;
        this.width = width;

        this.getXPos = function getXPos()
        {
            return this.xPos;
        };

        this.getYPos = function getYPos()
        {
            return this.yPos;
        };

        this.getMidXPos = function getMidXPos()
        {
            return this.xPos + (0.5 * this.width);
        };

        this.getMidYPos = function getMidYPos()
        {
            return this.yPos + (0.5 * this.width);
        }
    }

    return RenderedStitch;
});
