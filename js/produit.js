"use strict"

// Modifier la valeur globale du panier
function modifyTotalAmount(price) {
    let totalAmount = Number(localStorage.getItem('totalAmount'));
    totalAmount += price;
    localStorage.setItem('totalAmount', totalAmount);
}

// Ajouter le produit et le vernis séléctionné dans le panier
function addToCart() {
    const productId = singleProduct.id;
    const varnishSelected = document.getElementById("varnishSelector").value;
    const productPrice = singleProduct.price;
    let quantity = 1;

    if (localStorage.length <= 0) {
        const createbasket = [];
        localStorage.setItem('basket', JSON.stringify(createbasket));
        localStorage.setItem('totalAmount', 0);
    }

    const basket = JSON.parse(localStorage.getItem("basket"));

    if (basket.length > 0) {
        let flag = false;
        for (let product of basket) {
            if (product[0] === productId && product[5] === varnishSelected) {
                product[6]++; // quantité ++
                modifyTotalAmount(productPrice);
                flag = true;
            }
        }
        if (flag === false) {
            basket.push([productId, singleProduct.name, singleProduct.description, productPrice, singleProduct.imageUrl, varnishSelected, quantity]);
            modifyTotalAmount(productPrice);
        }
    } else {
        basket.push([productId, singleProduct.name, singleProduct.description, productPrice, singleProduct.imageUrl, varnishSelected, quantity]);
        modifyTotalAmount(productPrice);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    alert("Produit ajouté au panier");
}

// Généner le bouton "Ajouter au panier" et l'affiche sur la page
function addButtonAddToCart() {
    const pageContent = document.getElementById("pageContent");
    const buttonAddToCart = document.createElement('button');

    buttonAddToCart.id = "buttonAddToCart";
    buttonAddToCart.textContent = "Ajouter au panier";
    pageContent.appendChild(buttonAddToCart);

    return buttonAddToCart.id;
}

// Récupérer l'Id depuis l'url
function getId() {
    const dataQuery = window.location.search;
    const id = dataQuery.replace("?_id=", "");
    return id;
}

// Récupérer les informations du produit à partir de son Id et le charge dans la page
async function loadOneProduct() {
    try {
        const response = await fetch("http://localhost:3000/api/furniture/" + getId(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            singleProduct = new Products(data._id, data.name, data.description, data.price, data.imageUrl, data.varnish);
            singleProduct.appendTileProductTopageContent();
            singleProduct.appendProductVarnishSelector();

            document.getElementById(singleProduct.id).removeAttribute("href");
        } else {
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

/*******************************************************************************/


loadOneProduct();

// Variable globale
var singleProduct;

const button = document.getElementById(addButtonAddToCart());
button.addEventListener("click", (event) => {
    addToCart();
});



