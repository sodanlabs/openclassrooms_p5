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

    const invisiblePageContent = document.getElementById("pageContent");
    invisiblePageContent.classList.toggle('invisible')

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

displayBasket();

function submitOrder(orderToSubmit) {
    fetch('http://localhost:3000/api/furniture/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderToSubmit)
      })
    .then(response => response.json())
    .then(confirmedOrder => {
        console.log("data :", confirmedOrder);
        localStorage.setItem('confirmedOrder', JSON.stringify(confirmedOrder));
        window.location.href = "./commande.html?" + confirmedOrder.orderId;
    })
    .catch(error => console.error('Erreur : ', error));
}

function checkData() {
    let customerLastName = document.getElementById('customerLastName');
    let customerFirstName = document.getElementById('customerFirstName');
    let customerAdress = document.getElementById('customerAdress');
    let customerCity = document.getElementById('customerCity');
    let customerEmail = document.getElementById('customerEmail');

    if (document.getElementById("orderForm").checkValidity()) {

        const contact = new Contacts(customerFirstName.value, customerLastName.value, customerAdress.value, customerCity.value, customerEmail.value);

        const loadBasket = JSON.parse(localStorage.getItem("basket"));

        let tableOfSelectedProducts = [];

        // Parcours des articles du Panier et ajout dans le tableau de produits avec les quantités tout vernis confondu. Ne tient pas compte de vernis selectionné.
        for (let product of loadBasket) {
            if (tableOfSelectedProducts.length > 0) {
                let flag = false;
                for (let item of tableOfSelectedProducts) {
                    if (product[0] === item[0]) {
                        // item[1] += product[6];
                        flag = true;
                    }
                }
                if (flag === false) {
                    // tableOfSelectedProducts.push([product[0], product[6]]); // productId, productQuantity
                    tableOfSelectedProducts.push(product[0]);
                }
            } else {
                // tableOfSelectedProducts.push([product[0], product[6]]); // productId, productQuantity
                tableOfSelectedProducts.push(product[0]);
            }
        }
        const newOrder = new Order(contact, tableOfSelectedProducts);

        console.log({newOrder});
        submitOrder(newOrder);

    } else {
        alert("Veuillez inscrire une valeur correcte dans le champs en rouge pour valider le formulaire.");
    }

}

/*****************************************************************************/

const button = document.getElementById('confirmOrder');
button.addEventListener("click", (event) => {
    event.preventDefault();
    checkData();
});