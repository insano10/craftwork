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

    function getTranslationFrom(fromStitch, toStitch)
    {
        var translation = {x:0, y:0};

        if(fromStitch == null)
        {
            //todo: hack, thhis should be configurable
            return { x: 70, y:240 };
        }

        if(toStitch != null)
        {
            if (fromStitch.getRowNum() < toStitch.getRowNum())
            {
                //go upwards
                translation.y = -toStitch.getHeight();
            }
            else
            {
                var extraXTranslation = 0;
                if(toStitch.getStitchesBelow().length > 1)
                {
                    extraXTranslation += getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(toStitch.getStitchesBelow().length, toStitch.getRowNum(), toStitch.getWidth());
                }
                if(fromStitch.getStitchesBelow().length > 1)
                {
                    extraXTranslation += getXOffsetForStitchBeingRenderedWithinASpaceForMultipleStitches(fromStitch.getStitchesBelow().length, fromStitch.getRowNum(), fromStitch.getWidth());
                }

                if (fromStitch.getRowNum() % 2 != 0)
                {
                    //go right
                    translation.x = fromStitch.getWidth() + extraXTranslation;
                }
                else
                {
                    //go left
                    translation.x = -toStitch.getWidth() + extraXTranslation;
                }
            }
        }
        console.log("translation: " + JSON.stringify(translation));
        return translation;
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
            getTranslationFrom: getTranslationFrom,
            generateId: generateId};
});