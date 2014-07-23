require(
    {
        paths: {
            "jquery":               "requireJQuery",
            "keyListener":          "framework/keyListener",
            "instructionEvaluator": "framework/instructionEvaluator",
            "chartModel":           "crochet/chartModel",
            "chartRenderer":        "crochet/chartRenderer",
            "instructionParser":    "crochet/instructionParser",
            "mesh":                 "crochet/mesh",
            "parseChainFactory":    "crochet/parseChainFactory",
            "baseStitch":           "crochet/elements/baseStitch",
            "singleStitch":         "crochet/elements/singleStitch",
            "decreaseStitch":         "crochet/elements/decreaseStitch",
            "increaseStitch":         "crochet/elements/increaseStitch"
        }
    },
    ["app"],
    function (app)
    {
        app.start();
    }
);