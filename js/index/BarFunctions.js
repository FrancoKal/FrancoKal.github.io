window.onload = () => {

    var item, smallImgs = document.querySelectorAll("#product-bar img");
    var bigImg = document.getElementById("big-img"), circle = document.getElementById("half-circle");
    var h1 = document.querySelector("#wrapper-boton h1"), a = document.querySelector("#boton a");
    
    function ChangeProduct (event)
    {
        bigImg.src = this.src;//event.target.src;
        addEvent(a, "click", () => {
            sessionStorage.setItem('ImgList', event.target.id);
        });

        if (this.id === "barbijos")
        {
            circle.style.backgroundColor = "#9d7463";
            h1.innerHTML = "Barbijos / Cubrebocas";
        }
        else
        {
            circle.style.backgroundColor = "#83acbd";
            h1.innerHTML = "Pilusos";
        }
    }

    for (item of smallImgs)
    {
        addEvent(item, "click", ChangeProduct);
        //item.addEventListener("click", ChangeProduct);
    }

}

function addEvent(element, event, func)
{
    return isUndefined(element.addEventListener)? element.attachEvent("on" + event, func) : element.addEventListener(event, func);
}

function isUndefined (x)
{
    return x === undefined;
}