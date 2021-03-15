var list, ModelList;

(async () => {

    //Abro el list.json del directorio que leo en el sessionStorage con los datos de cada modelo
    var ListName = sessionStorage.getItem("ImgList");
    var directory = "imagenes/" + ListName + "/", lastTimeFromUpdate = localStorage.getItem("lastTimeFromUpdate-" + ListName);

    async function SetItems (items)
    {
        var index = 1, item, divs = [];
            
        for (item of items)
        {
            //divs[index] = document.createElement("div");
            divs.push(document.createElement("div"));
            divs[index-1].setAttribute("class", "contenedor");
            //divs[index-1].setAttribute("onclick", "QUICK_VIEW.open(this)");
            addEvent(divs[index-1], "click", QUICK_VIEW.open);
            divs[index-1].innerHTML = "<img src = '" + directory + index + ".webp' alt = 'No se pudo cargar la imagen'>";
            document.getElementById("imagenes").appendChild(divs[index-1]);
            index++;
        }

        return divs;
    }

    async function GetListFrom (path)
    {
        var docData, headers = await getResponseHeadersFromDoc(path);
        var d1 = new Date (lastTimeFromUpdate), d2 = new Date (headers.lastModified);

        try
        {
            if (isNull(lastTimeFromUpdate) || d2 > d1) //Si la fecha de modificacion del JSON es posterior a la que esta en el localStorage, actualizo
            {
                localStorage.setItem("lastTimeFromUpdate-" + ListName, headers.lastModified); //Actualizo la fecha de la ultima actualizacion
                docData = await waitDoc(path).then((data) => { return data.responseText; }); //Abro el JSON y retorno los datos leidos
                localStorage.setItem(ListName + "JSON", docData); //Actualizo el local storage con el nuevo JSON
            }
            else docData = localStorage.getItem(ListName + "JSON"); //Si no es necesario actualizar el local storage, lo devuelvo asi nomas

            return JSON.parse(docData);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    list = await GetListFrom(directory + "list.json");
    ModelList = await SetItems(list);
}) ();

/*function RemoveAllElements (elements)
{
    var item;

    for (item of elements)
    {
        RemoveElement(item);
    }
}

function RemoveElement (element)
{
    element.parentNode.removeChild(element);
}

function RemoveAttributeValue (element, attribute, value)
{
    element.setAttribute(attribute, element.getAttribute(attribute).replace(value, ""));
}

function AddAttributeValue(element, attribute, value)
{
    element.setAttribute(attribute, element.getAttribute(attribute) + " " + value);
}

function ElementsInCommon(arr1, arr2)
{
    //Si hay en el arr2 algun elemento del arr1 , retorna true, y sino false. La funcion retorna los elementos en comun entre ambos arrays
    return arr1.filter((e) => { return arr2.includes(e); });
}*/

function waitDoc (path)
{
    return new Promise ((resolve, reject) => { loadDoc("GET", path, resolve); });
}

function loadDoc (method, path, callback)
{
    var xhttp = new XMLHttpRequest();

    xhttp.open(method, path, true);
    xhttp.onreadystatechange = () => {
    
        if (xhttp.readyState === xhttp.DONE && xhttp.status === 200)
        {
            callback(xhttp);
        }
    }

    xhttp.send();
}

function getResponseHeadersFromDoc (path)
{
    return new Promise ((resolve, reject) => {

        loadDoc("HEAD", path, (xhttp) => {

            var headers = new ResponseHeaders(xhttp);

            resolve(headers);
        });
    });
}

function ResponseHeaders (xhttp)
{
    return {
        contentLength: xhttp.getResponseHeader("content-length"),
        contentType: xhttp.getResponseHeader("content-type"),
        date: xhttp.getResponseHeader("date"),
        lastModified: xhttp.getResponseHeader("last-modified"),
        server: xhttp.getResponseHeader("server")
    };
}
