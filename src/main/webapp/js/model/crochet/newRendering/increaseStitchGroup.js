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

               IncreaseStitchGroup.prototype.close = function close()
               {
                   this.renderer = new IncreaseStitchRenderer(this.stitches);
                   this.preRenderHelper = new IncreaseStitchPreRenderHelper();
               };

               return IncreaseStitchGroup;

           })();
       });


