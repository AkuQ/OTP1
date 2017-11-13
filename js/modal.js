//Modal ei häviä vaikka klikkaa sen ulkopuolelle
$('#modal').modal({
    backdrop: 'static',
    keyboard: false
});

//modalin piilotus
$('#chooseRoom-button').click(function() {
    $('#modal').modal('toggle');
});

//Create room -valikkoon
$("#createRoom").click(function() {
    $('#createRoomForm').delay(150).fadeIn(150);
    $('#back-arrow').removeClass('invisible');
    $('#createRoom, #EnterRoom').fadeOut(150);
    $("#roomName, #roomPassword, #roomPasswordAgain").val('');
    $('#CreateRoom-button').prop('disabled', true);

});
//back
$('#back-arrow').click(function() {
    $('#roomName-errors, #short-username').clearQueue();
    $('#createRoomForm, #chooseNameForm, #roomName-errors, #short-username, #createdRoomsContainer').fadeOut(150);
    $('#back-arrow').addClass('invisible');
    $('#createRoom, #EnterRoom').delay(150).fadeIn(150);
    $('ul li').removeClass('roomSelected');
    $('#chooseRoom-button, #CreateRoom-button').prop('disabled', true);
    $('ul li').addClass('listedRoom-hover');


});
//enter room -valikkoon
$('#EnterRoom').click(function() {
    $('#createdRoomsContainer').delay(150).fadeIn(150);
    $('#back-arrow').removeClass('invisible');
    $('#createRoom, #EnterRoom').fadeOut(150);
});
//nimen valinta. Ei vielä tehty
$('#choosename-button').click(function() {
    if ($('#username').val().length >= 5) {
        $('#modal').modal('toggle');
    } else {
        $('#short-username').fadeIn(150);
        $('#short-username').delay(5000).fadeOut(150);
    }
});
//huoneen luonti
$('#CreateRoom-button').click(function() {

  //  $('#modal').modal('toggle');
});
//huoneen valinta -hover
$('ul li').click(function() {
    if ($('ul li').hasClass('roomSelected')) {
        $('ul li').removeClass('roomSelected');
        $('ul li').addClass('listedRoom-hover');
    }
    $(this).toggleClass('roomSelected');
    $(this).removeClass('listedRoom-hover');
    $('#chooseRoom-button').prop('disabled', false);
});

//estää default submiting
$("#createRoomForm,#chooseNameForm").submit(function(e){
        e.preventDefault();
    });

//virheilmoitus
$('#roomName').keyup(function() {
    if ($('#roomName').val().length <= 4) {
        $('#roomName').css('background', 'white url(images/error.png) right no-repeat');
        $('#roomName').css('background-size', '18px 18px');
        $('#roomName').css('background-origin', 'content-box');
    } else {
      $('#roomName').css('background', 'white url(images/success.png) right no-repeat');
      $('#roomName').css('background-size', '23px 23px');
      $('#roomName').css('background-origin', 'content-box');
    }
});

$('#roomName').focusout(function() {
  if ($('#roomName').val().length <= 4) {
    $('#roomName-errors').clearQueue();
    $('#roomName-errors').fadeIn(150).html('<p>Your room name is too short. At least five characters is required.</p>');
    $('#roomName-errors').delay(5000).fadeOut(150);
  }
});
//virheilmoitus
$('#roomPassword').keyup(function() {
    if ($('#roomPassword').val().length <= 4) {
        $('#roomPassword').css('background', 'white url(images/error.png) right no-repeat');
        $('#roomPassword').css('background-size', '18px 18px');
        $('#roomPassword').css('background-origin', 'content-box');
    } else {
      $('#roomPassword').css('background', 'white url(images/success.png) right no-repeat');
      $('#roomPassword').css('background-size', '23px 23px');
      $('#roomPassword').css('background-origin', 'content-box');
    }
});

$('#roomPassword').focusout(function() {
  if ($('#roomPassword').val().length <= 4) {
      $('#roomName-errors').clearQueue();
      $('#roomName-errors').fadeIn(150).html('<p>Your password is too short. At least five characters is required.</p>');
      $('#roomName-errors').delay(5000).fadeOut(150);
}

});
//virheilmoitus, nappi käyttöön
$('#roomPasswordAgain, #roomPassword').keyup(function() {
    if ($('#roomName').val().length >= 5 && $('#roomPassword').val().length >= 5 && $('#roomPassword').val() ==  $('#roomPasswordAgain').val()) {
    $('#CreateRoom-button').prop('disabled', false);
    $('#roomPasswordAgain').css('background', 'white url(images/success.png) right no-repeat');
    $('#roomPasswordAgain').css('background-size', '23px 23px');
    $('#roomPasswordAgain').css('background-origin', 'content-box');
} else if ($('#roomPasswordAgain').val().length < 1) {
  $('#CreateRoom-button').prop('disabled', true);
  $('#roomPasswordAgain').css('background', '');
  $('#roomPasswordAgain').css('background-size', '');
  $('#roomPasswordAgain').css('background-origin', '');
}else {
 $('#CreateRoom-button').prop('disabled', true);
 $('#roomPasswordAgain').css('background', 'white url(images/error.png) right no-repeat');
 $('#roomPasswordAgain').css('background-size', '18px 18px');
 $('#roomPasswordAgain').css('background-origin', 'content-box');
}

});
//syötekenttien tyhjennys
$("#roomName, #roomPassword, #roomPasswordAgain").val('');

//Jos huonelista tyhjä
/*if ($.trim($('div ul').html()) == "")) {
  $(this).append("<li>No Rooms to enter</li>");

} */

//näyttää modalin/aloitusikkunan
$('#modal').modal('show');

$('#createRoomForm, #chooseNameForm, #short-username, #short-roomName, #createdRoomsContainer').hide();

//nappi pois käytöstä
$('#chooseRoom-button, #CreateRoom-button').prop('disabled', true);
