"use strict"

/*
- tester si le panier est vide
 --> Afficher un message d'erreur
- importer le panier depuis localStorage
 -- Afficher le panier
- afficher un le prix par le nombre de produit

*/

function displayMessage(texte) {
    const pageContent = document.getElementById('pageContent');
    const divEmptyBasket = document.createElement('div');
    const p = document.createElement('p');
    const text = document.createTextNode(texte);

    p.appendChild(text);
    divEmptyBasket.appendChild(p);
    pageContent.appendChild(divEmptyBasket);

}

function addCalculatePrice(productId, calculatedPrice) {
    const pageContent = document.getElementById('pageContent');
    const divEmptyBasket = document.createElement('div');
    const p = document.createElement('p');
    const text = document.createTextNode(texte);

    p.appendChild(text);
    divEmptyBasket.appendChild(p);
    pageContent.appendChild(divEmptyBasket);
}



async function loadBasket(basket) {
    console.log("Début fonction loadBasket");
    for (let product of basket) {
        try {
            const response = await fetch("http://localhost:3000/api/furniture/" + product[0], {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                const singleProduct = new Products(data._id, data.name, data.description, product[2] * product[3], data.imageUrl, product[1]);
                console.log('Produit à modifier :', product[0]);
                singleProduct.addSelectedVarnish(product[0], product[1]);
    
                document.getElementById(singleProduct.id).removeAttribute("href");
            } else {
                console.error('Response Erreur : ', response.status);
            }
        } catch (error) {
            console.error('Catch Erreur : ', error);
        }
    }


    console.log(basket);
    console.log("**************************");
}



function displayBasket() {
    const basket = JSON.parse(localStorage.getItem("basket"));

    if(localStorage.length <= 0) {
        displayMessage("Votre panier est vide");
    } else {
        console.log("La panier est rempli, attend la fin du chargement");
        loadBasket(basket);
    }

}

displayBasket();