define(["jquery", "stitchUtils"], function ($, StitchUtils)
{
    function STRAIGHT()
    {
        function straight(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("EVEN_STR_STR: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(0);
            canvasContext.drawImage(stitch.getIcon(), -stitch.getWidth(), 0);
        }

        function up(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("EVEN_STR_UP: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function down(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("EVEN_STR_DOWN: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            var stitchHeight = previousStitch == null ? stitch.getHeight() : previousStitch.getHeight();

            canvasContext.translate(translation.x, translation.y + stitchHeight); //bottom corner
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, -stitchHeight);      //offset by -height
            canvasContext.translate(0, -stitchHeight); //return to top corner
        }

        function getId()
        {
            return "EVEN_STR";
        }

        return { straight: straight, up: up, down: down, getId: getId};
    }

    function DOWN()
    {
        function straight(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("EVEN_DOWN_DOWN: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(0);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function up(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("EVEN_DOWN_UP: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function down(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("EVEN_DOWN_DOWN: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            var stitchHeight = previousStitch == null ? stitch.getHeight() : previousStitch.getHeight();
            canvasContext.translate(translation.x, translation.y + stitchHeight);         //bottom corner
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, -stitchHeight);      //offset by -height
            canvasContext.translate(0, -stitchHeight); //return to top corner
        }

        function getId()
        {
            return "EVEN_DOWN";
        }

        return { straight: straight, up: up, down: down, getId: getId};
    }

    function UP()
    {
        function straight(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("EVEN_UP_STR: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(0);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function up(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("EVEN_UP_UP: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function down(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("EVEN_UP_DOWN: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            var stitchHeight = previousStitch == null ? stitch.getHeight() : previousStitch.getHeight();
            canvasContext.translate(translation.x, translation.y + stitchHeight);         //bottom corner
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, -stitchHeight);      //offset by -height
            canvasContext.translate(0, -stitchHeight); //return to top corner
        }

        function getId()
        {
            return "EVEN_UP";
        }

        return { straight: straight, up: up, down: down, getId: getId};
    }

    return { STRAIGHT: STRAIGHT, DOWN: DOWN, UP: UP };
});
