define(["jquery"], function ($)
{
    function KeyListener(jquery)
    {
        var listeners = [];

        var notifyListeners = function ()
        {
            $.each(listeners, function (idx, listener)
            {
                listener.notifyInstructionsUpdated();
            });
        };

        this.addListener = function addListener(listener)
        {
            listeners.push(listener);
        };

        this.onKeyPressed = function onKeyPressed(event)
        {
            notifyListeners();
        };

        this.onKeyDown = function onKeyDown(event)
        {
            //certain key presses are not detected by onKeyPressed but are by onKeyDown
            if ((event.which == 8) ||                                           //backspace
                (event.which == 90 && event.ctrlKey && event.shiftKey) ||       //ctrl+shift+z - redo
                (event.which == 90 && event.ctrlKey && !event.shiftKey))        //ctrl+x - undo
            {
                notifyListeners();
            }
        };
    }

    return KeyListener;
});

