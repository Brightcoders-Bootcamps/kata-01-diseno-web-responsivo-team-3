
function copiarAlPortapapeles(shortLinkContent ) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(shortLinkContent).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    document.getElementById("Aver").style.backgroundColor = "hsl(257, 27%, 26%)";
    document.getElementById("Aver").value = "Copied!";
    
}

