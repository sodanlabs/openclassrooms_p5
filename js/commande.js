"use strict"

function displayMessage(texte) {
    const pageContent = document.body;
    const divEmptyBasket = document.createElement('div');
    const p = document.createElement('p');
    const text = document.createTextNode(texte);

    p.appendChild(text);
    divEmptyBasket.appendChild(p);
    pageContent.appendChild(divEmptyBasket);

    const invisiblePageContent = document.getElementById("pageContent");
    invisiblePageContent.classList.toggle('invisible')
}

function loadOrderForm() {
    const confirmedOrder = JSON.parse(localStorage.getItem("confirmedOrder"));

    if (!confirmedOrder) {
        displayMessage("Vous n'avez pas encore validé votre panier, il n'y a pas de commande en cours.");
    } else {
        console.log("Lancement de l'affichage du formulaire");

        const customerFirstName = document.getElementById("customerFirstName");
        customerFirstName.textContent = confirmedOrder.contact.firstName;

        const orderNumber = document.getElementById("orderNumber");
        orderNumber.textContent = confirmedOrder.orderId;

        const totalPrice = document.getElementById("totalPrice");
        const totalAmount = localStorage.getItem("totalAmount");
        totalPrice.textContent = totalAmount;

        const orinocoCoin = document.getElementById('orinocoCoin');
        orinocoCoin.textContent = totalAmount * 0.015;
    }
}


/*****************************************************************************/
//         // localStorage.setItem('confirmedOrder', JSON.stringify(data));


loadOrderForm();