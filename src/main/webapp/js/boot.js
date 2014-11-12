require(
    {
        shim : {
            "bootstrap" : { "deps" :['jquery'] }
        },
        paths: {
            "jquery":                "requireJQuery",
            "bootstrap":             "lib/bootstrap-3.3.0/js/bootstrap.min",
            "keyListener":           "framework/keyListener",
            "instructionEvaluator":  "framework/instructionEvaluator",
            "rowNumberSynchroniser": "framework/rowNumberSynchroniser",
            "chartRenderer":         "crochet/rendering/chartRenderer",
            "renderedStitch":        "crochet/rendering/renderedStitch",
            "renderContext":         "crochet/rendering/renderContext",
            "chartModel":            "crochet/chartModel",
            "instructionParser":     "crochet/instructionParser",
            "parseChainFactory":     "crochet/parseChainFactory",
            "stitchUtils":           "crochet/stitchUtils",
            "baseStitch":            "crochet/elements/baseStitch",
            "singleStitch":          "crochet/elements/singleStitch",
            "chainStitch":           "crochet/elements/chainStitch",
            "decreaseStitch":        "crochet/elements/decreaseStitch",
            "increaseStitch":        "crochet/elements/increaseStitch",
            "chainUpStitch":         "crochet/elements/chainUpStitch",
            "connectionHelper":      "siteActions/connectionHelper",
            "persistenceHelper":     "siteActions/persistenceHelper"
        }
    },
    ["app"],
    function (app)
    {
        app.start();
    }
);