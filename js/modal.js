$('#modal').modal({
    backdrop: 'static',
    keyboard: false
});

$("#createRoom").click(function() {
    /*$('#createRoomForm').removeClass('hidden');
    $('#back-arrow').removeClass('invisible');
    $('#createRoom, #logIn').addClass('hidden'); */
    
    $('#createRoomForm').delay(150).fadeIn(150);
    $('#back-arrow').removeClass('invisible');
    $('#createRoom, #logIn').fadeOut(150); 
    
}); 

$('#back-arrow').click(function() {
    /*$('#createRoomForm').addClass('hidden');
    $('#back-arrow').addClass('invisible');
    $('#createRoom, #logIn').removeClass('hidden');*/
    
    $('#createRoomForm').fadeOut(150);
    $('#back-arrow').addClass('invisible');
    $('#createRoom, #logIn').delay(150).fadeIn(150);
});

$('#modal').modal('show');

$('#createRoomForm').hide();