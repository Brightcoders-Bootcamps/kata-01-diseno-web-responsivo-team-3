function copy(event) {
    const shortenLinkInput = document.createElement('input');
    shortenLinkInput.setAttribute('value', event.previousElementSibling.textContent);
    shortenLinkInput.setAttribute('class', 'clipboard');
    document.body.appendChild(shortenLinkInput);
    shortenLinkInput.select();
    document.execCommand('copy');
    event.classList.add('copied');
    event.textContent = 'Copied!';
}
