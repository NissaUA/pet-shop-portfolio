// shared.js

const products = [
    { id: 101, name: "Premium Walking Harness", brand: "Pawsitive", category: "Accessories", price: 28.50, stock: 15, image: "https://cocopuplondon.com/cdn/shop/files/2_5c80ab84-7c0e-4e27-86de-2b343285a792_1800x1800.png", shortDesc: "Custom fit harness for active felines.", longDesc: "Designed for athletic builds. The ergonomic cut is comfortable and won't hide your cat's unique patterns—perfect if they have a distinct asymmetrical white mark on the right shoulder.", rating: 4.8, reviews: 124 },
    { id: 102, name: "Extreme Chew Rubber Bone", brand: "KONG", category: "Toys", price: 12.99, stock: 0, image: "https://www.caninestyles.com/cdn/shop/products/Gum_Rubber_Dog_Bone2.jpg", shortDesc: "Indestructible rubber bone for aggressive chewers.", longDesc: "Made from military-grade rubber, this bone will withstand even the most aggressive power chewers.", rating: 4.5, reviews: 89 },
    { id: 103, name: "Organic Catnip Blend", brand: "Trixie", category: "Health", price: 9.99, stock: 40, image: "https://content1.rozetka.com.ua/goods/images/big/597661419.jpg", shortDesc: "100% organic, locally sourced catnip.", longDesc: "Harvested at the peak of freshness, our organic catnip blend provides maximum potency for playtime.", rating: 4.9, reviews: 210 },
    { id: 104, name: "Automatic Smart Feeder", brand: "PetSafe", category: "Bowls", price: 45.00, stock: 5, image: "https://i.allo.ua/media/Rich_Review/Smart_kormushka_Xiaomi/2.png", shortDesc: "Programmable timer for precise portion control.", longDesc: "Set up to 4 meals a day with customizable portion sizes. Features a battery backup.", rating: 4.2, reviews: 56 },
    { id: 105, name: "Reflective Night Collar", brand: "Trixie", category: "Accessories", price: 18.25, stock: 20, image: "https://img.drz.lazcdn.com/static/bd/p/ca55d35a98b73033d7f7973b9343ccbb.jpg_720x720q80.jpg", shortDesc: "Stay safe during night walks.", longDesc: "Highly reflective stitching ensures your pet is visible to cars during evening and early morning walks.", rating: 4.7, reviews: 150 },
    { id: 106, name: "Natural Mineral Cuttlebone", brand: "Trixie", category: "Health", price: 6.50, stock: 12, image: "https://m.media-amazon.com/images/I/7123TSFjjNL._AC_UF1000,1000_QL80_.jpg", shortDesc: "Essential calcium supplement.", longDesc: "Natural cuttlebone to help keep your bird's beak trimmed and provide necessary calcium.", rating: 4.6, reviews: 32 },
    { id: 107, name: "Wild Prairie Dry Cat Food", brand: "Acana", category: "Food", price: 34.99, stock: 8, image: "https://zoo-expert.com.ua/image/cache/catalog/product/9638/00038901000030478-4000x4000.jpg", shortDesc: "Grain-free regional poultry recipe.", longDesc: "Loaded with free-run chicken, turkey, and whole nest-laid eggs delivered fresh or raw from regional farms.", rating: 4.9, reviews: 340 },
    { id: 108, name: "Feather Wand Teaser", brand: "Pawsitive", category: "Toys", price: 8.50, stock: 25, image: "https://m.media-amazon.com/images/I/61S6YgvS3hL.jpg", shortDesc: "Interactive wand for hunting practice.", longDesc: "Features natural feathers and a flexible carbon fiber rod to mimic the erratic flight of real birds.", rating: 4.3, reviews: 77 },
    { id: 109, name: "Orthopedic Memory Foam Bed", brand: "PetSafe", category: "Accessories", price: 65.00, stock: 3, image: "https://content.rozetka.com.ua/goods/images/big/663751120.png", shortDesc: "Relieves joint pain for senior pets.", longDesc: "High-density memory foam contours to your pet's body to provide optimal support and comfort.", rating: 4.8, reviews: 205 },
    { id: 110, name: "Salmon Pate Wet Food", brand: "Acana", category: "Food", price: 2.50, stock: 100, image: "https://images.ctfassets.net/sa0sroutfts9/7bnbCySnXWjgYFt1oScLI0/1aaab8d1214c61336ae30d020462357a/cat-licking-lips-with-now-fresh-tuna-salmon-pate-wet-cat-food.jpg", shortDesc: "Premium salmon pate in broth.", longDesc: "Rich in wild-caught salmon, this high-moisture pate keeps your pet hydrated and satisfied.", rating: 4.7, reviews: 412 }
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

// Unified Cart Actions
window.addToCart = function(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0 && !cart.some(i => i.id === productId)) {
        cart.push({ id: product.id, qty: 1 });
        saveCart(cart);
        refreshViews();
    }
};

window.updateQty = function(productId, delta) {
    let cart = getCart();
    const itemIndex = cart.findIndex(p => p.id === productId);
    const product = products.find(p => p.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].qty += delta;
        if (cart[itemIndex].qty <= 0) cart.splice(itemIndex, 1);
        else if (cart[itemIndex].qty > product.stock) cart[itemIndex].qty = product.stock;
        saveCart(cart);
        refreshViews();
    }
};

function refreshViews() {
    if (typeof renderProducts === 'function') renderProducts();
    if (typeof renderPDP === 'function') renderPDP();
    if (document.getElementById('cart-modal') && document.getElementById('cart-modal').style.display === 'flex') {
        renderCartModal();
    }
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
            <td>
                <div class="qty-control" style="display:inline-flex; width: auto; background:transparent; border:none;">
                    <button onclick="updateQty(${product.id}, -1)" style="width:25px; padding:0; height:25px;">-</button>
                    <span class="qty-val" style="width:30px; line-height:25px;">${item.qty}</span>
                    <button onclick="updateQty(${product.id}, 1)" ${item.qty >= product.stock ? 'disabled' : ''} style="width:25px; padding:0; height:25px;">+</button>
                </div>
            </td>
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
    refreshViews();
}

function checkout() {
    const cart = getCart();
    if(cart.length > 0) {
        alert('Mock Checkout Successful!');
        saveCart([]);
        closeCartModal();
        refreshViews();
    } else {
        alert('Cart is empty.');
    }
}

document.addEventListener('DOMContentLoaded', updateCartHeaderCount);