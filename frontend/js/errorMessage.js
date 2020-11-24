function displayMessage(texte) {
    const elementBody = document.body;
    const messageDisplayed = document.createElement('div');
    messageDisplayed.classList.add("messageDisplayed");
    const p = document.createElement('p');
    const text = document.createTextNode(texte);

    p.appendChild(text);
    messageDisplayed.appendChild(p);
    elementBody.appendChild(messageDisplayed);

    const invisiblePageContent = document.getElementById("pageContent");
    invisiblePageContent.classList.toggle('invisible');
}