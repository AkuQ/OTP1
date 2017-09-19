
function openDesk() {
    document.getElementById("leftContent").className = "col-xs-0 col-sm-4";
    document.getElementById("rightContent").className = "col-xs-12 col-sm-8";

}

function closeDesk() {
    document.getElementById("leftContent").className = "col-xs-12 col-sm-8";
    document.getElementById("rightContent").className = "col-xs-0 col-sm-4";
}

function openMenu() {
    document.getElementById("dropMenu").style.display = "inline-block";
}

function closeMenu() {
    document.getElementById("dropMenu").style.display = "none";
}
