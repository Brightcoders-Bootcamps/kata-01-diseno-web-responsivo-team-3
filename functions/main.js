const SHORTEN_LINKS_STORE =[];
const form = document.getElementById('linkForm');
const list = document.getElementById('shortenList');
function renderShortenListFromLocalStorage(data) {
  for (const link of data) {
    const { url, hashid } = link;
    const template = `
      <li class="link">
        <p class="long-link">${url}</p>
        <hr>
        <p class="short-link">https://rel.ink/${hashid}</p>
        <button onclick="copy(this)">Copy</button>
      </li>
    `;
    list.insertAdjacentHTML('afterbegin', template);
  }
}
if (localStorage.getItem('shorten::list')) {
  const data = JSON.parse(localStorage.getItem('shorten::list'));
  renderShortenListFromLocalStorage(data);
}
form.addEventListener("submit", function(event){
  event.preventDefault();
  let longUrl = event.target.elements['longUrl'].value;
  if(longUrl.length == 0) {
    document.getElementById("longUrl").style.border="2px solid #E74C3C";
    document.getElementById("valP").style.display = "block";
  } else {
    fetchNewLink(longUrl);
  }
});
async function fetchNewLink(longUrl) {
  try {
    let newLinkJson = await postLink(longUrl);
    let newLink = await getShortLink(newLinkJson);
    SHORTEN_LINKS_STORE.push(newLink);
    localStorage.setItem('shorten::list', JSON.stringify(SHORTEN_LINKS_STORE));
    const data = JSON.parse(localStorage.getItem('shorten::list'));
    list.innerHTML = '';
    renderShortenListFromLocalStorage(data);
  } catch(urlError) {
    console.error('Fatal error: ', urlError);
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
  return fetch('https://rel.ink/api/links/' + response.hashid)
    .then(result => {
      if (result.ok){
        return result.json();
      }
      throw new Error(`getShortLink failed due to ${result.statusText}`);
  });
}

