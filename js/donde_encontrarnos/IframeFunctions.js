var CHANGE_LOCATION

window.onload = () => {

    CHANGE_LOCATION = (() => {

        const left = 0, right = 1;
        /*var Locations = [

            {
                name: "Banfield",
                address: "A 2 cuadras de la estacion",
                GoogleMapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.4681138131486!2d-58.397947784282685!3d-34.74379907243152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd29f9c6e53d1%3A0x26d365b93a21343f!2sBanfield!5e0!3m2!1ses!2sar!4v1615116604130!5m2!1ses!2sar",
                isShown: true
            },
            {
                name: "Adrogue",
                address: "Galeria Adrogue, local 22",
                GoogleMpasSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d819.0721124927547!2d-58.39187127074681!3d-34.7986841975109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd33f774c10bd%3A0xe36d3d39bb19c983!2sSamuel%20Miguel%20Spiro%201098-1094%2C%20B1846DVD%20Adrogu%C3%A9%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1615117130227!5m2!1ses!2sar",
                isShown: false
            }

        ];*/
        var ChangeLocationButtons = document.getElementsByClassName("change-location"), direccion = document.getElementById("direccion");
        var iframe = document.getElementsByTagName("iframe")[0], municipio = document.getElementById("municipio");

        //Inicializo el boton izquierdo oculto y con el src de Banfield
        ChangeLocationButtons[left].classList.toggle("oculto", true);
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.4681138131486!2d-58.397947784282685!3d-34.74379907243152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd29f9c6e53d1%3A0x26d365b93a21343f!2sBanfield!5e0!3m2!1ses!2sar!4v1615116604130!5m2!1ses!2sar";

        return {

            to: function (location)
            {
                switch (location)
                {
                    case "Adrogue":
                        ChangeLocationButtons[left].classList.toggle("oculto", false);
                        ChangeLocationButtons[right].classList.toggle("oculto", true);
                        direccion.innerHTML = "Galeria Adrogue, local 22";
                        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d819.0721124927547!2d-58.39187127074681!3d-34.7986841975109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd33f774c10bd%3A0xe36d3d39bb19c983!2sSamuel%20Miguel%20Spiro%201098-1094%2C%20B1846DVD%20Adrogu%C3%A9%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1615117130227!5m2!1ses!2sar";
                        municipio.innerHTML = "Adrogue";
                        break;
                    case "Banfield":
                        ChangeLocationButtons[left].classList.toggle("oculto", true);
                        ChangeLocationButtons[right].classList.toggle("oculto", false);
                        direccion.innerHTML = "A 2 cuadras de la estacion";
                        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.4681138131486!2d-58.397947784282685!3d-34.74379907243152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd29f9c6e53d1%3A0x26d365b93a21343f!2sBanfield!5e0!3m2!1ses!2sar!4v1615116604130!5m2!1ses!2sar";
                        municipio.innerHTML = "Banfield";
                        break;
                }
            }

        };

    }) ();
};

function hasClass (element, className)
{
    return element.classList.contains(className);
}