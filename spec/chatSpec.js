describe('Chat', function () {
  var chat;

  beforeEach(function() {
    this.chat = new Chat();
  });

  it("check, that 'sendChatText' is defined", function() {
    expect( this.chat.sendChatText ).toBeDefined();
  });

  it("check, that 'request' exists and is function", function() {
    expect(this.chat.request).toEqual(jasmine.any(Function));
  });
});
