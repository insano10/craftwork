define(["jquery", "keyListener"], function($, KeyListener)
{
    describe("KeyListener", function() {

        var keyListener, stubListener;

        beforeEach(function() {

            keyListener = new KeyListener();
            stubListener = { notifyNewInstructionCharacter: function(x){} };
            keyListener.addListener(stubListener);

            spyOn(stubListener, "notifyNewInstructionCharacter");

        });

        it("should notify listeners of a key when pressed", function() {

            var stubEvent = {which:77};
            keyListener.onKeyPressed(stubEvent);

            expect(stubListener.notifyNewInstructionCharacter).toHaveBeenCalledWith("M");
        });

    });
});
