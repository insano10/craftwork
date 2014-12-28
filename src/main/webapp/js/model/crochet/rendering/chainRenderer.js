define(["renderedStitch"], function (RenderedStitch)
{
    function ChainRenderer()
    {
        var stitchAngles = {};

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

        this.render = function render(headStitch, canvasContext, renderContext)
        {

            if(headStitch != null)
            {
                headStitch.populateRenderingData(renderContext, true);
                headStitch.render(canvasContext, renderContext);
            }
        };

        this.renderNew = function renderNew(headStitch, tailStitch)
        {
            var stitch = headStitch;

            // #1. Angle of rotation relative to stitches left/right
            while(stitch != null)
            {
                storeInitialAngleOfRotation(stitch);
                stitch = stitch.getNextStitch();
            }

            stitch = tailStitch;

            // #2. Angle of rotation relative to stitches above/below
            while(stitch != null)
            {
                updateAngleOfRotationWrtStitchAbove(stitch);
                stitch = stitch.getPreviousStitch();
            }
        };
    }

    return ChainRenderer;
});