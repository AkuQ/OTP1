var userName = $(".username").val();
var chatID = $("#").val();

var test = function(){
  $.ajax({
    url: 'http://jsonplaceholder.typicode.com/users',
    type: 'GET',
    dataType: 'json'
  }).then(function(data) {
    $.each(data.users, function (i, user){
      console.log(data);
    })
  });
}

var getTime = function(){
  $.get("/getTime", function(data){
    return data;
  })
}

var createUser = function(){
  var sendInfo = {
    Name : userName
  };

  $.ajax({
    type: "POST",
    url: "/users/create",
    data: JSON.stringify(sendInfo)
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
}
var createRoom = function(){
  var sendInfo = {
    name: userName
    password: $("#").val();
  };

  $.ajax({
    type: "POST",
    url: "/rooms/create",
    data: JSON.stringify(sendInfo)
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
}
var listRooms = function(){
  var sendInfo = {
    name: userName
    password: $("#").val();
  };

  $.ajax({
    type: "POST",
    url: "/rooms/list",
    data: JSON.stringify(sendInfo)
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
}

var roomList = function(){
  $.ajax({
    type: "POST",
    url: "/users/create",
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
}

var listUsers = function(){
  var sendInfo = {
      chat_id: $("#").val();
  };

  $.ajax({
    type: "POST",
    url: "/users/list",
    data: JSON.stringify(sendInfo)
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
}
var messageList = function(){
  var sendInfo = {
      chat_id: ChatID;
      since: //lastmessage
  };

  $.ajax({
    type: "POST",
    url: "/messages/list",
    data: JSON.stringify(sendInfo)
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
}
var sendMessage = function(){
  var sendInfo = {
    user_id: $("#").val();
    chat_id: chatID;
    message: $("#textArea").val();
  };

  $.ajax({
    type: "POST",
    url: "/messages/post",
    data: JSON.stringify(sendInfo)
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
}
/*
var getUsersG = function() {
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
*/
