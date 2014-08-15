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

    function generateId()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
        {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    return {getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches: getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches,
            generateId: generateId};
});