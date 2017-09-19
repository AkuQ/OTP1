var sendMessage = getXmlHttpRequestObject();
var receiveMessage = getXmlHttpRequestObject();
var lastMessage = 0;
var refreshTimer;
var chatId = 1;
var chatUser;

function setUserName(){

}

function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		document.getElementById('leftContent').innerHTML =
		'Could not create XmlHttpRequest Object.' +
	}
}

function getChatText() {
	if (receiveMessage.readyState == 4 || receiveMessage.readyState == 0) {
		receiveMessage.open("POST", 'get_chat.php?chatId&last=' + lastMessage, true);
		receiveMessage.onreadystatechange = handleReceiveChat;
		receiveMessage.send(null);
	}
}
/*
function handleReceiveChat() {
	if (receiveReq.readyState == 4) {
		var chat_div = document.getElementById('leftContent');
		// Get the AJAX response and run the JavaScript evaluation function
		// on it to turn it into a usable object.  Notice since we are passing
		// in the JSON value as a string we need to wrap it in parentheses
		var response = eval("(" + receiveMessage.responseText + ")");
		for(i=0;i < response.messages.message.length; i++) {
			chat_div.innerHTML += response.messages.message[i].user;
			chat_div.innerHTML += '&nbsp;&nbsp;<font class="chat_time">' +  response.messages.message[i].time + '</font><br />';
			chat_div.innerHTML += response.messages.message[i].text + '<br />';
			chat_div.scrollTop = chat_div.scrollHeight;
			lastMessage = response.messages.message[i].id;
		}
		mTimer = setTimeout('getChatText();',2000); //Refresh our chat in 2 seconds
	}
}*/

function sendChatText() {
	if (sendReq.readyState == 4 || sendReq.readyState == 0) {
		sendMessage.open("POST", 'getChat.php?chatID&last=' + lastMessage, true);
		sendMessage.setRequestHeader('Content-Type','application/JSON');
		sendMessage.onreadystatechange = handleSendChat;
		var param = 'message=' + document.getElementById('textArea').value;
		param += '&chatUser';
		param += '&chatID';
		sendMessage.send(param);
		document.getElementById('textArea').value = '';
	}
}

function handleSendChat() {
	// Clear out the existing timer
  // Refresh chat window
	clearInterval(mTimer);
	getChatText();
}
