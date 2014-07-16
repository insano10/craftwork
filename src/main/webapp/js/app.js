/*
This is the main app entry point from boot.js (loaded by require.js)
 */

define(["jquery", "chartRenderer", "chartModel", "instructionParser", "keyListener", "instructionEvaluator"],
        function ($, ChartRenderer, ChartModel, InstructionParser, KeyListener, InstructionEvaluator)
{
    var start = function ()
    {
        $(document).ready(function ()
        {
            console.log("Initializing!");

            var chartRenderer = new ChartRenderer();
            var chartModel = new ChartModel(chartRenderer);
            var keyListener = new KeyListener();
            var instructionParser = new InstructionParser(chartModel);
            var instructionEvaluator = new InstructionEvaluator(instructionParser);

            chartRenderer.initialiseCanvas();
            keyListener.addListener(instructionEvaluator);

            $("#instructions").keypress(function(event){
                keyListener.onKeyPressed(event);
            });
        })
    };

    return {"start": start};
});