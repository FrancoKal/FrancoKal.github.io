addEvent(document, "DOMContentLoaded", () => {

    var item, smallImgs = document.querySelectorAll("#product-bar img");
    var bigImg = document.getElementById("big-img"), circle = document.getElementById("half-circle");
    var h1 = document.querySelector("#outer-wrapper-boton h1"), a = document.querySelector("#boton a");

    addEvent(a, "click", () => {
        sessionStorage.setItem("ImgList", "barbijos"); //Inicializo con el boton para barbijos
    });
    
    function ChangeProduct (event)
    {
        var className = event.target.classList.toString();

        bigImg.src = this.src;//event.target.src;
        addEvent(a, "click", () => {
            sessionStorage.setItem("ImgList", className);
        });

        if (className === "barbijos")
        {
            circle.classList.replace("pilusos", "barbijos");
            h1.innerHTML = "Barbijos / Cubrebocas";
        }
        else
        {
            circle.classList.replace("barbijos", "pilusos");
            h1.innerHTML = "Pilusos";
        }
    }

    for (item of smallImgs)
        addEvent(item, "click", ChangeProduct);
        //item.addEventListener("click", ChangeProduct);

});