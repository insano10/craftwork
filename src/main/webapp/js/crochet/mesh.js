define(["jquery", "crochetRow"], function($, CrochetRow)
{
   function Mesh()
   {
       var rows = {};


       this.clear = function clear()
       {
           rows = {};
       };

       this.addStitch = function addStitch(stitch, rowNum, rowIdx)
       {
           console.log("Appending stitch " + stitch.toString() + " to row " + rowNum + " at index " + rowIdx);

           if(rows[rowNum] == null)
           {
               rows[rowNum] = new CrochetRow(rowNum);
           }
           rows[rowNum].appendStitch(stitch);
       };

       this.render = function render(ctx, maxYPos)
       {
           for (var rowNum in rows)
           {
               rows[rowNum].render(ctx, maxYPos);
           }
       };

   }

   return Mesh;
});