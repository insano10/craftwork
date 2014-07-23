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
            "crochetRow":           "crochet/elements/crochetRow",
            "stitch":               "crochet/elements/stitch"
        }
    },
    ["app"],
    function (app)
    {
        app.start();
    }
);