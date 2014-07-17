require(
    {
        paths:
        {
            "jquery":               "requireJQuery",
            "chartRenderer":        "crochet/chartRenderer",
            "chartModel":           "crochet/chartModel",
            "instructionParser":    "crochet/instructionParser",
            "instructionEvaluator": "framework/instructionEvaluator",
            "mesh":                 "crochet/mesh",
            "crochetRow":           "crochet/elements/crochetRow",
            "singleCrochet":        "crochet/elements/singleCrochet",
            "chain":                "crochet/elements/chain",
            "keyListener":          "framework/keyListener"
        }
    },
    ["app"],
    function(app)
    {
        app.start();
    }
);