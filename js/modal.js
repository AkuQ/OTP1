$('#modal').modal({
    backdrop: 'static',
    keyboard: false
});

$("#createRoom").click(function() {
    $('#createRoomForm').delay(150).fadeIn(150);
    $('#back-arrow').removeClass('invisible');
    $('#createRoom, #EnterRoom').fadeOut(150); 
    $("#roomName, #roomPassword, #roomPasswordAgain").val('');
    $('#CreateRoom-button').prop('disabled', true);
    
}); 

$('#back-arrow').click(function() {
    $('#roomName-errors, #short-username').clearQueue();
    $('#createRoomForm, #chooseNameForm, #roomName-errors, #short-username, #createdRooms').fadeOut(150);
    $('#back-arrow').addClass('invisible');
    $('#createRoom, #EnterRoom').delay(150).fadeIn(150);
    $('ul li').removeClass('roomSelected');
    $('#chooseRoom-button, #CreateRoom-button').prop('disabled', true);
    $('ul li').addClass('listedRoom-hover');
    
});

$('#EnterRoom').click(function() {
    $('#createdRooms').delay(150).fadeIn(150);
    $('#back-arrow').removeClass('invisible');
    $('#createRoom, #EnterRoom').fadeOut(150); 
});

$('#choosename-button').click(function() {
    if ($('#username').val().length >= 5) {
        $('#modal').modal('toggle');
    } else {
        $('#short-username').fadeIn(150);
        $('#short-username').delay(5000).fadeOut(150);
    }
});

$('#CreateRoom-button').click(function() {
    
    $('#modal').modal('toggle'); 
});

$('ul li').click(function() {
    if ($('ul li').hasClass('roomSelected')) {
        $('ul li').removeClass('roomSelected');
        $('ul li').addClass('listedRoom-hover');
    }
    $(this).toggleClass('roomSelected');
    $(this).removeClass('listedRoom-hover');
    $('#chooseRoom-button').prop('disabled', false);
})
    

$("#createRoomForm,#chooseNameForm").submit(function(e){
        e.preventDefault();
    });



$('#modal').modal('show');

$('#createRoomForm, #chooseNameForm, #short-username, #short-roomName, #createdRooms').hide();

$('#chooseRoom-button, #CreateRoom-button').prop('disabled', true);

$('#roomName').focusout(function() {
    if ($('#roomName').val().length <= 4) {
        $('#roomName-errors').clearQueue();
        $('#roomName-errors').fadeIn(150).html('<p>Your room name is too short. At least five characters is required.</p>');
        $('#roomName-errors').delay(5000).fadeOut(150);
    } 
});

$('#roomPassword').focusout(function() {
    if ($('#roomPassword').val().length <= 4) {
        $('#roomName-errors').clearQueue();
        $('#roomName-errors').fadeIn(150).html('<p>Your password is too short. At least five characters is required.</p>');
        $('#roomName-errors').delay(5000).fadeOut(150);
    } 
});
$('#roomPasswordAgain').keyup(function() {
    if ($('#roomName').val().length >= 5 && $('#roomPassword').val().length >= 5 && $('#roomPassword').val() ==  $('#roomPasswordAgain').val()) {
    $('#CreateRoom-button').prop('disabled', false);
} else {
    $('#CreateRoom-button').prop('disabled', true);
}
});

$("#roomName, #roomPassword, #roomPasswordAgain").val('');
