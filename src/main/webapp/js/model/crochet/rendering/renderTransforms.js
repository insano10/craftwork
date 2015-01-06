define(["jquery", "stitchUtils"], function ($, StitchUtils)
{
    //these transforms only seem to work for left->right rows
    //right->left rows need to rotate from the right corners, not left
    //make a new set for right->left
    var STRAIGHT = function STRAIGHT()
    {
        function straight(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("STR_STR: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(0);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function up(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("STR_UP: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function down(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("STR_DOWN: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            var stitchHeight = previousStitch == null ? stitch.getHeight() : previousStitch.getHeight();

            canvasContext.translate(translation.x, translation.y + stitchHeight); //bottom corner
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, -stitchHeight);      //offset by -height
            canvasContext.translate(0, -stitchHeight); //return to top corner
        }

        function nextState(action, newAngle)
        {
            if (action == "straight")
            {
                return new STRAIGHT();
            }
            else if (action == "up")
            {
                return new UP();
            }
            else
            {
                return new DOWN();
            }
        }

        return { straight: straight, up: up, down: down, nextState: nextState };
    };

    var DOWN = function DOWN()
    {
        function straight(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("DOWN_DOWN: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(0);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function up(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("DOWN_UP: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function down(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("DOWN_DOWN: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            var stitchHeight = previousStitch == null ? stitch.getHeight() : previousStitch.getHeight();
            canvasContext.translate(translation.x, translation.y + stitchHeight);         //bottom corner
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, -stitchHeight);      //offset by -height
            canvasContext.translate(0, -stitchHeight); //return to top corner
        }

        function nextState(action, newAngle)
        {
            if (action == "up")
            {
                if (newAngle == 0)
                {
                    return new STRAIGHT();
                }
                else if (newAngle > 0)
                {
                    return new DOWN();
                }
                else
                {
                    return new UP();
                }
            }
            else
            {
                return new DOWN();
            }
        }

        return { straight: straight, up: up, down: down, nextState: nextState };
    };

    var UP = function UP()
    {
        function straight(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("UP_STR: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(0);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function up(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("UP_UP: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            canvasContext.translate(translation.x, translation.y);
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, 0);
        }

        function down(previousStitch, stitch, relativeAngle, canvasContext)
        {
            console.log("UP_DOWN: " + stitch.toString());
            var translation = StitchUtils.getTranslationFrom(previousStitch, stitch);
            var stitchHeight = previousStitch == null ? stitch.getHeight() : previousStitch.getHeight();
            canvasContext.translate(translation.x, translation.y + stitchHeight);         //bottom corner
            canvasContext.rotate(relativeAngle * Math.PI / 180);
            canvasContext.drawImage(stitch.getIcon(), 0, -stitchHeight);      //offset by -height
            canvasContext.translate(0, -stitchHeight); //return to top corner
        }

        function nextState(action, newAngle)
        {
            if (action == "down")
            {
                if (newAngle == 0)
                {
                    return new STRAIGHT();
                }
                else if (newAngle > 0)
                {
                    return new DOWN();
                }
                else
                {
                    return new UP();
                }
            }
            else
            {
                return new UP();
            }
        }

        return { straight: straight, up: up, down: down, nextState: nextState };
    };

    var isGoingDown = function isGoingDown(fromAngle, toAngle, rowNum)
    {
        if(toAngle > fromAngle && rowNum%2 != 0)
        {
            //heading right
            return true;
        }
        else if(toAngle < fromAngle && rowNum%2 == 0)
        {
            //heading left
            return true;
        }
        return false;
    };

    var isGoingUp = function isGoingUp(fromAngle, toAngle, rowNum)
    {
        if(toAngle < fromAngle && rowNum%2 != 0)
        {
            //heading right
            return true;
        }
        else if(toAngle > fromAngle && rowNum%2 == 0)
        {
            //heading left
            return true;
        }
        return false;
    };

    function getDrawTransform(currentState, fromAngle, toAngle, rowNum)
    {
        if(currentState == null)
        {
            currentState = new STRAIGHT();
        }

        console.log("currentState = " + JSON.stringify(currentState) + " fromAngle = " + fromAngle + " toAngle = " + toAngle);

        if (toAngle == fromAngle)
        {
            console.log("going straight");
            return {"drawFunction": currentState.straight, "nextState": currentState.nextState("straight", toAngle)};
        }
        else if (isGoingDown(fromAngle, toAngle, rowNum))
        {
            console.log("going down");
            return {"drawFunction": currentState.down, "nextState": currentState.nextState("down", toAngle)};
        }
        else if(isGoingUp(fromAngle, toAngle, rowNum))
        {
            console.log("going up");
            return {"drawFunction": currentState.up, "nextState": currentState.nextState("up", toAngle)};
        }
        else
        {
            console.error("Unknown state");
            return null;
        }
    }

    return { getDrawTransform: getDrawTransform };
});
