define(["jquery"], function($)
{
    function RenderedStitch(renderPosition, angle, width, height, rowNum, renderYOffset)
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

        this.getMidXPos = function getMidXPos()
        {
            return this.xPos + (0.5 * this.width);
        };

        this.getMidYPos = function getMidYPos()
        {
            return this.yPos + (0.5 * this.height);
        };

        this.getRenderAngle = function getRenderAngle()
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
        };

        this.getXRotationPoint = function getXRotationPoint()
        {
            if(this.rowNum%2 != 0)
            {
                return this.xPos;
            }
            else
            {
                return this.xPos - this.getXRotationLength() + this.width;
            }
        };

        this.getYRotationPoint = function getYRotationPoint()
        {
            if(this.rowNum%2 != 0)
            {
                return this.yPos;
            }
            else
            {
                return this.yPos - this.getYRotationLength();
            }
        };

        this.getXRenderPointAfterTranslation = function getXRenderPointAfterTranslation()
        {
            if(this.rowNum%2 != 0)
            {
                return 0;
            }
            else
            {
                return this.getXRotationLength() - this.width;
            }
        };

        this.getYRenderPointAfterTranslation = function getYRenderPointAfterTranslation()
        {
            if(this.rowNum%2 != 0)
            {
                return 0;
            }
            else
            {
                return this.getYRotationLength();
            }
        };

        this.getRenderYOffset = function getRenderYOffset()
        {
            return this.renderYOffset;
        };

        this.getRowNum = function getRowNum()
        {
            return this.rowNum;
        };

        this.getHeight = function getHeight()
        {
            return this.height;
        }
    }

    return RenderedStitch;
});
