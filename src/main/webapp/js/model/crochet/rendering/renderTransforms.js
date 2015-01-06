define(["jquery", "stitchUtils", "transformHelper"], function ($, StitchUtils, TransformHelper)
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
            currentState = TransformHelper.getInitialTransform();
        }

        console.log("currentState = " + JSON.stringify(currentState) + " fromAngle = " + fromAngle + " toAngle = " + toAngle + " rowNum = " + rowNum);

        if (toAngle == fromAngle)
        {
            console.log("going straight");
            return {"drawFunction": currentState.straight, "nextState": TransformHelper.getNextState(currentState, "straight", toAngle, rowNum)};
        }
        else if (isGoingDown(fromAngle, toAngle, rowNum))
        {
            console.log("going down");
            return {"drawFunction": currentState.down, "nextState": TransformHelper.getNextState(currentState, "down", toAngle, rowNum)};
        }
        else if(isGoingUp(fromAngle, toAngle, rowNum))
        {
            console.log("going up");
            return {"drawFunction": currentState.up, "nextState": TransformHelper.getNextState(currentState, "up", toAngle, rowNum)};
        }
        else
        {
            console.error("Unknown state");
            return null;
        }
    }

    return { getDrawTransform: getDrawTransform };
});
