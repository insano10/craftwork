/*
 This is the main app entry point from boot.js (loaded by require.js)
 */

define(["jquery", "chartRenderer", "chartModel", "parseChainFactory", "instructionParser", "keyListener", "instructionEvaluator"],
    function ($, ChartRenderer, ChartModel, ParseChainFactory, InstructionParser, KeyListener, InstructionEvaluator)
    {
        var toggleLogging = function toggleLogging()
        {
            var DEBUG = false; //turn this to true to enable console logging
            if(!DEBUG){
                if(!window.console) window.console = {};
                var methods = ["log", "debug", "warn", "info"];
                for(var i=0;i<methods.length;i++){
                    console[methods[i]] = function(){};
                }
            }
        };

        var start = function ()
        {
            $(document).ready(function ()
            {
                console.log("Initializing!");

                toggleLogging();

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

                    },
                    scroll: function()
                    {
                        $('#row-numbers').scrollTop($(this).scrollTop());
                    }
                });

                $("#row-numbers").append("<p>row 1:</p>");
            })
        };

        return {"start": start};
    });