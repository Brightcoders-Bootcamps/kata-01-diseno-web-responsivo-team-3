let linksStore =[];
const form = document.getElementById('linkForm');
let shortLinkContent = document.querySelector('#shortLinkContent')
let fullLinkContent = document.querySelector('#fullLinkContent')

form.addEventListener("submit", function(event){
  event.preventDefault();
  let longUrl = event.target.elements['longUrl'].value;
  if(longUrl.length == 0){
    document.getElementById("longUrl").style.border="2px solid #E74C3C";
    document.getElementById("valP").style.display = "block";
  }else{
  fetchNewLink(longUrl);
    document.getElementById('Aver').style.display = "block";
    document.getElementById('box').style.display = "flex";
    document.getElementById("longUrl").style.border="";
    document.getElementById("valP").style.display = "";
  }

});

async function fetchNewLink(longUrl) {
  try {
    let newLinkJson = await postLink(longUrl);
    let newLink = await getShortLink(newLinkJson);
    linksStore.push(newLink);
    localStorage.setItem('linksList', JSON.stringify(linksStore))


    console.log(newLink);
    fullLinkContent.innerHTML = `${longUrl}`
    shortLinkContent.innerHTML = `https://rel.ink/${newLink.hashid}`
  } catch(urlError) {
    console.error('Fatal error: ', urlError);
    /* function showError(){
        alert ("An error with your link has ocurred.);
        } */
  }
}

function postLink(longUrl) {
  return fetch('https://rel.ink/api/links/', {
      method: 'POST',
      body: JSON.stringify({
        url: longUrl
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      
      throw new Error(`postLink failed due to ${response.statusText}`);
    });
}

function getShortLink(response) {
  return fetch('https://rel.ink/api/links/' + response.hashid) // https://rel.ink/api/links/hola
    .then(result => {
      if (result.ok){
        return result.json();
      }
      throw new Error(`getShortLink failed due to ${result.statusText}`);
  });
}
