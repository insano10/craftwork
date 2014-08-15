var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

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
            "jquery":            "src/test/webapp/js/requireJQuery",
            "keyListener":       "src/main/webapp/js/framework/keyListener",
            "instructionParser": "src/main/webapp/js/crochet/instructionParser",
            "parseChainFactory": "src/main/webapp/js/crochet/parseChainFactory",
            "stitchUtils":       "src/main/webapp/js/crochet/stitchUtils",
            "baseStitch":        "src/main/webapp/js/crochet/elements/baseStitch",
            "decreaseStitch":    "src/main/webapp/js/crochet/elements/decreaseStitch",
            "increaseStitch":    "src/main/webapp/js/crochet/elements/increaseStitch",
            "increaseGroup":     "src/main/webapp/js/crochet/elements/increaseGroup",
            "singleStitch":      "src/main/webapp/js/crochet/elements/singleStitch"
        },

        // dynamically load all test files
        deps:     allTestFiles,

        // we have to kickoff jasmine, as it is asynchronous
        callback: window.__karma__.start
    });