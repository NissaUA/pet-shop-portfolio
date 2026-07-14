// shared.js

const products = [
    { id: 101, name: "Premium Walking Harness", brand: "Pawsitive", category: "Accessories", price: 28.50, stock: 15, image: "https://m.media-amazon.com/images/I/81W+omkOlLL._AC_SL1500_.jpg", shortDesc: "Custom fit harness for active felines.", longDesc: "Designed for athletic builds. The ergonomic cut is comfortable and won't hide your cat's unique patterns—perfect if they have a distinct asymmetrical white mark on the right shoulder.", rating: 4.8, reviews: 124 },
    { id: 102, name: "Extreme Chew Rubber Bone", brand: "KONG", category: "Toys", price: 12.99, stock: 0, image: "https://placehold.co/300x200/2c7a7b/ffffff?text=Chew+Bone", shortDesc: "Indestructible rubber bone for aggressive chewers.", longDesc: "Made from military-grade rubber, this bone will withstand even the most aggressive power chewers.", rating: 4.5, reviews: 89 },
    { id: 103, name: "Organic Catnip Blend", brand: "Trixie", category: "Health", price: 9.99, stock: 40, image: "https://placehold.co/300x200/2c7a7b/ffffff?text=Catnip", shortDesc: "100% organic, locally sourced catnip.", longDesc: "Harvested at the peak of freshness, our organic catnip blend provides maximum potency for playtime.", rating: 4.9, reviews: 210 },
    { id: 104, name: "Automatic Smart Feeder", brand: "PetSafe", category: "Bowls", price: 45.00, stock: 5, image: "https://placehold.co/300x200/2c7a7b/ffffff?text=Smart+Feeder", shortDesc: "Programmable timer for precise portion control.", longDesc: "Set up to 4 meals a day with customizable portion sizes. Features a battery backup.", rating: 4.2, reviews: 56 },
    { id: 105, name: "Reflective Night Collar", brand: "Trixie", category: "Accessories", price: 18.25, stock: 20, image: "https://placehold.co/300x200/2c7a7b/ffffff?text=Night+Collar", shortDesc: "Stay safe during night walks.", longDesc: "Highly reflective stitching ensures your pet is visible to cars during evening and early morning walks.", rating: 4.7, reviews: 150 },
    { id: 106, name: "Natural Mineral Cuttlebone", brand: "Trixie", category: "Health", price: 6.50, stock: 12, image: "https://placehold.co/300x200/2c7a7b/ffffff?text=Cuttlebone", shortDesc: "Essential calcium supplement.", longDesc: "Natural cuttlebone to help keep your bird's beak trimmed and provide necessary calcium.", rating: 4.6, reviews: 32 },
    { id: 107, name: "Wild Prairie Dry Cat Food", brand: "Acana", category: "Food", price: 34.99, stock: 8, image: "https://placehold.co/300x200/2c7a7b/ffffff?text=Dry+Cat+Food", shortDesc: "Grain-free regional poultry recipe.", longDesc: "Loaded with free-run chicken, turkey, and whole nest-laid eggs delivered fresh or raw from regional farms.", rating: 4.9, reviews: 340 },
    { id: 108, name: "Feather Wand Teaser", brand: "Pawsitive", category: "Toys", price: 8.50, stock: 25, image: "https://placehold.co/300x200/2c7a7b/ffffff?text=Feather+Wand", shortDesc: "Interactive wand for hunting practice.", longDesc: "Features natural feathers and a flexible carbon fiber rod to mimic the erratic flight of real birds.", rating: 4.3, reviews: 77 },
    { id: 109, name: "Orthopedic Memory Foam Bed", brand: "PetSafe", category: "Accessories", price: 65.00, stock: 3, image: "https://placehold.co/300x200/2c7a7b/ffffff?text=Pet+Bed", shortDesc: "Relieves joint pain for senior pets.", longDesc: "High-density memory foam contours to your pet's body to provide optimal support and comfort.", rating: 4.8, reviews: 205 },
    { id: 110, name: "Salmon Pate Wet Food", brand: "Acana", category: "Food", price: 2.50, stock: 100, image: "https://placehold.co/300x200/2c7a7b/ffffff?text=Wet+Food", shortDesc: "Premium salmon pate in broth.", longDesc: "Rich in wild-caught salmon, this high-moisture pate keeps your pet hydrated and satisfied.", rating: 4.7, reviews: 412 }
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
