require(
    {
        paths: {
            "jquery":               "requireJQuery",
            "keyListener":          "framework/keyListener",
            "instructionEvaluator": "framework/instructionEvaluator",
            "chartRenderer":        "crochet/rendering/chartRenderer",
            "renderedStitch":       "crochet/rendering/renderedStitch",
            "chartModel":           "crochet/chartModel",
            "instructionParser":    "crochet/instructionParser",
            "parseChainFactory":    "crochet/parseChainFactory",
            "stitchUtils":          "crochet/stitchUtils",
            "baseStitch":           "crochet/elements/baseStitch",
            "singleStitch":         "crochet/elements/singleStitch",
            "decreaseStitch":       "crochet/elements/decreaseStitch",
            "increaseStitch":       "crochet/elements/increaseStitch",
            "increaseGroup":        "crochet/elements/increaseGroup"
        }
    },
    ["app"],
    function (app)
    {
        app.start();
    }
);