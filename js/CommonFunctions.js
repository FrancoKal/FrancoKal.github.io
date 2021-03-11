function isNull(x)
{
    return x === null;
}

function isUndefined(x)
{
    return typeof x === undefined;
}

function addEvent(element, event, func)
{
    return isUndefined(element.addEventListener)? element.attachEvent("on" + event, func) : element.addEventListener(event, func);
}