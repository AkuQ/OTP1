$('#logout').hide();

$('#menuBtn').click(function() {
    $(this).toggleClass('pressed');
    $('#logout').fadeToggle(200);
});

$('#users').click(function() {
    $(this).toggleClass('users-pressed');
    $('#messages, #group-users').fadeToggle(300);
})