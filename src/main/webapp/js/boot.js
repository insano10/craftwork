require(
    {
        paths:
        {
            "jquery":               "requireJQuery",
            "chartRenderer":        "crochet/chartRenderer",
            "chartModel":           "crochet/chartModel",
            "instructionEvaluator": "crochet/instructionEvaluator",
            "singleCrochet":        "crochet/elements/singleCrochet",
            "keyListener":          "framework/keyListener"
        }
    },
    ["app"],
    function(app)
    {
        app.start();
    }
);