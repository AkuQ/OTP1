
function openDesk() {
    document.getElementById("leftContent").className = "col-xs-0 col-sm-4";
    document.getElementById("rightContent").className = "col-xs-12 col-sm-8";
   //scrollbarToggle();
}

function closeDesk() {
    document.getElementById("leftContent").className = "col-xs-12 col-sm-8";
    document.getElementById("rightContent").className = "col-xs-0 col-sm-4";
   // scrollbarToggle();
}
/*
function scrollbarToggle() {
    $('.scrollable').getNiceScroll().hide();
    $('.scrollable').delay(1000);
    $('.scrollable').getNiceScroll().resize();
    $('.scrollable').getNiceScroll().show();
}  */