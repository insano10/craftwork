define(["jquery"], function($)
{
   function SingleCrochet()
   {
       /*
       PRIVATE
        */
       var ICON_SIZE = 13;
       var icon = null;

       var getXOffset = function getXOffset()
       {
           return 50;
       };

       var getYOffset = function getYOffset()
       {
           return 10;
       };

       /*
       PRIVILEGED
        */

       this.render = function render(canvasContext, rowNum, rowIndex, maxYPos)
       {
           var xpos = rowIndex*ICON_SIZE + getXOffset();
           var ypos = maxYPos - rowNum*ICON_SIZE - getYOffset();

           canvasContext.drawImage(icon, xpos, ypos);
       };

       this.toString = function toString()
       {
        return "SINGLE";
       };

       this.loadSprites = function loadSprites()
       {
           icon = new Image();
           icon.src = "../../../../images/sc.png";
       };

       this.loadSprites();
   }

    return SingleCrochet;
});