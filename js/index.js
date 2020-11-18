"use strict"

/*
 * Récupérer un objet
 * Afficher un objet
 * Récupérer tous les objets
 * Afficher tous les objets dynamiquement >> tableau d'objets ?
 * Créer un objet shoppingBasket dans localStorage
 * Stocker un product dans shoppingBasket
 * Afficher les products contenus dans shoppingBasket
 * Supprimer les products contenus dans shoppingBasket
 * Afficher une page dynamique par produit
 * 
*/

/* ************************************************************************** */

async function loadProducts() {
    try {
        let response = await fetch("http://localhost:3000/api/furniture", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            let arrayOfProducts = await response.json();
            arrayOfProducts.forEach(product => {
                new Products(product._id, product.name, product.description, product.price, product.imageUrl, product.varnish);
            });
        } else {
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

/* ************************************************************************** */

loadProducts();

