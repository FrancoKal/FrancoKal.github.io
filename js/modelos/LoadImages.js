var INPUT;
//Abro el list.json del directorio que leo en el sessionStorage con los datos de cada modelo
var ListName = sessionStorage.getItem("ImgList");
var directory = "imagenes/" + ListName + "/", lastTimeFromUpdate = localStorage.getItem("lastTimeFromUpdate-" + ListName);

(async () => {
    var list = await GetListFrom(directory + "list.json");
    var ModelList = await SetItems(list);

    INPUT = (function ()
            {
                var l = list.length;
                var inputBox = document.getElementById("buscador").getElementsByTagName("input")[0];
                var SearchListBox = document.getElementById("search-list");
                var no_results = document.getElementById("sin-resultados");
    
                inputBox.value = ""; //Borro lo que sea que haya en el inputBox
            
                return {
    
                    Search: function ()
                    {
                        var i = 0, shown = l, input = inputBox.value.toUpperCase().split(" ");
    
                        no_results.classList.toggle("oculto", true);
                        
                        for (i of ModelList)
                        {
                            i.classList.toggle("oculto", false);
                        }
                        
                        if (!isEmpty(inputBox.value)) //Si el inputBox no esta vacio, realizo la busqueda
                        {
                            for (i = 0; i < l; i++)
                            {  
                                //Paso las descripciones de cada contenedor a mayuscula, las separo por espacio, y las comparo con los filtros
                                if (!isIncluded(input, list[i].nombre.toUpperCase()) && !isIncluded(input, list[i].descripcion.toUpperCase()))
                                {
                                    ModelList[i].classList.toggle("oculto", true);
                                    shown--;
                                }
                            }
    
                            if (shown === 0) no_results.classList.toggle("oculto", false);
                            inputBox.value = "";
                        }
    
                        INPUT.ShowSuggestions(""); //Limpio las opciones de busqueda
                    },
                                    
                    ShowSuggestions: function (search)
                    {
                        var i, UpperSearch = search.toUpperCase().split(" "), ul = SearchListBox.getElementsByTagName("ul")[0];
                        var Suggestion = {
    
                            add: function (ModelName)
                            {
                                var NewSuggestion = document.createElement("li");
        
                                NewSuggestion.setAttribute("class", "list-item");
                                NewSuggestion.addEventListener("click", () => {
                                    inputBox.value = ModelName;
                                    INPUT.Search();
                                });
            
                                NewSuggestion.innerHTML = ModelName;
                                ul.appendChild(NewSuggestion);
                            },
            
                            clean: function () 
                            {
                                //Vacio el contenido del ul
                                ul.innerHTML = "";
                            },
            
                            display: function (status)
                            {
                                SearchListBox.style.display = (status === true)? "block" : "none";
                            }
                        };
    
                        function ToggleBorderRadius (status)
                        {
                            inputBox.style.borderRadius = (status === true)? "20px" : "20px 20px 0 0";
                        }
    
                        Suggestion.clean();
                        Suggestion.display(false);
    
                        if (!isEmpty(search)) //Si el input no esta vacio, realizo la busqueda
                        {
                            for (i = 0; i < l; i++)
                            {
                                //Paso las descripciones de cada contenedor a mayuscula, las separo por espacio, y las comparo con los filtros
                                if (isIncluded(UpperSearch, list[i].nombre.toUpperCase()))
                                {
                                    Suggestion.add(list[i].nombre);
                                }
                            }
    
                            if (!isEmpty(ul.innerHTML))
                            {
                                Suggestion.display(true);
                                ToggleBorderRadius(false);
                            }
                            else ToggleBorderRadius(true);
                        }
                        else ToggleBorderRadius(true);
                    }
                };
            }) ();
}) ();


            
/*waitDoc("../imagenes/" + directory + "/list.json")
    .then((data) => {
        return list = JSON.parse(data.responseText); 
    })
    .then((parsedData) => {
        return SetItems(parsedData);
    })
    .then((ModelList) => {
        INPUT = (function ()
        {
            var l = list.length;
            var inputBox = document.getElementById("buscador").getElementsByTagName("input")[0];
            var SearchButton = document.getElementById("buscador").getElementsByTagName("button")[0];
            var SearchListBox = document.getElementById("search-list");
            var no_results = document.getElementById("sin-resultados");

            inputBox.value = ""; //Borro lo que sea que haya en el inputBox
        
            return {

                Search: function ()
                {
                    var i = 0, shown = l, input = inputBox.value.toUpperCase().split(" ");

                    no_results.classList.toggle("oculto", true);
                    
                    for (i of ModelList)
                    {
                        i.classList.toggle("oculto", false);
                    }
                    
                    if (!isEmpty(inputBox.value)) //Si el inputBox no esta vacio, realizo la busqueda
                    {
                        for (i = 0; i < l; i++)
                        {  
                            //Paso las descripciones de cada contenedor a mayuscula, las separo por espacio, y las comparo con los filtros
                            if (!isIncluded(input, list[i].nombre.toUpperCase()) && !isIncluded(input, list[i].descripcion.toUpperCase()))
                            {
                                ModelList[i].classList.toggle("oculto", true);
                                shown--;
                            }
                        }

                        if (shown === 0) no_results.classList.toggle("oculto", false);
                        inputBox.value = "";
                    }

                    INPUT.ShowSuggestions(""); //Limpio las opciones de busqueda
                },
                                
                ShowSuggestions: function (search)
                {
                    var i, UpperSearch = search.toUpperCase().split(" "), ul = SearchListBox.getElementsByTagName("ul")[0];
                    var Suggestion = {

                        add: function (ModelName)
                        {
                            var NewSuggestion = document.createElement("li");
    
                            NewSuggestion.setAttribute("class", "list-item");
                            NewSuggestion.addEventListener("click", () => {
                                inputBox.value = ModelName;
                                INPUT.Search();
                            });
        
                            NewSuggestion.innerHTML = ModelName;
                            ul.appendChild(NewSuggestion);
                        },
        
                        clean: function ()
                        {
                            //Vacio el contenido del ul
                            ul.innerHTML = "";
                        },
        
                        display: function (status)
                        {
                            SearchListBox.style.display = (status === true)? "block" : "none";
                        }
                    };

                    function ToggleBorderRadius (status)
                    {
                        inputBox.style.borderRadius = (status === true)? "20px" : "20px 20px 0 0";
                    }

                    Suggestion.clean();
                    Suggestion.display(false);

                    if (!isEmpty(search)) //Si el input no esta vacio, realizo la busqueda
                    {
                        for (i = 0; i < l; i++)
                        {
                            //Paso las descripciones de cada contenedor a mayuscula, las separo por espacio, y las comparo con los filtros
                            if (isIncluded(UpperSearch, list[i].nombre.toUpperCase()))
                            {
                                Suggestion.add(list[i].nombre);
                            }
                        }

                        if (!isEmpty(ul.innerHTML))
                        {
                            Suggestion.display(true);
                            ToggleBorderRadius(false);
                        }
                        else ToggleBorderRadius(true);
                    }
                    else ToggleBorderRadius(true);
                }
            };
        }) ();
    });*/


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
}*/

function isNull(x)
{
    return x === null;
}

function isUndefined(x)
{
    return typeof x === undefined;
}

function isEmpty(str) //Elimina los espacios y tab de un string. Retorna true si queda vacio, o false si no
{
    return (str.trim().length === 0)? true : false;
}

/*function ElementsInCommon(arr1, arr2)
{
    //Si hay en el arr2 algun elemento del arr1 , retorna true, y sino false. La funcion retorna los elementos en comun entre ambos arrays
    return arr1.filter((e) => { return arr2.includes(e); });
}*/

function isIncluded (arr1, arr2)
{
    //Retorna true si todos los elementos del arr1 estan incluidos en el arr2, y false si alguno no coincide
    return arr1.every((e) => { return arr2.includes(e); });
    //return arr1.every((e) => { return (arr2.indexOf(e) > -1)? true : false; });
}

async function SetItems (items)
{
    var imgIndex = 0, item, divs = [];
        
    for (item of items)
    {
        //divs[imgIndex] = document.createElement("div");
        divs.push(document.createElement("div"));
        divs[imgIndex].setAttribute("class", "contenedor");
        divs[imgIndex].setAttribute("onclick", "QUICK_VIEW.open(this)");
        divs[imgIndex].innerHTML = "<img src = '" + directory + toString(imgIndex + 1) + ".jpg' alt = 'No se pudo cargar la imagen'>";
        document.getElementById("imagenes").appendChild(divs[imgIndex]);
        imgIndex++;
    }

    return divs;
}

async function GetListFrom (path)
{
    var docData, headers = await getResponseHeadersFromDoc(path);

    try
    {
        if (isNull(lastTimeFromUpdate) || headers.lastModified > lastTimeFromUpdate)
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
