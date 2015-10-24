define(["jquery"], function ($)
{
    var HORIZONTAL_STITCH_GROUP_SPACER = 7;
    var VERTICAL_STITCH_GROUP_SPACER = 5;

    var DEBUG_RENDER = true;

    function renderGridLines(canvasContext, stitchGroup)
    {
        canvasContext.save();

        canvasContext.strokeStyle = '#E0EBEB';

        //vertical
        canvasContext.beginPath();
        canvasContext.moveTo(stitchGroup.getXPos(), stitchGroup.getYPos() + 200);
        canvasContext.lineTo(stitchGroup.getXPos(), stitchGroup.getYPos() - 200);
        canvasContext.stroke();

        canvasContext.restore();
    }

    function renderStitchRotationPoint(canvasContext, renderedStitch)
    {
        console.log("origin: " +renderedStitch.getXPos() + ", " + renderedStitch.getYPos());
        canvasContext.save();

        canvasContext.beginPath();
        canvasContext.arc(renderedStitch.getXRotationPoint(), renderedStitch.getYRotationPoint(), 2, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = 'green';
        canvasContext.fill();
        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = '#003300';
        canvasContext.stroke();

        canvasContext.restore();
    }

    return {
        renderGridLines: renderGridLines,
        renderStitchRotationPoint: renderStitchRotationPoint,
        DEBUG_RENDER: DEBUG_RENDER,
        HORIZONTAL_STITCH_GROUP_SPACER: HORIZONTAL_STITCH_GROUP_SPACER,
        VERTICAL_STITCH_GROUP_SPACER: VERTICAL_STITCH_GROUP_SPACER
    };
});


