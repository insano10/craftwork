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
            "chain":                "crochet/elements/chain",
            "crochetRow":           "crochet/elements/crochetRow",
            "singleCrochet":        "crochet/elements/singleCrochet",
            "stitch":               "crochet/elements/stitch"
        }
    },
    ["app"],
    function (app)
    {
        app.start();
    }
);