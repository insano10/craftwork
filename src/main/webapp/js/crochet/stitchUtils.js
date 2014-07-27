define(["jquery"], function ($)
{
    function getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(stitchCount, rowNum, stitchWidth)
    {
        //add 1/2 width for every additional stitch in the space (accounting for row direction)

        var xOffset = 0;

        if (stitchCount > 1)
        {
            var additionalXPosRequired = (stitchCount - 1) * (stitchWidth / 2);

            if (rowNum % 2 == 0)
            {
                xOffset = -additionalXPosRequired;
            }
            else
            {
                xOffset = additionalXPosRequired;
            }
        }
        return xOffset;
    }

    return {getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches: getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches};
});