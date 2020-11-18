"use strict";

class Products {
    constructor(id, name, description, price, imageUrl, varnish) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.varnish = varnish;
        const tileProduct = this.createTileProduct(
            this.id,
            this.name,
            this.description,
            this.price,
            this.imageUrl,
            this.varnish
        );
        document.getElementById("pageContent").appendChild(tileProduct);
    }

    createTileProduct(id, name, description, price, imageUrl, varnish) {
        const tile = document.createElement("a");
        tile.id = id;
        tile.classList.add("product");
        tile.setAttribute('href', "produit.html?_id=" + id);
        
        const productImage = document.createElement("img");
        productImage.setAttribute("src", imageUrl);
        productImage.classList.add("productImage");

        const productName = document.createElement("p");
        productName.textContent = name;
        productName.classList.add("productName");

        const productDescription = document.createElement("p");
        productDescription.textContent = description;
        productDescription.classList.add("productDescription");

        const productPrice = document.createElement("p");
        productPrice.textContent = price;
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

    appendProductVarnishSelector() {
        const productVarnishSelector = this.createVarnishSelector(this.varnish);
        
        productVarnishSelector.id = "varnishSelector";
        //productVarnishSelector.classList.add("productVarnishSelector");

        const productInfo = document.getElementsByClassName("productInfo")[0];
        productInfo.appendChild(productVarnishSelector);
    }

    createVarnishSelector(arrayOfVarnish) {
        const varnishSelector = document.createElement("select");
        for (let varnishTint of arrayOfVarnish) {
            const option = document.createElement("option");
            option.text = varnishTint;
            varnishSelector.append(option);
        }
        return varnishSelector;
    }

    addSelectedVarnish(selectedProduct, selectedVarnish) {
        const productVarnish = document.createElement("p");
        productVarnish.textContent = selectedVarnish;
        productVarnish.classList.add("selectedVarnish");

        console.log("produit selectionné :", selectedProduct);
        console.log(document.getElementById(selectedProduct));
        const productId = document.getElementById(selectedProduct);
        productId.appendChild(productVarnish);
    }
}
