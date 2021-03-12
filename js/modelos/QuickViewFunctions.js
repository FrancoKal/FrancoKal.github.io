var QUICK_VIEW;

window.onload =  () => {

    QUICK_VIEW = (() => {

        var qv = {
            img: document.getElementById("quickview-img"),
            holder: document.getElementById("quickview-holder")
        };

        return {
            
            open: function (event)
            {
                console.log(event.target);
                qv.img.src = event.target.getElementsByTagName("img")[0].src;
                qv.holder.style.display = "block";
            },

            close: function ()
            {
                qv.img.src = "";
                qv.holder.style.display = "none";
            }
        };
    }) ();
};
