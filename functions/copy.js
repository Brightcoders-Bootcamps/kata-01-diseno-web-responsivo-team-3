
function copiarAlPortapapeles(shortLinkContent ) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(shortLinkContent).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    
}

