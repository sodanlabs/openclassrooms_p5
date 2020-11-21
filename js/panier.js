"use strict"

function getTotalAmount() {
    const totalAmount = document.getElementById('totalPrice');
    const basketTotalAmount = Number(localStorage.getItem('totalAmount'));

    totalAmount.textContent = basketTotalAmount.toLocaleString('fr-FR', { minimumFractionDigits: '0', style: 'currency', currency: 'EUR' });
}

function loadProductfromBasket(basket) {
    let totalPrice = document.getElementById('totalPrice').textContent;
    totalPrice = "0";
    basket.forEach(product => {
        let newLine = new Lines(basket.indexOf(product), product[0], product[1], product[2], product[3], product[4], product[5], product[6]);
    });
}

function displayMessage(texte) {
    const pageContent = document.body;
    const divEmptyBasket = document.createElement('div');
    const p = document.createElement('p');
    const text = document.createTextNode(texte);

    p.appendChild(text);
    divEmptyBasket.appendChild(p);
    pageContent.appendChild(divEmptyBasket);

    const invisibleArray = document.getElementById("table");
    table.classList.toggle('invisible')

}

function displayBasket() {
    const basket = JSON.parse(localStorage.getItem("basket"));

    if (localStorage.length <= 0) {
        displayMessage("Votre panier est vide");
    } else {
        loadProductfromBasket(basket);
        getTotalAmount();
    }
}

/*****************************************************************************/

displayBasket();