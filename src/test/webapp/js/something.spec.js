describe("something", function() {

    it("returns something", function() {
        expect(doSomething()).toEqual("something");
    });

    it("does not return something else", function() {
        expect(doSomething()).not.toEqual("something else");
    })
});