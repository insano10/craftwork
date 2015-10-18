define(["jquery"], function ($)
{
    var DEBUG_RENDER = true;

    function renderGridLines(canvasContext, renderedStitch)
    {
        canvasContext.save();

        canvasContext.strokeStyle = '#E0EBEB';

        //vertical
        canvasContext.beginPath();
        canvasContext.moveTo(renderedStitch.getXPos(), renderedStitch.getYPos() + 100);
        canvasContext.lineTo(renderedStitch.getXPos(), renderedStitch.getYPos() - 100);
        canvasContext.stroke();

        //horizontal
        canvasContext.beginPath();
        canvasContext.moveTo(renderedStitch.getXPos() + 100, renderedStitch.getYPos());
        canvasContext.lineTo(renderedStitch.getXPos() - 100, renderedStitch.getYPos());
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
        renderGridLines: renderGridLines,
        renderStitchOrigin: renderStitchOrigin,
        DEBUG_RENDER: DEBUG_RENDER
    };
});


