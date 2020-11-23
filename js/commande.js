"use strict"
// Nettoyer les variables stockées dans localStorage
function cleanLocalStorage() {
    localStorage.removeItem("basket");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("confirmedOrder");
}



// Récupérer la réponse du serveur de la commande effectuée
function loadOrderForm() {
    const confirmedOrder = JSON.parse(localStorage.getItem("confirmedOrder"));

    if (!confirmedOrder) {
        displayMessage("Vous n'avez pas encore validé votre panier, il n'y a pas de commande en cours.");
    } else {
        const customerFirstName = document.getElementById("customerFirstName");
        customerFirstName.textContent = confirmedOrder.contact.firstName;

        const orderNumber = document.getElementById("orderNumber");
        orderNumber.textContent = confirmedOrder.orderId;

        const totalPrice = document.getElementById("totalPrice");
        const totalAmount = parseInt(localStorage.getItem("totalAmount"));
        totalPrice.textContent = totalAmount.toLocaleString('fr-FR', { minimumFractionDigits: '0', style: 'currency', currency: 'EUR' });

        const orinocoCoin = document.getElementById('orinocoCoin');
        orinocoCoin.textContent = totalAmount * 0.015;
    }
    cleanLocalStorage();
}

/*****************************************************************************/

loadOrderForm();