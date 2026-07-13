// shared.js

const products = [
    { id: 101, name: "Premium Walking Harness", category: "cat", price: 28.50, stock: 15, image: "https://loremflickr.com/300/200/cat,harness/all", shortDesc: "Custom fit harness for active felines.", longDesc: "Designed for athletic builds. The ergonomic cut is comfortable and won't hide your cat's unique patterns.", rating: 4.8, reviews: 124 },
    { id: 102, name: "Heavy Duty Chew Bone", category: "dog", price: 12.99, stock: 0, image: "https://loremflickr.com/300/200/dog,bone/all", shortDesc: "Indestructible rubber bone for aggressive chewers.", longDesc: "Made from military-grade rubber, this bone will withstand even the most aggressive power chewers.", rating: 4.5, reviews: 89 },
    { id: 103, name: "Premium Catnip Blend", category: "cat", price: 9.99, stock: 40, image: "https://loremflickr.com/300/200/catnip/all", shortDesc: "100% organic, locally sourced catnip.", longDesc: "Harvested at the peak of freshness, our organic catnip blend provides maximum potency for playtime.", rating: 4.9, reviews: 210 },
    { id: 104, name: "Automatic Feeder Bowl", category: "cat", price: 45.00, stock: 5, image: "https://loremflickr.com/300/200/cat,bowl/all", shortDesc: "Programmable timer for precise portion control.", longDesc: "Set up to 4 meals a day with customizable portion sizes. Features a battery backup.", rating: 4.2, reviews: 56 },
    { id: 105, name: "Reflective Dog Collar", category: "dog", price: 18.25, stock: 20, image: "https://loremflickr.com/300/200/dog,collar/all", shortDesc: "Stay safe during night walks.", longDesc: "Highly reflective stitching ensures your dog is visible to cars during evening and early morning walks.", rating: 4.7, reviews: 150 },
    { id: 106, name: "Cuttlebone 3-Pack", category: "bird", price: 6.50, stock: 12, image: "https://loremflickr.com/300/200/parrot/all", shortDesc: "Essential calcium supplement.", longDesc: "Natural cuttlebone to help keep your bird's beak trimmed and provide necessary calcium.", rating: 4.6, reviews: 32 }
];

function getCart() {
    const cart = localStorage.getItem('petStoreCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('petStoreCart', JSON.stringify(cart));
    updateCartHeaderCount();
}

function updateCartHeaderCount() {
    const cart = getCart();
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
}

// Modal Logic for all pages
function openCartModal() {
    document.getElementById('cart-modal').style.display = 'flex';
    renderCartModal();
}

function closeCartModal() {
    document.getElementById('cart-modal').style.display = 'none';
}

function renderCartModal() {
    const cart = getCart();
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    if (!cartItemsEl) return;

    cartItemsEl.innerHTML = '';
    let totalCost = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const tr = document.createElement('tr');
        const itemTotal = product.price * item.qty;
        totalCost += itemTotal;
        
        tr.innerHTML = `
            <td>${product.name}</td>
            <td>${item.qty}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button data-testid="remove-${product.id}" onclick="removeFromCart(${item.id})" style="background: #e53e3e; padding: 0.2rem 0.5rem; width:auto;">Remove</button></td>
        `;
        cartItemsEl.appendChild(tr);
    });
    cartTotalEl.innerText = totalCost.toFixed(2);
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCartModal();
    // Refresh page UI if the functions exist on the current page
    if (typeof renderProducts === 'function') renderProducts();
    if (typeof renderPDP === 'function') renderPDP();
}

function checkout() {
    const cart = getCart();
    if(cart.length > 0) {
        alert('Mock Checkout Successful!');
        saveCart([]);
        closeCartModal();
        if (typeof renderProducts === 'function') renderProducts();
        if (typeof renderPDP === 'function') renderPDP();
    } else {
        alert('Cart is empty.');
    }
}

document.addEventListener('DOMContentLoaded', updateCartHeaderCount);
