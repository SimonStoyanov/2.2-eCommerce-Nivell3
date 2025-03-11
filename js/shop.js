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

            return;
        }
    });

    console.log("Your cart is: ", cart);
}

// Exercise 2
function cleanCart() {
    cart.length = 0;
    calculateTotal();
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    total = 0;

    cart.forEach(product => {
        total += product.price * product.quantity - (isNaN(product.subtotalWithDiscount) ? 0 : product.subtotalWithDiscount);
    });

    document.getElementById("total_price").innerHTML = total;
}

// Exercise 4
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    const itemsWithPromotion = cart.filter(item => item.offer != undefined);
    itemsWithPromotion.forEach(product => {
        if (product.quantity >= product.offer.number) {
            product.subtotalWithDiscount =  product.price * product.offer.percent/100 * product.quantity;
        } 
    });
}

// Exercise 5
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {

}

function open_modal() {
    printCart();
    applyPromotionsCart();
    calculateTotal();
}