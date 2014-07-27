require(
    {
        paths: {
            "jquery":               "requireJQuery",
            "keyListener":          "framework/keyListener",
            "instructionEvaluator": "framework/instructionEvaluator",
            "chartModel":           "crochet/chartModel",
            "chartRenderer":        "crochet/chartRenderer",
            "instructionParser":    "crochet/instructionParser",
            "parseChainFactory":    "crochet/parseChainFactory",
            "stitchUtils":          "crochet/stitchUtils",
            "baseStitch":           "crochet/elements/baseStitch",
            "singleStitch":         "crochet/elements/singleStitch",
            "decreaseStitch":       "crochet/elements/decreaseStitch",
            "increaseStitch":       "crochet/elements/increaseStitch"
        }
    },
    ["app"],
    function (app)
    {
        app.start();
    }
);