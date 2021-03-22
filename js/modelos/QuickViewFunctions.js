var QUICK_VIEW;

addEvent(document, "DOMContentLoaded", () => {

    QUICK_VIEW = (function ()
    {
        var qv = {
            img: document.getElementById("quickview-img"),
            holder: document.getElementById("quickview-holder")
        };

        return {

            open: function (event)
            {
                qv.img.src = event.target.src;
                qv.holder.classList.toggle("oculto", false);
            },

            close: function ()
            {
                qv.img.src = "";
                qv.holder.classList.toggle("oculto", true);
            }
        };
    }) ();
});
