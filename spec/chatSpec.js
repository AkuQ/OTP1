describe('Chat', function () {

  it("check, that 'sendChatText' is defined", function() {
    expect( window.sendChatText ).toBeDefined();
  });

  it("check, that 'request' exists and is function", function() {
    expect(window.request).toEqual(jasmine.any(Function));
  });

  it("check, that 'getUser' exists and is function", function() {
    expect(window.getUsers).toEqual(jasmine.any(Function));
  });
});
