/*
 This is the main app entry point from boot.js (loaded by require.js)
 */

define(["jquery", "chartRenderer", "chartModel", "parseChainFactory", "instructionParser", "keyListener", "instructionEvaluator"],
    function ($, ChartRenderer, ChartModel, ParseChainFactory, InstructionParser, KeyListener, InstructionEvaluator)
    {
        var start = function ()
        {
            $(document).ready(function ()
            {
                console.log("Initializing!");

                var chartRenderer = new ChartRenderer();
                var chartModel = new ChartModel();
                var keyListener = new KeyListener();
                var parseChain = new ParseChainFactory().createParseChain(chartModel);
                var instructionParser = new InstructionParser(chartModel, chartRenderer, parseChain);
                var instructionEvaluator = new InstructionEvaluator(instructionParser);

                chartRenderer.initialiseCanvas();
                keyListener.addListener(instructionEvaluator);

                $("#instructions").bind({
                    keypress:  function (event)
                    {
                        keyListener.onKeyPressed(event);
                    },
                    paste: function (event)
                    {
                        keyListener.onKeyPressed(event);
                    },
                    cut:   function (event)
                    {
                        keyListener.onKeyPressed(event);
                    },
                    keydown: function(event)
                    {
                        keyListener.onKeyDown(event);

                    }
                });
            })
        };

        return {"start": start};
    });