var userName = $(".username").val();
var userID;
var chatID; //TÄHÄN LISTA JOHON TALLETETAAN CHAT IIDEET
var lastMessage;
/*window.onload = function(){
  var start = setInterval(updateMessages, 2000);
}*/

var getTime = function(){
  $.get("10.114.34.17/api/getTime", function(data){
    return data;
  })
}

var createUser = function(){
  var authToken;
  var userID;
  var sendInfo = {
    Name : userName
  };

  $.ajax({
    type: "POST",
    url: "10.114.34.17/api/users/create",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
      this.userID = data.id;
      this.authToken = data.token;
    }
  })
}

var listUsers = function(){
  var sendInfo = {
      chat_id: $("#").val()
    }

  $.ajax({
    type: "POST",
    url: "10.114.34.17/api/users/list",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
}


var createRoom = function(){
  var sendInfo = {
    name: userName,
    password: $("#").val()
    }

  $.ajax({
    type: "POST",
    url: "10.114.34.17/api/rooms/create",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
}

var listRooms = function(){
  var sendInfo = {
    name: userName,
    password: $("#").val()
  }

  $.ajax({
    type: "POST",
    url: "10.114.34.17/api/rooms/list",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
}

var updateMessages = function(){
  console.log("updateMessages() kutsuttu")
  var sendInfo = {
      chat_id: chatID,
      since: lastMessage
    }

  $.ajax({
    type: "POST",
    url: "10.114.34.17/api/messages/list",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      // console.log(data);
      $.each(data.message, function (i, message) {
      $("#messages").append("<li>" + i + "</li>");
    }
  })
}

var sendMessage = function(){
  var sendInfo = {
    user_id: $("#").val(),
    chat_id: chatID,
    message: $("#textArea").val(),
  }

  $.ajax({
    type: "POST",
    url: "10.114.34.17/api/messages/post",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
  updateMessages();
}
/* ESIMERKKI PALUUDATAN KÄSITTELYYN
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
       })
*/
