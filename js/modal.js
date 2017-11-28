$('#modal').modal('show');

//Modal ei häviä vaikka klikkaa sen ulkopuolelle
$('#modal').modal({
    backdrop: 'static',
    keyboard: false
});

$('#createRoomForm, #chooseNameForm, #createdRoomsContainer, #roomCreatedMessage, #feedback *, #roomSelected, #container').hide();

clearFields();

function clearInputBackground() {
  $('#roomName, #roomPassword, #roomPasswordAgain, #username').css('background', '');
  $('#roomName, #roomPassword, #roomPasswordAgain, #username').css('background-size', '');
  $('#roomName, #roomPassword, #roomPasswordAgain, #username').css('background-origin', '');
}

function clearFields() {
  $("#roomName, #roomPassword, #roomPasswordAgain, #username, #passwordRequired").val('');
}
/*
function removeIllegalChars(fieldId) {
  var value = fieldId.val();
  var noTags = value.replace(/(<([^>]+)>)/ig,"");
  var noTagsOrSpaces = noTags.replace(/\s/g,'');
  if (value != noTagsOrSpaces) {
    var feedback = $('#htmlRemoved');
    roomFeedback(feedback);
  }
  return noTagsOrSpaces;
} */

function removeHtmlTags(fieldId) {
  var value = fieldId.val();
  var checked = value.replace(/(<([^>]+)>)/ig,"");
  if (value != checked) {
    clearFeedback();
    var feedback = $('#htmlRemoved');
    roomFeedback(feedback);
  }
  return checked;
}

function removeSpaces(fieldId) {
  var value = fieldId;
  var checked = value.replace(/\s/g,'');
  if (value != checked) {
    clearFeedback();
    var feedback = $('#spacesRemoved');
    roomFeedback(feedback);
  }
  return checked;
}

function roomFeedback(feedback) {
  var feedback = feedback;
  $('#feedback *').clearQueue();
  feedback.fadeIn(150);
  feedback.delay(5000).fadeOut(150);
}

function clearFeedback() {
  $('#feedback *').clearQueue();
  $('#feedback *').hide();
}

//modalin piilotus. Huoneeseen liittyminen
$('#chooseRoom-button').click(function() {
    $('#modal').modal('toggle');
    $('#back-arrow').toggleClass('invisible');
});

//Create room -valikkoon
$("#createRoom").click(function() {
    clearFeedback();
    $('#createRoomForm').delay(150).fadeIn(150);
    $('#back-arrow').removeClass('invisible');
    $('#createRoom, #EnterRoom').fadeOut(150);
    clearFields();
    $('#CreateRoom-button').prop('disabled', true);

});
//back
$('#back-arrow').click(function() {
    clearFeedback();
    $('#createRoomForm, #chooseNameForm, #createdRoomsContainer, #roomSelected').fadeOut(150);
    $('#back-arrow').addClass('invisible');
    $('#createRoom, #EnterRoom').delay(150).fadeIn(150);
    $('ul li').removeClass('roomSelected');
    $('#chooseRoom-button, #CreateRoom-button, #choosename-button').prop('disabled', true);
    $('ul li').addClass('listedRoom-hover');
    clearInputBackground();


});
//enter room -valikkoon
$('#EnterRoom').click(function() {
    clearFeedback();
    clearFields();
    $('#createRoom, #EnterRoom').fadeOut(150);
    $('#chooseNameForm').delay(150).fadeIn(150);
    $('#back-arrow').removeClass('invisible');
    $('#roomSearch').css('background', 'rgb(213,220,237) url(images/search.png) right no-repeat');
    $('#roomSearch').css('background-size', '23px 23px');
    $('#roomSearch').css('background-origin', 'content-box');

});
//huoneen luonti
$('#CreateRoom-button').click(function() {
  clearFeedback();
  $('#CreateRoom-button').prop('disabled', true);
  $('#createRoomForm').fadeOut(150);
  $('#createRoom, #EnterRoom').delay(150).fadeIn(150);
  $('#roomCreatedMessage').delay(450).fadeIn(150);
  $('#roomCreatedMessage').delay(10000).fadeOut(150);
  clearFields();
  clearInputBackground();
});
//huoneen valinta -hover
/*
$('ul li').on( "click", function() {
    if ($('ul li').hasClass('roomSelected')) {
        $('ul li').removeClass('roomSelected');
        $('ul li').addClass('listedRoom-hover');
    }
    $(this).toggleClass('roomSelected');
    $(this).removeClass('listedRoom-hover');
    $('#chooseRoom-button').prop('disabled', false);
}); */
//huoneen valinta
$('#createdRooms').on( "click", ".listedRoom", function() {
    $(this).toggleClass('roomSelected');
    $(this).removeClass('listedRoom-hover');
    $('#chooseRoom-button').prop('disabled', false);
    $('#createdRoomsContainer').fadeOut(150);
    $('#roomSelected').delay(150).fadeIn(150);
    var str = $(this).text();
    $("#roomSelected p").html(str);
    $('#back-arrow').toggleClass('invisible');
    //$('#passwordRequired').text()
});

$('#backToListing').click(function() {
  $('#roomSelected').fadeOut(150);
  $('#createdRoomsContainer').delay(150).fadeIn(150);
  if ($('ul li').hasClass('roomSelected')) {
      $('ul li').removeClass('roomSelected');
      $('ul li').addClass('listedRoom-hover');
  }
  $('#back-arrow').toggleClass('invisible');
});

//estää default submiting
$("#createRoomForm,#chooseNameForm").submit(function(e){
        e.preventDefault();
    });

//virheilmoitus
$('#roomName').keyup(function() {
  var value = $('#roomName');
  var checkedHtml = removeHtmlTags(value);
  var checked = removeSpaces(checkedHtml);
  $('#roomName').val(checked);
    if ($('#roomName').val().length < 1) {
      $('#roomName').css('background', '');
      $('#roomName').css('background-size', '');
      $('#roomName').css('background-origin', '');
    } else if ($('#roomName').val().length >= 1 && $('#roomName').val().length < 4) {
      $('#CreateRoom-button').prop('disabled', true);
      $('#roomName').css('background', 'rgb(213,220,237) url(images/error.png) right no-repeat');
      $('#roomName').css('background-size', '18px 18px');
      $('#roomName').css('background-origin', 'content-box');
    } else {
      $('#roomName').css('background', 'rgb(213,220,237) url(images/success.png) right no-repeat');
      $('#roomName').css('background-size', '23px 23px');
      $('#roomName').css('background-origin', 'content-box');
    }
});

$('#roomName').focusout(function() {
  if ($('#roomName').val().length < 4) {
    clearFeedback();
    $('#short-roomName').fadeIn(150);
    $('#short-roomName').delay(5000).fadeOut(150);
  }
});
//virheilmoitus
$('#roomPassword').keyup(function() {
  var value = $('#roomPassword');
  var checkedHtml = removeHtmlTags(value);
  var checked = removeSpaces(checkedHtml);
  $('#roomPassword').val(checked);
    if ($('#roomPassword').val().length < 1) {
      $('#CreateRoom-button').prop('disabled', true);
      $('#roomPassword').css('background', '');
      $('#roomPassword').css('background-size', '');
      $('#roomPassword').css('background-origin', '');
    } else if ($('#roomPassword').val().length >= 1 && $('#roomPassword').val().length < 6) {
        $('#roomPassword').css('background', 'rgb(213,220,237) url(images/error.png) right no-repeat');
        $('#roomPassword').css('background-size', '18px 18px');
        $('#roomPassword').css('background-origin', 'content-box');
    }else {
      $('#roomPassword').css('background', 'rgb(213,220,237) url(images/success.png) right no-repeat');
      $('#roomPassword').css('background-size', '23px 23px');
      $('#roomPassword').css('background-origin', 'content-box');
    }
});

$('#roomPassword').focusout(function() {
  if ($('#roomPassword').val().length <= 4) {
      clearFeedback();
      $('#short-password').fadeIn(150);
      $('#short-password').delay(5000).fadeOut(150);
}

});
//virheilmoitus, nappi käyttöön
$('#roomPasswordAgain, #roomPassword').keyup(function() {
  var value = $('#roomPasswordAgain');
  var checkedHtml = removeHtmlTags(value);
  var checked = removeSpaces(checkedHtml);
  $('#roomPasswordAgain').val(checked);
    if ($('#roomName').val().length >= 5 && $('#roomPassword').val().length >= 5 && $('#roomPassword').val() ==  $('#roomPasswordAgain').val()) {
    $('#CreateRoom-button').prop('disabled', false);
    $('#roomPasswordAgain').css('background', 'rgb(213,220,237) url(images/success.png) right no-repeat');
    $('#roomPasswordAgain').css('background-size', '23px 23px');
    $('#roomPasswordAgain').css('background-origin', 'content-box');
} else if ($('#roomPasswordAgain').val().length < 1) {
  $('#CreateRoom-button').prop('disabled', true);
  $('#roomPasswordAgain').css('background', '');
  $('#roomPasswordAgain').css('background-size', '');
  $('#roomPasswordAgain').css('background-origin', '');
} else {
 $('#CreateRoom-button').prop('disabled', true);
 $('#roomPasswordAgain').css('background', 'rgb(213,220,237) url(images/error.png) right no-repeat');
 $('#roomPasswordAgain').css('background-size', '18px 18px');
 $('#roomPasswordAgain').css('background-origin', 'content-box');
}
});

$('#username').keyup(function() {
  var value = $('#username');
  var checkedHtml = removeHtmlTags(value);
  var checked = removeSpaces(checkedHtml);
  $('#username').val(checked);
  if ($('#username').val().length >= 3) {
    $('#choosename-button').prop('disabled', false);
    $('#username').css('background', 'rgb(213,220,237) url(images/success.png) right no-repeat');
    $('#username').css('background-size', '23px 23px');
    $('#username').css('background-origin', 'content-box');
  } else if ($('#username').val().length < 1) {
    $('#choosename-button').prop('disabled', true);
    clearInputBackground();
  }else {
   $('#choosename-button').prop('disabled', true);
   $('#username').css('background', 'rgb(213,220,237) url(images/error.png) right no-repeat');
   $('#username').css('background-size', '18px 18px');
   $('#username').css('background-origin', 'content-box');
  }
});
//huoneiden listaus
$('#choosename-button').click(function() {
  $('#chooseNameForm').fadeOut(150);
  $('#createdRoomsContainer').delay(150).fadeIn(150);
});

//Huoneen hakeminen
$('#roomSearch').keyup(function() {
  var search = $('#roomSearch').val();
  $('.listedRoom').each(function() {
  var room = $(this).text();
  if (room.includes(search) == false) {
    $(this).hide();
  } else {
    $(this).show();
  }
})
});


//Jos huonelista tyhjä
/*if ($.trim($('div ul').html()) == "")) {
  $(this).append("<li>No Rooms to enter</li>");

} */
