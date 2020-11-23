"use strict"

// Récupérer les produits "Meuble" depuis l'api
async function getProducts() {
    try {
        let response = await fetch("http://localhost:3000/api/furniture", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const productList = await response.json();
            productList.forEach(product => {
                const newItem = new Products(product._id, product.name, product.description, product.price, product.imageUrl, product.varnish);
                newItem.appendTileProductTopageContent();
            });
        } else {
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
        displayMessage("Une erreur sur le serveur est survenue, veuillez réessayer plus tard");
    }
}

/*****************************************************************************/

getProducts();

