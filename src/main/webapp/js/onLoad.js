$(document).ready(function()
{

    var chartRenderer = new ChartRenderer();
    var chartModel = new ChartModel(chartRenderer);
    var keyListener = new KeyListener();
    var instructionEvaluator = new InstructionEvaluator();

    chartRenderer.initialiseCanvasRatio();
    keyListener.addListener(chartModel);
    keyListener.addListener(instructionEvaluator);

    $("#instructions").keypress(function(event){
        keyListener.onKeyPressed(event);
    });
});