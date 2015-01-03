define(["renderedStitch", "stitchUtils"], function (RenderedStitch, StitchUtils)
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
            console.log(stitch.toString() + " initial angle = " + stitchAngles[stitch.getId()]);
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
            console.log(stitch.toString() + " updated angle = " + stitchAngles[stitch.getId()]);
        };

        var renderIcon = function renderIcon(canvasContext, stitch, translation)
        {
            console.log("translating icon x: " + translation.x + ", y: " + translation.y + " at relative angle " + stitchRelativeRotations[stitch.getId()]);

            canvasContext.rotate(stitchRelativeRotations[stitch.getId()] * Math.PI / 180);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        };

        var drawLoop = function drawLoop(startStitch, startTranslation, canvasContext)
        {
            var stitch = startStitch;
            var translation = startTranslation;

            canvasContext.save();
            while(stitch != null)
            {
                if(!draw(stitch, canvasContext, translation))
                {
                    break;
                }
                else
                {
                    //update translation
                    translation = getTranslationFrom(stitch, stitch.getNextStitch());
                    stitch = stitch.getNextStitch();
                }
            }
            canvasContext.restore();

            if(stitch != null)
            {
                //not all stitches have been drawn, continue in another event loop once images are ready
                setTimeout(function ()
                {
                    drawLoop(stitch, translation, canvasContext);
                }, 100);
            }
        };

        var draw = function draw(stitch, canvasContext, translation)
        {
            if(stitch.getIcon().complete)
            {
                renderIcon(canvasContext, stitch, translation);
                return true;
            }
            return false;
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
                    var extraXTranslation = 0;
                    if(toStitch.getStitchesBelow().length > 1)
                    {
                        extraXTranslation += StitchUtils.getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(toStitch.getStitchesBelow().length, toStitch.getRowNum(), toStitch.getWidth());
                    }
                    if(fromStitch.getStitchesBelow().length > 1)
                    {
                        extraXTranslation += StitchUtils.getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(fromStitch.getStitchesBelow().length, fromStitch.getRowNum(), fromStitch.getWidth());
                    }

                    if (fromStitch.getRowNum() % 2 != 0)
                    {
                        //go right
                        translation.x = fromStitch.getWidth() + extraXTranslation;
                    }
                    else
                    {
                        //go left
                        translation.x = -toStitch.getWidth() + extraXTranslation;
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
                console.log(stitch.toString() + " relative angle = " + stitchRelativeRotations[stitch.getId()]);

                stitch = stitch.getNextStitch();
            }

            // #4. Draw each stitch at the appropriate angle
            var translation = {x: renderContext.getStartXPos(), y: renderContext.getStartYPos()};
            drawLoop(headStitch, translation, canvasContext);
        };

        var foo = function foo(canvasContext, stitch)
        {
            /*
            The corner you translate the canvas to when drawing is important.
            So is the offset at which you draw.

            1. Start at the top left corner of the first stitch
            2. translate to the corner of the next stitch you want to rotate around
               - increase = bottom corner (bend down)
               - decrease = top corner (bend up)
            3. rotate the appropriate angle
            4. draw the image (with an offset if you are drawing from the bottom corner)
            5. continue from step 2


            work out starting point
            determine whether relative angle of this stitch to previous is positive or negative
            positive = increase transitions
            negative = decrease transitions
            run appropriate transformations/rotations/draw with offset
            continue
             */

            //straight
            canvasContext.translate(70, 240);
            canvasContext.rotate(0 * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);

            //increase
            canvasContext.translate(stitch.getWidth(), stitch.getHeight());         //bottom corner
            canvasContext.rotate(20 * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, -stitch.getHeight());      //offset by -height

            //straight
            canvasContext.translate(stitch.getWidth(), -stitch.getHeight());
            canvasContext.rotate(0 * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);

            //decrease
            canvasContext.translate(stitch.getWidth(), 0);
            canvasContext.rotate(-20 * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);

            //straight
            canvasContext.translate(stitch.getWidth(), 0);
            canvasContext.rotate(0 * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
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