var allTestFiles = [];
var TEST_REGEXP = /src\/test\/webapp\/js\/.*(spec|test)\.js$/i;

var pathToModule = function (path)
{
    return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function (file)
{
    if (TEST_REGEXP.test(file))
    {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});

console.log("Test files: " + allTestFiles);

require.config(
    {
        // Karma serves files under /base, which is the basePath from your config file
        baseUrl: '/base',

        paths:    {
            "jquery":            "src/main/webapp/js/lib/jquery-2.1.0.min",
            "keyListener":       "src/main/webapp/js/controller/keyListener",
            "instructionParser": "src/main/webapp/js/model/crochet/instructionParser",
            "parseChainFactory": "src/main/webapp/js/model/crochet/parseChainFactory",
            "stitchUtils":       "src/main/webapp/js/model/crochet/stitchUtils",
            "renderedStitch":    "src/main/webapp/js/model/crochet/rendering/renderedStitch",
            "renderContext":     "src/main/webapp/js/model/crochet/rendering/renderContext",
            "baseStitch":        "src/main/webapp/js/model/crochet/elements/baseStitch",
            "decreaseStitch":    "src/main/webapp/js/model/crochet/elements/decreaseStitch",
            "increaseStitch":    "src/main/webapp/js/model/crochet/elements/increaseStitch",
            "singleStitch":      "src/main/webapp/js/model/crochet/elements/singleStitch",
            "chainStitch":       "src/main/webapp/js/model/crochet/elements/chainStitch",
            "chainUpStitch":     "src/main/webapp/js/model/crochet/elements/chainUpStitch"
        },

        // dynamically load all test files
        deps:     allTestFiles,

        // we have to kickoff jasmine, as it is asynchronous
        callback: window.__karma__.start
    });