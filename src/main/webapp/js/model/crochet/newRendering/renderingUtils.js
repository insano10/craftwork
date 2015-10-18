define(["jquery"], function ($)
{
    var DEBUG_RENDER = true;

    function renderGridLines(canvasContext, renderedStitch)
    {
        canvasContext.save();

        canvasContext.strokeStyle = '#E0EBEB';

        //vertical
        canvasContext.beginPath();
        canvasContext.moveTo(renderedStitch.getXRotationPoint(), renderedStitch.getYRotationPoint() + 200);
        canvasContext.lineTo(renderedStitch.getXRotationPoint(), renderedStitch.getYRotationPoint() - 200);
        canvasContext.stroke();

        //horizontal
        //canvasContext.beginPath();
        //canvasContext.moveTo(renderedStitch.getXRotationPoint() + 200, renderedStitch.getYRotationPoint());
        //canvasContext.lineTo(renderedStitch.getXRotationPoint() - 200, renderedStitch.getYRotationPoint());
        //canvasContext.stroke();

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
        DEBUG_RENDER: DEBUG_RENDER
    };
});


