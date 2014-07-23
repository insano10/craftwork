define(["jquery", "crochetRow"], function ($, CrochetRow)
{
    function Mesh()
    {
        var headStitch = null;
        var tailStitch = null;

        this.clear = function clear()
        {
            headStitch = null;
            tailStitch = null;
        };

        this.addStitch = function addStitch(stitch, rowNum)
        {
            console.log("Appending stitch " + stitch.toString());

            if(headStitch == null)
            {
                headStitch = stitch;
                tailStitch = stitch;
            }
            else
            {
                tailStitch.setNextStitch(stitch, rowNum);
                stitch.connectToChain(tailStitch);
                tailStitch = stitch;
            }
        };

        this.render = function render(canvasContext, renderContext)
        {
            headStitch.render(canvasContext, renderContext);
        };

    }

    return Mesh;
});