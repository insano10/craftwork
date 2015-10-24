define(["jquery"], function($)
{
    function RenderedStitchGroup(renderPosition, angle, width, height, rowNum, renderYOffset)
    {
        this.xPos = renderPosition.x;
        this.yPos = renderPosition.y;
        this.rowNum = rowNum;
        this.angle = angle; //relative to horizontal where - is clockwise and + is anticlockwise
        this.width = width;
        this.height = height;
        this.renderYOffset = renderYOffset;

        this.getXPos = function getXPos()
        {
            return this.xPos;
        };

        this.getYPos = function getYPos()
        {
            return this.yPos;
        };

        this.getRenderAngle = function getRenderAngle()
        {
            return this.angle;
        };

        this.getRenderYOffset = function getRenderYOffset()
        {
            return this.renderYOffset;
        };

        this.getRowNum = function getRowNum()
        {
            return this.rowNum;
        };

        this.getWidth = function getWidth()
        {
            return this.width;
        };

        this.getHeight = function getHeight()
        {
            return this.height;
        }
    }

    return RenderedStitchGroup;
});
