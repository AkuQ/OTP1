function Chat() {
}

Chat.prototype.request = function() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();

  } else if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");

  } else {
    document.getElementById('leftContent').innerHTML =
    'Could not create XmlHttpRequest Object.';
  }
};

Chat.prototype.sendChatText = function() {

  var message = document.getElementById('textArea').value;
  var messageJSON = JSON.stringify(message);
  var request = new getXmlHttpRequestObject();
  if (request.readyState == 4 || request.readyState == 0) {
      request.open("GET", "testFile.txt");
      //request.setRequestHeader('Content-Type','application/JSON');
      request.send();
  }
};

Chat.prototype.handleSendChat = function() {
	clearInterval(mTimer);
	getChatText();
};
