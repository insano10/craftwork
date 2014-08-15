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
        }
    }

    return RenderedStitch;
});
