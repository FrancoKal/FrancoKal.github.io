var QUICK_VIEW;

addEvent("DOMContentLoaded", () => {

    QUICK_VIEW = (() => {

        var qv = {
            img: document.getElementById("quickview-img"),
            holder: document.getElementById("quickview-holder")
        };

        return {
            
            open: function (event)
            {
                qv.img.src = event.target.src;
                qv.holder.style.display = "block";
            },

            close: function ()
            {
                qv.img.src = "";
                qv.holder.style.display = "none";
            }
        };
    }) ();
});
