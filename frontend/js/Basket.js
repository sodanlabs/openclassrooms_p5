"use strict"

class Lines {
    constructor(basketId, productId, productName, productDescription, productUnitPrice, productImageUrl, productSelectedVarnish, productQuantity) {
        this.id = basketId;
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productUnitPrice = productUnitPrice;
        this.productImageUrl = productImageUrl;
        this.productSelectedVarnish = productSelectedVarnish;
        this.productQuantity = productQuantity;
        this.createLineInBasketArray();
    }

    createLineInBasketArray() {
        const basketArray = document.getElementById("tbody");

        const line = basketArray.insertRow();

        const cell0 = line.insertCell(0);
        const lineProductImageUrlLink = document.createElement("a");
        const lineProductImageUrl = document.createElement("img");
        lineProductImageUrl.setAttribute("src", this.productImageUrl);
        lineProductImageUrl.classList.add("productImageArray");
        lineProductImageUrlLink.setAttribute('href', "produit.html?_id=" + this.productId);
        lineProductImageUrlLink.appendChild(lineProductImageUrl);
        cell0.appendChild(lineProductImageUrlLink);

        const cell1 = line.insertCell(1);
        const lineProductName = document.createTextNode(this.productName);
        cell1.appendChild(lineProductName);

        const cell2 = line.insertCell(2);
        const lineProductSelectedVarnish = document.createTextNode(this.productSelectedVarnish);
        cell2.classList.add("collapse");
        cell2.appendChild(lineProductSelectedVarnish);

        const cell3 = line.insertCell(3);
        const lineProductUnitPrice = document.createTextNode(this.productUnitPrice.toLocaleString('fr-FR', { minimumFractionDigits: '0', style: 'currency', currency: 'EUR' }));
        cell3.classList.add("price");
        cell3.classList.add("collapse");
        cell3.appendChild(lineProductUnitPrice);

        const cell4 = line.insertCell(4);
        const lineProductQuantity = document.createTextNode(this.productQuantity);
        cell4.classList.add("collapse");
        cell4.appendChild(lineProductQuantity);

        const cell5 = line.insertCell(5);
        const subTotal = this.productUnitPrice * this.productQuantity;
        const lineSubtotal = document.createTextNode(subTotal.toLocaleString('fr-FR', { minimumFractionDigits: '0', style: 'currency', currency: 'EUR' })); //format the price with the french convention
        cell5.classList.add("price");
        cell5.appendChild(lineSubtotal);
    }
}