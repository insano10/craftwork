define(["renderedStitch"], function (RenderedStitch)
{
    function ChainRenderer()
    {
        var stitchAngles = {};
        var stitchRelativeRotations = {};

        var getAngleOfRotation = function getAngleOfRotation(stitch)
        {
            var lastStitch = stitch.getPreviousStitch();

            if (lastStitch != null)
            {
                var angle = stitchAngles[lastStitch.getId()];

                if (lastStitch.getStitchesBelow().length > 1)
                {
                    //decrease angle by 10 degrees for each decrease
                    if (this.rowNum % 2 != 0)
                    {
                        //to the right
                        angle -= (10 * (lastStitch.getStitchesBelow().length - 1));
                    }
                    else
                    {
                        //to the left
                        angle += (10 * (lastStitch.getStitchesBelow().length - 1));
                    }
                    console.log("decrease detected, angle is now: " + angle);
                }
                else
                {
                    console.log("normal stitch, maintaining angle of: " + angle);
                }
                return  angle;
            }
            else
            {
                return 0;
            }
        };

        var storeInitialAngleOfRotation = function storeInitialAngleOfRotation(stitch)
        {
            stitchAngles[stitch.getId()] = getAngleOfRotation(stitch);
        };

        var updateAngleOfRotationWrtStitchAbove = function updateAngleOfRotationWrtStitchAbove(stitch)
        {
            var stitchesAbove = stitch.getStitchesAbove();

            if(stitchesAbove.length == 1)
            {
                var aboveAngle = stitchAngles[stitchesAbove[0].getId()];

                if (aboveAngle != 0)
                {
                    console.log(stitch.toString() + " is going to be modified as angle above is " + aboveAngle);

                    stitchAngles[stitch.getId()] = aboveAngle;
                }
                else
                {
                    console.log(stitch.toString() + " is going to be left alone as angle above is 0");
                }
            }
            else
            {
                console.log(stitch.toString() + " is going to be left alone as it does not have exactly 1 stitch above it");
            }
        };

        var renderIcon = function renderIcon(canvasContext, stitch, translation)
        {
            console.log("translating icon x: " + translation.x + ", y: " + translation.y + " at relative angle " + stitchRelativeRotations[stitch.getId()]);

            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(stitchRelativeRotations[stitch.getId()] * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        };

        var draw = function draw(stitch, canvasContext, translation)
        {
            while(!stitch.getIcon().complete)
            {
                //this will probably not work very well
            }
            renderIcon(canvasContext, stitch, translation);
        };

        var getTranslationFrom = function getTranslationFrom(fromStitch, toStitch)
        {
            var translation = {x:0, y:0};

            if(toStitch != null)
            {
                if (fromStitch.getRowNum() < toStitch.getRowNum())
                {
                    //go upwards
                    translation.y = -toStitch.getHeight();
                }
                else
                {
                    if (fromStitch.getRowNum() % 2 != 0)
                    {
                        //go right
                        translation.x = fromStitch.getWidth();
                    }
                    else
                    {
                        //go left
                        translation.x = -toStitch.getWidth();
                    }
                }
            }
            return translation;
        };

        this.renderNew = function renderNew(headStitch, tailStitch, canvasContext, renderContext)
        {
            stitchAngles = {};
            stitchRelativeRotations = {};

            // #1. Angle of rotation relative to stitches left/right
            var stitch = headStitch;
            while(stitch != null)
            {
                storeInitialAngleOfRotation(stitch);
                stitch = stitch.getNextStitch();
            }

            // #2. Angle of rotation relative to stitches above/below
            stitch = tailStitch;
            while(stitch != null)
            {
                updateAngleOfRotationWrtStitchAbove(stitch);
                stitch = stitch.getPreviousStitch();
            }

            //#3. Convert stitch angles into relative rotations
            stitch = headStitch;
            while(stitch != null)
            {
                var previousStitch = stitch.getPreviousStitch();

                if(previousStitch != null)
                {
                    var previousAngle = stitchAngles[previousStitch.getId()];
                    var currentAngle = stitchAngles[stitch.getId()];
                    stitchRelativeRotations[stitch.getId()] = currentAngle - previousAngle;
                }
                else
                {
                    stitchRelativeRotations[stitch.getId()] = 0;
                }

                stitch = stitch.getNextStitch();
            }

            // #4. Draw each stitch at the appropriate angle
            stitch = headStitch;
            var translation = {x: renderContext.getStartXPos(), y: renderContext.getStartYPos()};
            canvasContext.save();
            while(stitch != null)
            {
                draw(stitch, canvasContext, translation);

                //update translation
                translation = getTranslationFrom(stitch, stitch.getNextStitch());
                stitch = stitch.getNextStitch();
            }
            canvasContext.restore();
        };

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