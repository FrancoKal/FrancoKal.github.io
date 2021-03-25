addEvent(document, "DOMContentLoaded", () => {

    var item, smallCircles = document.querySelectorAll("#change-product button");
    var bigImg = document.getElementById("big-img"), circle = document.getElementById("circle");
    var h1 = document.querySelector("#wrapper-boton h1"), a = document.querySelector("#boton a");

    addEvent(a, "click", () => {
        sessionStorage.setItem("ImgList", "barbijos"); //Inicializo con el boton para barbijos
    });
    
    function ChangeProduct (event)
    {
        var className = event.target.classList.value;

        addEvent(a, "click", () => {
            sessionStorage.setItem("ImgList", className);
        });

        h1.innerHTML = (className === "barbijos")? "Barbijos / Cubrebocas" : "Pilusos";
        circle.classList.value = bigImg.classList.value = className
    }

    for (item of smallCircles)
        addEvent(item, "click", ChangeProduct);
        //item.addEventListener("click", ChangeProduct);

});