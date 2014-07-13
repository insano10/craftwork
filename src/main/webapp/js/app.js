/*
This is the main app entry point from boot.js (loaded by require.js)
 */

define(["jquery",
        "crochet/chartRenderer",
        "crochet/chartModel",
        "framework/keyListener",
        "framework/instructionEvaluator"],
        function ($, ChartRenderer, ChartModel, KeyListener, InstructionEvaluator)
{
    var start = function ()
    {
        $(document).ready(function ()
        {
            console.log("Initializing!");

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
        })
    };

    return {"start": start};
});