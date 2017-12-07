var userID = getCookie("userID");
var chatID = getCookie("chatID");
var socket;
var lastMessage = 0;
//var userName = $('#username').val();
var rooms = document.getElementById("createdRooms");
var roomCount = 0;
var userCount = 0;
var users = {};

window.onload = function(){
  if(getCookie("loggedIn") == 1){
    $('#modal').modal('toggle');
    joinRoom();
  }
}

// Aseta keksi, field = keksin nimi ja value = keksin arvo
function setCookie(field,value) {
  document.cookie = field+"="+value+";";
  console.log(document.cookie);
}

// Hae keksi nimellä, palauttaa pelkän arvon
function getCookie(field) {
    var name = field + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    console.log(c);
    return null;
}

//Hae aika
function getTime(){
  $.post("/api/get_time", function(data){
    console.log(data);
    return data;
  })
}

//Lisää käyttäjän kantaan ja palauttaa ID:n
function createUser(){
  console.log("createUser() called");
  var sendInfo = {
    name : $('#username').val()
  }

  $.ajax({
    type: "POST",
    url: "/api/users/create",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      setCookie("userID", data.result.id);
    }
  })
}

//Listaa käyttäjät ja lisää ne #group-users elementtiin listamuodossa.
function listUsers(){
  console.log("listUsers() called");
  var sendInfo = {
      chat_id: getCookie('chatID')
    }

  $.ajax({
    type: "POST",
    url: "/api/users/list",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data.error);
      //console.log(data);
      for(var i=userCount; i<data.result.length; i++){
        //users.push(data.result[i].name);
        users[data.result.id] = data.result.name;
        $("#userlist").append("<li>" + data.result[i].name + "</li>");
      }
      console.log("users objekti:"+users);
      console.log(users[0]);
      userCount = data.result.length;

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
}

function joinRoom(){
  console.log("joinRoom() kutsuttu");
  let password = $("passwordRequired").val();
  console.log(password);
  var sendInfo = {
    chat_id:getCookie('chatID'),
    user_id: getCookie('userID'),
    password: "salasana"
    }

  $.ajax({
    type: "POST",
    url: "/api/rooms/join",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log("1 = Kirjautuminen onnistui, 0 = epäonnistui");
      console.log("Tulos:"+data.result);
      if(data.result === 1){
        //Onko käyttäjä huoneessa 1 = on, 0 = ei
        setCookie("loggedIn","1",)
        connectSocket();
      }
      updateMessages();
    }
  })
}

function connectSocket() {
  socket = io("http://10.114.34.17:5000/", {query: {chat_id: getCookie('chatID'), user_id: getCookie('userID'), token:"asd"}});

  socket.on('update workspace', () => {
       updateWorkspace();
      });


  socket.on('error', function (err) {
      console.log(err.type);
  });


  function update() {
     // text = document.getElementById("text").value;
     // socket.emit('update', text);
  }


  socket.on('update messages', function() {
    console.log("päivitä viestejä");
    updateMessages();
  });

  socket.on('update users', function(user) {
    // $("#userlist").append("<li>" + user.name + "</li>");
      listUsers();
  });

  socket.on('user disconnect', function() {
      listUsers();
  });

  var input = document.getElementById("working-area");
  input.addEventListener("keypress", function () {
    inputWorkspaceText(this.selectionStart);       
  });

}

function sendMessage() {
    let message = $("#textArea").val();
    console.log(message);
    let msg = {user_id: getCookie('userID'),
                    chat_id: getCookie('chatID'),
                    content: message,
                    /*token: getCookie('token')*/};
    socket.emit('post message', msg);
    $("#textArea").val("");
}

function leaveRoom(){
  console.log("leaveRoom() kutsuttu");
  var sendInfo = {
    chat_id:getCookie('chatID'),
    user_id: getCookie('userID')
    }

  $.ajax({
    type: "POST",
    url: "/api/rooms/leave",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log("1 = Uloskirjautuminen onnistui, 0 = epäonnistui");
      console.log("Tulos:"+data.result);
      if(data.result === 1){
        //Onko käyttäjä huoneessa 1 = on, 0 = ei
        setCookie("loggedIn","0",)
      }
    }
  })
}

function listRooms(){
  console.log("Listrooms called");
  $.ajax({
    type: "POST",
    url: "/api/rooms/list",
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log("Error: "+data.result.error);
        for(var i = roomCount; i < data.result.length; i++){

          // Luodaan HTML -elementti, jolle asetetaan luokka ja onClick
          // eventlistener. Klikatessa kyseisen elementin "chatID" tallentuu
          // selaimen kekseihin
          rooms.innerHTML +=
          "<li onclick='setCookie(`chatID`,"+data.result[i].id+
          ")' class='listedRoom listedRoom-hover'>"+
          data.result[i].name+"</li>";
        }

      // Tällä pidetään kirjaa "rooms" listan pituudesta, ja estetään
      // huoneiden tuominen listaan kahteen kertaan.
      roomCount = data.result.length;
      console.log("Huoneita listassa: "+roomCount);

    }
  })
}

function updateMessages(){
  console.log("updateMessages() kutsuttu")
  var sendInfo = {
      chat_id: getCookie('chatID'),
      since: lastMessage
    }

  $.ajax({
    type: "POST",
    url: "/api/messages/list",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      console.log(data);
      for(var i=0; i<data.result.length; i++){
        $("#messagelist").append("<li>"+getTime()+
        " ||| "+"userID = "+ data.result[i].user_id +"<br>"+ data.result[i].message + "</li>");
      }
    /*
      for(var i=0; i<data.result.length; i++){
        console.log(data.result[i].message);
      }
    */
      lastMessage = data.result.length;
    }
  })
}
function fetchWorkspace() {
  
  var sendInfo = {
    chat_id: getCookie('chatID')
  }

  $.ajax({
    type: "POST",
    url: "/workspaces/content",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      $("working-area").text(data.result.content)
      setCookie("lastUpdate", content.result.last_update)
      }
    })

}
function updateWorkspace() {
  var sendInfo = {
    chat_id: getCookie('chatID'),
    since: getCookie('lastUpdate'),
    caret_pos: 2
  }
  $.ajax({
    type: "POST",
    url: "/workspaces/update",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      $("working-area").text(data.content);
      setCookie("lastUpdate", data.result.updates.id);
      if (data.result.updates.mode === "insert") {
        inputWorkspaceText({text:data.result.updates.input, pos:data.result.updates.pos})
      } else {
        removeWorkspaceText(data.result.updates.pos, data.result.updates.len);
      }
      }
    })
}

function inputWorkspaceText(updObj) {
  var txt = $("working-area").val();
  var newTxt = txt.slice(0, updObj.pos) + updObj.text + txt.slice(updObj.pos);
  $("working-area").text(newTxt);
}

function removeWorkspaceText(pos, len) {
  var txt = $("working-area").val();
  var newTxt = cut(txt, pos, pos+len)
  
  function cut(text, cutStart, cutEnd) {
    return text.substr(0,cutStart) + str.substr(cutEnd+1);
  }
  $("working-area").text(newTxt);
}

function workspaceInsert(pos) {

  var input = $("working-area").val().charAt(pos);

  var sendInfo = {
    chat_id: getCookie('chatID'),
    since: getCookie('lastUpdate'),
    caret_pos: pos,
    pos: pos,
    input: input

  }
  $.ajax({
    type: "POST",
    url: "/workspaces/insert",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
        setCookie("lastUpdate", data.result);
    
      }
    })
}

function workspaceRemove(obj) {
  
  
    var sendInfo = {
      chat_id: getCookie('chatID'),
      since: getCookie('lastUpdate'),
      pos: 1,
      len: 1,
    }
    $.ajax({
      type: "POST",
      url: "/workspaces/insert",
      data: JSON.stringify(sendInfo),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
          setCookie("lastUpdate", data.result);
      
        }
      })
  }
/*
function sendMessage(){
  console.log("SendMessage() kutsuttu");
  var sendInfo = {
    user_id: getCookie('userID'),
    chat_id: getCookie('chatID'),
    message: $("#textArea").val()
  }

  $.ajax({
    type: "POST",
    url: "/api/messages/post",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      //console.log(data.result.id);
    }
  })
  updateMessages();
  $("#textArea").val() = "";
  */
