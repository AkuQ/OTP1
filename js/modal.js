$('#modal').modal({
    backdrop: 'static',
    keyboard: false
});

$("#createRoom").click(function() {
    $('#createRoomForm').delay(150).fadeIn(150);
    $('#back-arrow').removeClass('invisible');
    $('#createRoom, #EnterRoom').fadeOut(150); 
    
}); 

$('#back-arrow').click(function() {
    $('#short-roomName, #short-username').clearQueue();
    $('#createRoomForm, #chooseNameForm, #short-roomName, #short-username').fadeOut(150);
    $('#back-arrow').addClass('invisible');
    $('#createRoom, #EnterRoom').delay(150).fadeIn(150);
});

$('#EnterRoom').click(function() {
    $('#chooseNameForm').delay(150).fadeIn(150);
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
    if ($('#roomName').val().length >= 5) {
        $('#modal').modal('toggle');
    } else {
        $('#short-roomName').fadeIn(150);
        $('#short-roomName').delay(5000).fadeOut(150);
    }
});
    

$("#createRoomForm,#chooseNameForm").submit(function(e){
        e.preventDefault();
    });



$('#modal').modal('show');

$('#createRoomForm, #chooseNameForm, #short-username, #short-roomName').hide();