define(["jquery"], function($)
{
    function RenderedStitch(xPos, yPos, width)
    {
        this.xPos = xPos;
        this.yPos = yPos;
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
