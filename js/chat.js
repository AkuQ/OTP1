var userID = getCookie("userID");
var chatID = getCookie("chatID");
var lastMessage = 0;
var userName = "testUser";//$('#username').val();
var rooms = document.getElementById("createdRooms");
var users = [];
var roomCount = 0;

/*window.onload = function(){
  var start = setInterval(updateMessages, 2000);
}*/

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
  var sendInfo = {
    name : userName
  }

  $.ajax({
    type: "POST",
    url: "/api/users/create",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data.result.id);
      var id = data.result.id;
      setCookie("userID", this.id);

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
        users.push(data.result[i].name);
        $("#group-users").append("<li>" + data.result[i].name + "</li>");
      }
      console.log(this.users);
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

function joinRoom(){
  console.log("joinRoom() kutsuttu");
  var sendInfo = {
    id:getCookie('chatID'),
    user_id: getCookie('userID'),
    password: null
    }

  $.ajax({
    type: "POST",
    url: "/api/rooms/join",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log("1 = Kirjautuminen onnistui, 0 = epäonnistui");
      console.log("Tulos:"+data.result.id);
    }
  })
}

function listRooms(){
  console.log("Listrooms called");
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
        for(var i = roomCount; i < data.result.length; i++){

          // Luodaan HTML -elementti, jolle asetetaan luokka ja onClick
          // eventlistener. Klikatessa kyseisen elementin "chatid" tallentuu
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
      chat_id: chatID,
      since: lastMessage
    }

  $.ajax({
    type: "POST",
    url: "/api/messages/list",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
    /*  for(var i=0; i<data.result.length; i++){
        $("#messageList").append("<li>"+getTime()+
        "|"+"userID ="+ data.result[i].userID +"|||"+ data.result[i].message + "</li>");
        lastMessage = data.result[i].id;
    */
      for(var i=0; i<data.result.length; i++){
        console.log(data.result[i].message);
      }
      lastMessage = data.result.length;
    }
  })
}

function sendMessage(){
  console.log("SendMessage() kutsuttu");
  var sendInfo = {
    user_id: getCookie('userID'),
    chat_id: getCookie('chatID'),
    //message: $("#textArea").val(),
    message: "Buujah"
  }

  $.ajax({
    type: "POST",
    url: "/api/messages/post",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      console.log(data);
    }
  })
  $("#textArea").val() = "";
}
