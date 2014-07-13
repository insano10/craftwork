function ChartRenderer()
{
    var getPixelRatio = function()
    {
        var ctx = document.getElementById("chart-canvas").getContext("2d"),
            dpr = window.devicePixelRatio || 1,
            bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;

        return dpr / bsr;
    };

    var createHiPPICanvas = function(canvas)
    {
        var pixelRatio = getPixelRatio();

        var fullWidth = canvas.width * pixelRatio;
        var fullHeight = canvas.height * pixelRatio;
        canvas.style.width = canvas.width + "px";
        canvas.style.height = canvas.height + "px";
        canvas.width = fullWidth;
        canvas.height = fullHeight;
        canvas.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    /*
    PRIVILEGED
     */

    this.initialiseCanvasRatio = function initialiseCanvasRatio()
    {
        createHiPPICanvas(document.getElementById("chart-canvas"));
    };

    this.drawCharacter = function drawChar(char)
    {
        var chartCanvas = document.getElementById("chart-canvas");
        var ctx = chartCanvas.getContext("2d");

        ctx.save();
        ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

        ctx.font="40px Georgia";
        ctx.fillText(char, 50, 50);

        ctx.restore();
    }
}