var userName = $(".username").val();
var userID;
var chatID; //TÄHÄN LISTA JOHON TALLETETAAN CHAT IIDEET
var lastMessage;
/*window.onload = function(){
  var start = setInterval(updateMessages, 2000);
}*/

function getTime(){
  $.get("10.114.34.17/api/getTime", function(data){
    return data;
  })
}

function createUser(){
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

function listUsers(){
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

function createRoom(){
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

function listRooms(){
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

function updateMessages(){
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
      })
    }
  })
}

function sendMessage(){
  var sendInfo = {
  //  user_id: $("#").val(),
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
