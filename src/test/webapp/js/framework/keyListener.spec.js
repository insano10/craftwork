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

            expect(stubListener.notifyNewInstructionCharacter).toHaveBeenCalled();
        });

        it("should not notify listeners of a key when down if it has not been explicitly set", function() {

            var stubEvent = {which:77};
            keyListener.onKeyDown(stubEvent);

            expect(stubListener.notifyNewInstructionCharacter).not.toHaveBeenCalled();
        });

        it("should notify listeners of a key when down if it is backspace", function() {

            var stubEvent = {which:8};
            keyListener.onKeyDown(stubEvent);

            expect(stubListener.notifyNewInstructionCharacter).toHaveBeenCalled();
        });

        it("should notify listeners of a key when down if it is ctrl+z", function() {

            var stubEvent = {which:90, ctrlKey:true};
            keyListener.onKeyDown(stubEvent);

            expect(stubListener.notifyNewInstructionCharacter).toHaveBeenCalled();
        });

        it("should notify listeners of a key when down if it is ctrl+shift+z", function() {

            var stubEvent = {which:90, ctrlKey:true, shiftKey:true};
            keyListener.onKeyDown(stubEvent);

            expect(stubListener.notifyNewInstructionCharacter).toHaveBeenCalled();
        });

    });
});
