var userID;
var chatID; //TÄHÄN LISTA JOHON TALLETETAAN CHAT IIDEET
var lastMessage;
var userName = "testUser";//$('#username').val();
var rooms = document.getElementById("createdRooms");
var users = [];

/*window.onload = function(){
  var start = setInterval(updateMessages, 2000);
}*/

//Hae aika
function getTime(){

  $.post("/api/get_time", function(data){
    console.log(data);
    return data;
  })
}

//Lisää käyttäjän kantaan ja palauttaa ID:n
function createUser(){
  var authToken;
  var userID;
  var sendInfo = {
    Name : this.userName
  };

  $.ajax({
    type: "POST",
    url: "/api/users/create",
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

//Listaa käyttäjät ja lisää ne #group-users elementtiin listamuodossa.
function listUsers(){
  var sendInfo = {
      chat_id: this.chatID
    }

  $.ajax({
    type: "POST",
    url: "/api/users/list",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      //console.log(data);
      for(var i=0; i<data.result.length; i++){
        users.push(data.result[i]);
        $("#group-users").append("<li>" + data.result[i].name + "</li>");
      }
    }
  })
}


function createRoom(){
  var sendInfo = {
    name: $("#roomName").val(),
    password: $("#roomPassword").val()
    }

  $.ajax({
    type: "POST",
    url: "/api/rooms/create",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
      this.chatID = data.result;
    }
  })
  createUser()
}

function listRooms(){
  var sendInfo = {
    name: userName,
    password: $("#roomPassword").val()
  }

  $.ajax({
    type: "POST",
    url: "/api/rooms/list",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
    //console.log(data.result[1].name);
      for(var i=0; i<data.result.length; i++){
        rooms.innerHTML +=
        "<li class='listedRoom listedRoom-hover'>"+
        data.result[i].name+"</li>";
      }
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
    url: "http://10.114.34.17/api/messages/list",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      //console.log(data);
      for(var i=0; i<data.result.length; i++){
        $("#messageList").append("<li>"+getTime()+
        "|"+"nickname"+"|"+ data.result[i].message + "</li>");
      }
    }
  })
}

function sendMessage(){
  var sendInfo = {
    user_id: 1,
    chat_id: chatID,
    message: $("#textArea").val(),
  }

  $.ajax({
    type: "POST",
    url: "http://10.114.34.17/api/messages/post",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
      //TALLENNA TAKAISIN TULEVA ID "MESSAGES SINCE" ARVOKSI
    }
  })
  updateMessages();
  $("#textArea").val() = "";
}
