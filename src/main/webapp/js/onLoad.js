$(document).ready(function()
{

    var chartRenderer = new ChartRenderer();
    var chartModel = new ChartModel(chartRenderer);
    var keyListener = new KeyListener();

    chartRenderer.initialiseCanvasRatio();
    keyListener.addListener(chartModel);

    $("#instructions").keypress(function(event){
        keyListener.onKeyPressed(event);
    });
});