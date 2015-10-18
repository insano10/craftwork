define(["jquery", "stitchGroup", "increaseStitchRenderer", "increaseStitchPreRenderHelper"], function ($, StitchGroup, IncreaseStitchRenderer, IncreaseStitchPreRenderHelper)
       {
           return (function ()
           {
               function IncreaseStitchGroup()
               {
                   StitchGroup.call(this);
               }

               IncreaseStitchGroup.prototype = Object.create(StitchGroup.prototype);
               IncreaseStitchGroup.prototype.constructor = IncreaseStitchGroup;


               IncreaseStitchGroup.prototype.accept = function accept(stitch)
               {
                   //only accept increase stitches
                   return stitch.getType() == "INCREASE";
               };

               IncreaseStitchGroup.prototype.close = function close(tailStitch)
               {
                   this.renderer = new IncreaseStitchRenderer(this.stitches);
                   this.preRenderHelper = new IncreaseStitchPreRenderHelper();

                   //connect to row below
                   for (var i = 0; i < this.stitches.length; i++)
                   {
                       this.stitches[i].connectToRowBelow(tailStitch);
                   }
               };

               return IncreaseStitchGroup;

           })();
       });


