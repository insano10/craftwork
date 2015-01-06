require(
    {
        shim:  {
            "bootstrap": { "deps": ['jquery'] }
        },
        paths: {
            "jquery":                "lib/jquery-2.1.0.min",
            "bootstrap":             "lib/bootstrap-3.3.0/js/bootstrap.min",
            "keyListener":           "controller/keyListener",
            "connectionHelper":      "controller/connectionHelper",
            "instructionEvaluator":  "controller/instructionEvaluator",
            "persistenceHelper":     "controller/persistenceHelper",
            "rowNumberSynchroniser": "controller/rowNumberSynchroniser",
            "uiWidgetBehaviour":     "controller/uiWidgetBehaviour",
            "chainRenderer":         "model/crochet/rendering/chainRenderer",
            "chartRenderer":         "model/crochet/rendering/chartRenderer",
            "renderedStitch":        "model/crochet/rendering/renderedStitch",
            "renderContext":         "model/crochet/rendering/renderContext",
            "renderTransforms":      "model/crochet/rendering/renderTransforms",
            "chartModel":            "model/crochet/chartModel",
            "instructionParser":     "model/crochet/instructionParser",
            "parseChainFactory":     "model/crochet/parseChainFactory",
            "stitchUtils":           "model/crochet/stitchUtils",
            "baseStitch":            "model/crochet/elements/baseStitch",
            "singleStitch":          "model/crochet/elements/singleStitch",
            "chainStitch":           "model/crochet/elements/chainStitch",
            "decreaseStitch":        "model/crochet/elements/decreaseStitch",
            "increaseStitch":        "model/crochet/elements/increaseStitch",
            "chainUpStitch":         "model/crochet/elements/chainUpStitch",
            "view":                  "view/view"
        }
    },
    ["app"],
    function (app)
    {
        app.start();
    }
);
