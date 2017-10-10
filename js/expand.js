<<<<<<< HEAD
=======
//This is for Jasmine test
var changed = false;

>>>>>>> aebefdf5d4cfa653d9cfcb87e0266cff3188fe73
function openDesk() {
    document.getElementById("leftContent").className = "hidden-xs col-sm-4";
    document.getElementById("rightContent").className = "col-xs-12 col-sm-8";
    console.log("Chat window minimized");
}

function closeDesk() {
    document.getElementById("leftContent").className = "col-xs-12 col-sm-8";
    document.getElementById("rightContent").className = "hidden-xs col-sm-4";
    console.log("Chat window maximized");
}
