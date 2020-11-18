"use strict"

function getId() {
    const dataQuery = window.location.search;
    const id = dataQuery.replace("?_id=", "");
    return id;
}

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
            const singleProduct = new Products(data._id, data.name, data.description, data.price, data.imageUrl, data.varnish);
            singleProduct.appendProductVarnishSelector();

            document.getElementById(singleProduct.id).removeAttribute("href");
        } else {
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

function addButtonAddToCart() {
    const pageContent = document.getElementById("pageContent");
    const buttonAddToCart = document.createElement('button');
    buttonAddToCart.id = "buttonAddToCart";
    buttonAddToCart.textContent = "Ajouter au panier";
    pageContent.appendChild(buttonAddToCart);

    return buttonAddToCart.id;
}



/* ************************************************************************** */

function addToCart() {

    const productId = document.getElementById(getId()).id;
    const varnishSelected = document.getElementById("varnishSelector").value;
    const productPrice = document.getElementsByClassName('productPrice')[0].textContent;
    let quantity = 1;

    if(localStorage.length <= 0) {
    const createbasket = [];
    localStorage.setItem('basket', JSON.stringify(createbasket));
    }
    
    const basket = JSON.parse(localStorage.getItem("basket"));

    if (basket.length > 0) {
        let flag = false;
        for (let product of basket) {
            if (product[0] === productId && product[1] === varnishSelected) {
                product[3]++;
                flag = true;
            }
        }
        if (flag === false) {
            basket.push([productId, varnishSelected, productPrice, quantity]);
        }
    } else {
        basket.push([productId, varnishSelected, productPrice, quantity]);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
}

loadOneProduct();

const button = document.getElementById(addButtonAddToCart());
button.addEventListener("click", (event) => {
addToCart();
});



