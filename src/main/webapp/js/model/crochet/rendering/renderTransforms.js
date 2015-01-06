define(["jquery", "stitchUtils", "oddRowTransforms"], function ($, StitchUtils, OddRowTransforms)
{
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
            currentState = new OddRowTransforms.STRAIGHT();
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
