
var sendChatText = function() {

  var message = document.getElementById('textArea').value;
  var messageJSON = JSON.stringify(message);
  var request = this.request();
  if (request.readyState == 4 || request.readyState == 0) {
      request.open("GET", "testFile.txt");
      //request.setRequestHeader('Content-Type','application/JSON');
      request.send();
  }
};
/*
var handleSendChat = function() {
	clearInterval(mTimer);
	this.getChatText();
};
*/
var getUsers = function() {
  console.log("getUsers() called")
  $.ajax({
       type: "GET",
       url: "http://api.avoindata.net/users", //API for test use
       dataType: 'json',
       cache: false,
       success: function(data)
        {
          // JSON sisältää kaksi objektia: users ja rights
          $.each(data.users, function (i, user) {
  		// tee mitä haluat jokaiselle
      		$("#userlist").append("<li>" +user.handle+ "</li>");
  	});
        }
    });
};
