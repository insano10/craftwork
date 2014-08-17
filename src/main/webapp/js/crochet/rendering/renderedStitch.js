define(["jquery"], function($)
{
    function RenderedStitch(renderPosition, angle, width, height)
    {
        this.xPos = renderPosition.x;
        this.yPos = renderPosition.y;
        this.angle = angle; //relative to horizontal where + is clockwise and - is anticlockwise
        this.width = width;
        this.height = height;

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
            return this.yPos + (0.5 * this.height);
        };

        this.getAngle = function getAngle()
        {
            return this.angle;
        };
    }

    return RenderedStitch;
});
