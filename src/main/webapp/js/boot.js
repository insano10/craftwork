require(
    {
        paths:
        {
            "jquery":               "requireJQuery",
            "chartRenderer":        "crochet/chartRenderer",
            "chartModel":           "crochet/chartModel",
            "instructionEvaluator": "crochet/instructionEvaluator",
            "keyListener":          "framework/keyListener"
        }
    },
    ["app"],
    function(app)
    {
        app.start();
    }
);