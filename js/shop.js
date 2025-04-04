let products = [];
fetch('js/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
    });


// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;
let count = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array
    products.forEach(product => {
        if (product.id === id) {
            const cartItem = cart.find(item => item.id === id);

            if (!cartItem) {
                product.quantity = 1;
                cart.push(product);
            } else {
                cartItem.quantity++;
            }

            document.getElementById("count_product").innerHTML = ++count;

            return;
        }
    });

    console.log("Your cart is: ", cart);
}

// Exercise 2
function cleanCart() {
    cart.filter(product => product.subtotalWithDiscount != undefined).map(product => {
        delete product.subtotalWithDiscount; // resets previous instances
    });
    cart.length = 0;
    count = 0;
    document.getElementById("cart_list").replaceChildren();
    document.getElementById("count_product").innerHTML = 0;
    calculateTotal();
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    total = 0;

    cart.forEach(product => {
        total += product.subtotalWithDiscount == undefined ? product.price * product.quantity : product.subtotalWithDiscount;
    });

    document.getElementById("total_price").innerHTML = total.toFixed(2);
}

// Exercise 4
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    const itemsWithPromotion = cart.filter(item => item.offer != undefined);
    itemsWithPromotion.forEach(product => {
        if (product.quantity >= product.offer.number) {
            product.subtotalWithDiscount =  parseFloat(Number(product.price * (1 - product.offer.percent/100) * product.quantity).toFixed(2));
        } 
    });
}

// Exercise 5
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const parent = document.getElementById("cart_list");

    parent.replaceChildren();

    cart.forEach(product => {
        const tr = parent.appendChild(document.createElement('tr'));
        tr.classList.add("align-middle");
        const productName = tr.appendChild(document.createElement('th'));
        productName.innerHTML = product.name;
        tr.appendChild(document.createElement('td')).innerHTML = product.price;
        tr.appendChild(document.createElement('td')).innerHTML = product.quantity;
        
        const productPriceTotal = product.price * product.quantity;
        if (product.subtotalWithDiscount == undefined) {
            tr.appendChild(document.createElement('td')).innerHTML = `$${productPriceTotal.toFixed(2)}`;
        } else {
            tr.appendChild(document.createElement('td')).innerHTML = `$${product.subtotalWithDiscount.toFixed(2)}`;
        }

        const tdBtn = tr.appendChild(document.createElement('td'));
        const removeBtn = tdBtn.appendChild(document.createElement('button'));
        removeBtn.classList.add("btn", "btn-outline-danger");
        removeBtn.setAttribute('onclick', `removeFromCart(${product.id})`);

        const removeSvg = removeBtn.appendChild(document.createElement('img'));
        removeSvg.src = "./images/remove.svg";
        removeSvg.alt = "remove";
        removeSvg.style.width = '32px';
        removeSvg.style.height = '32px';
    });
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    const productIndex = cart.findIndex(product => product.id === id);

    if (productIndex !== -1) {
        cart[productIndex].quantity--;
        document.getElementById("count_product").innerHTML = --count;

        if (cart[productIndex].offer !== undefined && cart[productIndex].quantity < cart[productIndex].offer.number) {
            delete cart[productIndex].subtotalWithDiscount;
        }

        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }

        applyPromotionsCart();
        printCart();
        calculateTotal();
    }
}

function open_modal() {
    applyPromotionsCart();
    printCart();
    calculateTotal();
}