var ExpandHeader;

addEvent(document, "DOMContentLoaded", () => {

    var WrapperHeader = document.getElementById("wrapper-header");
    var icon = document.querySelector("#toggle-header i")

    ExpandHeader = () => {

        //Si retorna true, es porque la clase ahora esta presente
        WrapperHeader.classList.toggle("expanded") === true ?
            icon.classList.replace("fa-bars", "fa-times") : icon.classList.replace("fa-times", "fa-bars");
    };
});
