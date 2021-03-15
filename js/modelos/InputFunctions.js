var INPUT;

function isIncluded (arr1, arr2)
{
    //Retorna true si todos los elementos del arr1 estan incluidos en el arr2, y false si alguno no coincide
    return arr1.every((e) => { return arr2.includes(e); });
    //return arr1.every((e) => { return (arr2.indexOf(e) > -1)? true : false; });
}

function isEmpty(str) //Elimina los espacios y tab de un string. Retorna true si queda vacio, o false si no
{
    return (str.trim().length === 0)? true : false;
}

function LoadINPUT ()
{
    INPUT = (() => {

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
                            
                for (i of ModelList) i.classList.toggle("oculto", false);
                            
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
                        addEvent(NewSuggestion, "click", () => {
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
                        //SearchListBox.classList.toggle("oculto", (status === true)? "block" : "none");
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
                        if (isIncluded(UpperSearch, list[i].nombre.toUpperCase())) Suggestion.add(list[i].nombre);
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
}