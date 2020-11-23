"use strict"

// Envoyer l'objet au serveur et renvoie sur la page commande.html
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
        alert("La commande a été validé, vous allez être redirigé vers la page de confirmation de commande.");
        localStorage.setItem('confirmedOrder', JSON.stringify(confirmedOrder));
        window.location.href = "./commande.html?" + confirmedOrder.orderId;
    })
    .catch(error => console.error('Erreur : ', error));
}

// Vérifier que le forumlaire soit valide avant de construire l'objet à passer au serveur
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

        // Parcours des articles du Panier et ajout dans le tableau product sans les quantités, ni les vernis choisis
        for (let product of loadBasket) {
            if (tableOfSelectedProducts.length > 0) {
                let flag = false;
                for (let item of tableOfSelectedProducts) {
                    if (product[0] === item[0]) {
                        flag = true;
                    }
                }
                if (flag === false) {
                    tableOfSelectedProducts.push(product[0]);
                }
            } else {
                tableOfSelectedProducts.push(product[0]);
            }
        }
        const newOrder = new Order(contact, tableOfSelectedProducts);

        submitOrder(newOrder);
    } else {
        alert("Veuillez inscrire une valeur correcte dans le champs en rouge pour valider le formulaire.");
    }
}



// Récupérer le montant total des achats 
function getTotalAmount() {
    const totalAmount = document.getElementById('totalPrice');
    const basketTotalAmount = Number(localStorage.getItem('totalAmount'));

    totalAmount.textContent = basketTotalAmount.toLocaleString('fr-FR', { minimumFractionDigits: '0', style: 'currency', currency: 'EUR' });
}

// Créer une nouvelle ligne dans le tableau de la page panier
function loadProductfromBasket(basket) {
    let totalPrice = document.getElementById('totalPrice').textContent;
    totalPrice = "0";
    basket.forEach(product => {
        let newLine = new Lines(basket.indexOf(product), product[0], product[1], product[2], product[3], product[4], product[5], product[6]);
    });
}

// Récupérer les données du panier
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

const button = document.getElementById('confirmOrder');
button.addEventListener("click", (event) => {
    event.preventDefault();
    checkData();
});