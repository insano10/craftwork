/*
 This is the main app entry point from boot.js (loaded by require.js)
 */

define(["jquery", "chartRenderer", "chartModel", "parseChainFactory", "instructionParser", "keyListener", "instructionEvaluator", "rowNumberSynchroniser", "persistenceHelper", "connectionHelper"],
    function ($, ChartRenderer, ChartModel, ParseChainFactory, InstructionParser, KeyListener, InstructionEvaluator, RowNumberSynchroniser, PersistenceHelper, ConnectionHelper)
    {
        var toggleLogging = function toggleLogging()
        {
            var DEBUG = true; //turn this to true to enable console logging
            if (!DEBUG)
            {
                if (!window.console) window.console = {};
                var methods = ["log", "debug", "warn", "info"];
                for (var i = 0; i < methods.length; i++)
                {
                    console[methods[i]] = function ()
                    {
                    };
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
                var rowNumberSynchroniser = new RowNumberSynchroniser();
                var persistenceHelper = new PersistenceHelper();
                var connectionHelper = new ConnectionHelper();

                chartRenderer.initialiseCanvas();
                keyListener.addListener(instructionEvaluator);
                keyListener.addListener(rowNumberSynchroniser);

                //put this somewhere else as it is referencing UI elements
                $("#instructions").bind({
                    keypress: function (event)
                    {
                        keyListener.onKeyPressed(event);
                    },
                    paste:    function (event)
                    {
                        keyListener.onKeyPressed(event);
                    },
                    cut:      function (event)
                    {
                        keyListener.onKeyPressed(event);
                    },
                    keydown:  function (event)
                    {
                        keyListener.onKeyDown(event);

                    },
                    scroll:   function ()
                    {
                        $('#row-numbers').scrollTop($(this).scrollTop());
                    }
                });

                $("#row-numbers").append("<p>row 1:</p>");

                $("#save-button").bind({
                    click: function (event)
                    {
                        persistenceHelper.saveInstructions();
                    }
                });

                $("#save-title-button").bind({
                    click: function (event)
                    {
                        persistenceHelper.updateTitle();
                    }
                });

                $("#logout-button").bind({
                    click: function (event)
                    {
                        connectionHelper.disconnectServer();
                    }
                });
            })
        };

        return {"start": start};
    });