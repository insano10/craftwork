define(["jquery"], function ($)
{
    function RenderGroup(type)
    {
        this.type = type;
        this.stitches = [];
        this.previousGroup = null;
        this.nextGroup = null;

        this.accept = function accept(stitch)
        {
            if (stitch.getType() == "INCREASE" && this.type == "INCREASE")
            {
                //group allows multiple stitches of the same type
                this.stitches.push(stitch);
                return true;
            }
            else
            {
                //group allows 1 stitch only
                if (this.stitches.length == 0)
                {
                    this.stitches.push(stitch);
                    return true;
                }
            }
            return false;
        };

        this.setPreviousGroup = function setPreviousGroup(group)
        {
            this.previousGroup = group;
        };

        this.setNextGroup = function setNextGroup(group)
        {
            this.nextGroup = group;
        };

        this.render = function render(canvasContext, renderContext)
        {
            for (var i = 0; i < this.stitches.length; i++)
            {
                this.stitches[i].render(canvasContext, renderContext);
            }

            if(this.nextGroup != null)
            {
                this.nextGroup.render(canvasContext, renderContext);
            }
        };
    }

    return RenderGroup;
});


