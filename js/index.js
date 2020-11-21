"use strict"

async function loadProducts() {
    try {
        let response = await fetch("http://localhost:3000/api/furniture", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            let productList = await response.json();
            productList.forEach(product => {
                let newItem = new Products(product._id, product.name, product.description, product.price, product.imageUrl, product.varnish);
                newItem.appendTileProductTopageContent();
            });
        } else {
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

/*****************************************************************************/

loadProducts();

