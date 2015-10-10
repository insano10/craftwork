/*
 This is the main app entry point from boot.js (loaded by require.js)
 */

define(["jquery", "chainRenderer", "chartRenderer", "chartModel", "parseChainFactory", "instructionParser", "keyListener", "instructionEvaluator", "rowNumberSynchroniser",
        "persistenceHelper", "connectionHelper", "view", "uiWidgetBehaviour"],
    function ($, ChainRenderer, ChartRenderer, ChartModel, ParseChainFactory, InstructionParser, KeyListener, InstructionEvaluator, RowNumberSynchroniser,
              PersistenceHelper, ConnectionHelper, View, UiWidgetBehaviour)
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

                var chainRenderer = new ChainRenderer();
                var chartRenderer = new ChartRenderer();
                var chartModel = new ChartModel(chainRenderer);
                var keyListener = new KeyListener();
                var parseChain = new ParseChainFactory().createParseChain(chartModel);

                var rowNumberSynchroniser = new RowNumberSynchroniser();
                var view = new View(rowNumberSynchroniser);

                var instructionParser = new InstructionParser(chartModel, chartRenderer, parseChain);
                var instructionEvaluator = new InstructionEvaluator(instructionParser);

                var persistenceHelper = new PersistenceHelper(instructionEvaluator, view);
                var connectionHelper = new ConnectionHelper(persistenceHelper, view);
                var uiWidgetBehaviour = new UiWidgetBehaviour(keyListener, persistenceHelper, connectionHelper, view);

                chartRenderer.initialiseCanvas();
                keyListener.addListener(instructionEvaluator);
                keyListener.addListener(rowNumberSynchroniser);

                view.initialise();
                uiWidgetBehaviour.initialise();

                gapi.load('auth2', function(){
                    // Retrieve the singleton for the GoogleAuth library and set up the client.
                    auth2 = gapi.auth2.init({
                        client_id: '167961214562-grbr91oci2183eqd580k8r7vvfsqmvsi.apps.googleusercontent.com',
                        cookiepolicy: 'single_host_origin'
                    });
                    uiWidgetBehaviour.attachSignInHandler();
                });
            })
        };

        return {"start": start};
    });