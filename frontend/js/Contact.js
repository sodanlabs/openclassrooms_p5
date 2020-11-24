class Contacts {
    constructor(customerFirstName, customerLastName, customerAdress, customerCity, customerEmail) {
        this.firstName = customerFirstName;
        this.lastName = customerLastName;
        this.address = customerAdress;
        this.city = customerCity;
        this.email = customerEmail;
    }
}

class Order {
    constructor(contact, products) {
        this.contact = contact;
        this.products = products;
    }
}

class ConfirmationOrder {
    constructor(contact, arrayOfProduct, orderId) {
        this.contact = contact;
        this.products = arrayOfProduct;
        this.orderId = orderId;
    }
}