define(function()
{
    function ChartModel(chartRenderer)
    {
        /*
         PRIVILEGED
         */

        this.notifyNewInstructionCharacter = function notifyNewInstructionCharacter(keyChar)
        {
            chartRenderer.drawCharacter(keyChar);
        }
    }

    return ChartModel;
});


