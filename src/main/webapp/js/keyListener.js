function KeyListener()
{
    /*
    PRIVATE
     */

    var listeners = [];

    var notifyListeners = function(keyChar)
    {
        $.each(listeners, function(idx, listener)
        {
            listener.notifyNewInstructionCharacter(keyChar);
        });

    };

    /*
    PRIVILEGED
     */

    this.addListener = function addListener(listener)
    {
        listeners.push(listener);
    };

    this.onKeyPressed = function onKeyPressed(event)
    {
        var keyPressed = String.fromCharCode(event.which);
        notifyListeners(keyPressed);
    };
}

