require(
    {
        paths: {
            "jquery":               "requireJQuery",
            "keyListener":          "framework/keyListener",
            "instructionEvaluator": "framework/instructionEvaluator",
            "chartRenderer":        "crochet/rendering/chartRenderer",
            "renderedStitch":       "crochet/rendering/renderedStitch",
            "renderContext":        "crochet/rendering/renderContext",
            "chartModel":           "crochet/chartModel",
            "instructionParser":    "crochet/instructionParser",
            "parseChainFactory":    "crochet/parseChainFactory",
            "stitchUtils":          "crochet/stitchUtils",
            "baseStitch":           "crochet/elements/baseStitch",
            "singleStitch":         "crochet/elements/singleStitch",
            "chainStitch":          "crochet/elements/chainStitch",
            "decreaseStitch":       "crochet/elements/decreaseStitch",
            "increaseStitch":       "crochet/elements/increaseStitch",
            "chainUpStitch":        "crochet/elements/chainUpStitch"
        }
    },
    ["app"],
    function (app)
    {
        app.start();
    }
);