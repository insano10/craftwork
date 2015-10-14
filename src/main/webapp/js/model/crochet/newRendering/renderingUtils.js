define(["jquery"], function ($)
{

    function renderGridLine(canvasContext, renderedStitch)
    {
        canvasContext.save();

        canvasContext.beginPath();
        canvasContext.moveTo(renderedStitch.getXPos(), renderedStitch.getYPos() + 100);
        canvasContext.lineTo(renderedStitch.getXPos(), renderedStitch.getYPos() - 100);
        canvasContext.strokeStyle = '#E0EBEB';
        canvasContext.stroke();

        canvasContext.restore();
    }

    function renderStitchOrigin(canvasContext, renderedStitch)
    {
        console.log("origin: " +renderedStitch.getXPos() + ", " + renderedStitch.getYPos());
        canvasContext.save();

        canvasContext.beginPath();
        canvasContext.arc(renderedStitch.getXPos(), renderedStitch.getYPos(), 2, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = 'green';
        canvasContext.fill();
        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = '#003300';
        canvasContext.stroke();

        canvasContext.restore();
    }

    return {
        renderGridLine: renderGridLine,
        renderStitchOrigin: renderStitchOrigin
    };
});


