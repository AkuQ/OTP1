describe('Chat', function () {
  it("check, that 'sendMessage' is defined", function() {
    expect(window.sendMessage).toBeDefined();
  });

  it("check, that 'updateMessages' exists and is function", function() {
    expect(window.updateMessages).toEqual(jasmine.any(Function));
  });

  it("check, that 'createUser' exists and is function", function() {
    expect(window.createUser).toEqual(jasmine.any(Function));
  });
});
