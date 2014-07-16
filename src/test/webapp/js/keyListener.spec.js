define(["jquery", "keyListener"], function($, KeyListener)
{
    describe("KeyListener", function() {

        var keyListener, stubListener;

        beforeEach(function() {

            stubListener = jasmine.createSpyObj("listener", ["notifyNewInstructionCharacter"]);

            keyListener = new KeyListener();
            keyListener.addListener(stubListener);
        });

        it("should notify listeners of a key when pressed", function() {

            var stubEvent = {which:77};
            keyListener.onKeyPressed(stubEvent);

            expect(stubListener.notifyNewInstructionCharacter).toHaveBeenCalledWith("M");
        });

    });
});
