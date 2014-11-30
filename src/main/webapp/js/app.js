/*
 This is the main app entry point from boot.js (loaded by require.js)
 */

define(["jquery", "chartRenderer", "chartModel", "parseChainFactory", "instructionParser", "keyListener", "instructionEvaluator", "rowNumberSynchroniser", "persistenceHelper", "connectionHelper",
        "view", "uiWidgetBehaviour"],
    function ($, ChartRenderer, ChartModel, ParseChainFactory, InstructionParser, KeyListener, InstructionEvaluator, RowNumberSynchroniser, PersistenceHelper, ConnectionHelper,
              View, UiWidgetBehaviour)
    {
        var toggleLogging = function toggleLogging()
        {
            var DEBUG = false; //turn this to true to enable console logging
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
                var persistenceHelper = new PersistenceHelper(instructionEvaluator);
                var connectionHelper = new ConnectionHelper(persistenceHelper);
                var view = new View(persistenceHelper, rowNumberSynchroniser);
                var uiWidgetBehaviour = new UiWidgetBehaviour(keyListener, persistenceHelper, connectionHelper, view);

                //todo: evil
                persistenceHelper.setView(view);
                connectionHelper.setView(view);

                chartRenderer.initialiseCanvas();
                keyListener.addListener(instructionEvaluator);
                keyListener.addListener(rowNumberSynchroniser);

                uiWidgetBehaviour.initialise();
                connectionHelper.authorise();
            })
        };

        return {"start": start};
    });