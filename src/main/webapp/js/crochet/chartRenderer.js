define(function ()
{
    function ChartRenderer()
    {
        var MAX_X_POS = 0;
        var MAX_Y_POS = 0;

        var getPixelRatio = function ()
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

        var createHiPPICanvas = function ()
        {
            var canvas = document.getElementById("chart-canvas");
            var pixelRatio = getPixelRatio();

            var mainDiv = $(".main-content-div");
            var currentWidth = mainDiv.width();
            var currentHeight = mainDiv.height();

            var fullWidth = currentWidth * pixelRatio;
            var fullHeight = currentHeight * pixelRatio;
            canvas.style.width = currentWidth + "px";
            canvas.style.height = currentHeight + "px";
            canvas.width = fullWidth;
            canvas.height = fullHeight;
            canvas.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        };

        /*
         PRIVILEGED
         */

        this.initialiseCanvas = function initialiseCanvas()
        {
            createHiPPICanvas()
            ;
            var chartCanvas = document.getElementById("chart-canvas");
            MAX_X_POS = chartCanvas.width;
            MAX_Y_POS = chartCanvas.height;
        };

        this.renderStitches = function renderStitches(rowStitches)
        {
            var chartCanvas = document.getElementById("chart-canvas");
            var ctx = chartCanvas.getContext("2d");

            ctx.save();
            ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

            for (var row in rowStitches)
            {
                for (var i = 0; i < rowStitches[row].length; i++)
                {
                    rowStitches[row][i].drawToCanvas(ctx, row, i, MAX_X_POS, MAX_Y_POS);
                }
            }

            ctx.restore();
        };
    }

    return ChartRenderer;
});