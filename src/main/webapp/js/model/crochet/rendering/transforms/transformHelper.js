define(["jquery", "oddRowTransforms", "evenRowTransforms"], function ($, OddRowTransforms, EvenRowTransforms)
{
    function getStraightTransform(rowNum)
    {
        return (rowNum%2 != 0) ? new OddRowTransforms.STRAIGHT() : new EvenRowTransforms.STRAIGHT();
    }

    function getDownTransform(rowNum)
    {
        return (rowNum%2 != 0) ? new OddRowTransforms.DOWN() : new EvenRowTransforms.DOWN();
    }

    function getUpTransform(rowNum)
    {
        return (rowNum%2 != 0) ? new OddRowTransforms.UP() : new EvenRowTransforms.UP();
    }

    function getInitialTransform()
    {
        return new OddRowTransforms.STRAIGHT(false);
    }

    function getNextState(currentState, action, newAngle, rowNum)
    {
        if(currentState.getId() == new OddRowTransforms.STRAIGHT().getId())
        {
            if (action == "straight")
            {
                return getStraightTransform(rowNum);
            }
            else if (action == "up")
            {
                return getUpTransform(rowNum);
            }
            else
            {
                return getDownTransform(rowNum);
            }
        }

        if(currentState.getId() == new OddRowTransforms.DOWN().getId())
        {
            if (action == "up")
            {
                if (newAngle == 0)
                {
                    return getStraightTransform(rowNum);
                }
                else if (newAngle > 0)
                {
                    return getDownTransform(rowNum);
                }
                else
                {
                    return getUpTransform(rowNum);
                }
            }
            else
            {
                return getDownTransform(rowNum);
            }
        }

        if(currentState.getId() == new OddRowTransforms.UP().getId())
        {
            if (action == "down")
            {
                if (newAngle == 0)
                {
                    return getStraightTransform(rowNum);
                }
                else if (newAngle > 0)
                {
                    return getDownTransform(rowNum);
                }
                else
                {
                    return getUpTransform(rowNum);
                }
            }
            else
            {
                return getUpTransform(rowNum);
            }
        }

        if(currentState.getId() == new EvenRowTransforms.STRAIGHT().getId())
        {
            if (action == "straight")
            {
                return getStraightTransform(rowNum);
            }
            else if (action == "up")
            {
                return getUpTransform(rowNum);
            }
            else
            {
                return getDownTransform(rowNum);
            }
        }

        if(currentState.getId() == new EvenRowTransforms.DOWN().getId())
        {
            if (action == "up")
            {
                if (newAngle == 0)
                {
                    return getStraightTransform(rowNum);
                }
                else if (newAngle > 0)
                {
                    return getDownTransform(rowNum);
                }
                else
                {
                    return getUpTransform(rowNum);
                }
            }
            else
            {
                return getDownTransform(rowNum);
            }
        }

        if(currentState.getId() == new EvenRowTransforms.UP().getId())
        {
            if (action == "down")
            {
                if (newAngle == 0)
                {
                    return getStraightTransform(rowNum);
                }
                else if (newAngle > 0)
                {
                    return getDownTransform(rowNum);
                }
                else
                {
                    return getUpTransform(rowNum);
                }
            }
            else
            {
                return getUpTransform(rowNum);
            }
        }
    }

    return { getInitialTransform: getInitialTransform, getNextState: getNextState };
});
