let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [
    { "id": 1, "name": "Black TShirt", "price": 1000, "image": "product1.jpg" },
    { "id": 2, "name": "Brown Jecket ", "price": 1999, "image": "product2.jpg" },
    { "id": 3, "name": "Blue Polo", "price": 1290, "image": "product3.jpg" },
    { "id": 4, "name": "Hot Coot", "price": 1200, "image": "product4.jpg" },
    { "id": 5, "name": "Winter Jacket", "price": 1300, "image": "product5.jpg" },
    { "id": 6, "name": "Thermal Shirt", "price": 1500, "image": "product6.jpg" },
    { "id": 7, "name": "Red Hoodie", "price": 2000, "image": "product7.jpg" },
    { "id": 8, "name": "Puffer Coat", "price": 1200, "image": "product5.jpg" }
];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = ''; 
    products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.dataset.id = product.id;
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add To Cart</button>
        `;
        listProductHTML.appendChild(newProduct);
    });
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity;
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.dataset.id = item.product_id;

        let positionProduct = products.find(value => value.id == item.product_id);
        listCartHTML.appendChild(newItem);
        newItem.innerHTML = `
            <div class="image"><img src="${positionProduct.image}" alt="${positionProduct.name}"></div>
            <div class="name">${positionProduct.name}</div>
            <div class="totalPrice">$${positionProduct.price * item.quantity}</div>
            <div class="quantity">
                <span class="minus">-</span>
                <span>${item.quantity}</span>
                <span class="plus">+</span>
            </div>
        `;
    });
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1;
                break;
            case 'minus':
                if (cart[positionItemInCart].quantity > 1) {
                    cart[positionItemInCart].quantity -= 1;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
};

const initApp = () => {
    addDataToHTML();
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
};

initApp();

