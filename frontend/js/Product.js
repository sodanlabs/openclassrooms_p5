"use strict";

class Products {
    constructor(id, name, description, price, imageUrl, varnish) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.varnish = varnish;
    }

    createTileProduct() {
        const tile = document.createElement("a");
        tile.id = this.id;
        tile.classList.add("product");
        tile.setAttribute('href', "produit.html?_id=" + this.id);

        const productImage = document.createElement("img");
        productImage.setAttribute("src", this.imageUrl);
        productImage.classList.add("productImage");

        const productName = document.createElement("p");
        productName.textContent = this.name;
        productName.classList.add("productName");

        const productDescription = document.createElement("p");
        productDescription.textContent = this.description;
        productDescription.classList.add("productDescription");

        const productPrice = document.createElement("p");
        productPrice.textContent = this.price.toLocaleString('fr-FR', { minimumFractionDigits: '0', style: 'currency', currency: 'EUR' });
        productPrice.classList.add("productPrice");

        const productInfo = document.createElement("div");
        productInfo.classList.add("productInfo");
        productInfo.appendChild(productName);
        productInfo.appendChild(productDescription);
        productInfo.appendChild(productPrice);

        tile.appendChild(productImage);
        tile.appendChild(productInfo);

        return tile;
    }

    appendTileProductTopageContent() {
        const tileProduct = this.createTileProduct();
        document.getElementById("pageContent").appendChild(tileProduct);
    }

    appendProductVarnishSelector() {
        const productVarnishSelector = this.createVarnishSelector(this.varnish);

        const boxOfSelector = document.createElement('div');
        boxOfSelector.classList.add("boxOfSelector");
        const selectionMessage = document.createElement('p');
        selectionMessage.textContent = "Nos vernis disponible :"

        productVarnishSelector.id = "varnishSelector";

        boxOfSelector.appendChild(selectionMessage);
        boxOfSelector.appendChild(productVarnishSelector);

        const productInfo = document.getElementsByClassName("productInfo")[0];
        productInfo.appendChild(boxOfSelector);
    }

    createVarnishSelector(arrayOfVarnish) {
        const varnishSelector = document.createElement("select");
        for (let varnishTint of arrayOfVarnish) {
            const option = document.createElement("option");
            option.value = varnishTint;
            option.text = varnishTint;
            varnishSelector.append(option);
        }
        return varnishSelector;
    }

    addSelectedVarnish(selectedProduct, selectedVarnish) {
        const productVarnish = document.createElement("p");
        productVarnish.textContent = selectedVarnish;
        productVarnish.classList.add("selectedVarnish");

        const productId = document.getElementById(selectedProduct);
        productId.appendChild(productVarnish);
    }
}
