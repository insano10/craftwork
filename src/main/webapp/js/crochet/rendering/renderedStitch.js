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

        this.getYRotationLength = function getYRotationLength()
        {
            return this.width * Math.sin(this.angle*Math.PI/180); //using SOH
        };

        this.getXRotationLength = function getXRotationLength()
        {
            var xOffsetDueToRotation = (this.width * Math.cos(this.angle*Math.PI/180)); //using CAH
            return this.width - xOffsetDueToRotation;
        }
    }

    return RenderedStitch;
});
