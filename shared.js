// shared.js

// Mock Product Database
const products = [
    { 
        id: 101, 
        name: "Premium Walking Harness", 
        category: "cat", 
        price: 28.50, 
        stock: 15, 
        image: "https://placehold.co/300x200/e2e8f0/475569?text=Cat+Harness", 
        shortDesc: "Custom fit harness for active felines.", 
        longDesc: "Designed for athletic, non-chunky builds. The ergonomic cut is comfortable and won't hide your cat's unique patterns—perfect if they have distinct features like an asymmetrical white marking on the right shoulder.", 
        rating: 4.8, 
        reviews: 124 
    },
    { 
        id: 102, 
        name: "Heavy Duty Chew Bone", 
        category: "dog", 
        price: 12.99, 
        stock: 0, 
        image: "https://placehold.co/300x200/e2e8f0/475569?text=Dog+Bone",
        shortDesc: "Indestructible rubber bone for aggressive chewers.",
        longDesc: "Made from military-grade rubber, this bone will withstand even the most aggressive power chewers. Helps clean teeth and massage gums.",
        rating: 4.5,
        reviews: 89
    },
    { 
        id: 103, 
        name: "Premium Catnip Blend", 
        category: "cat", 
        price: 9.99, 
        stock: 40, 
        image: "https://placehold.co/300x200/e2e8f0/475569?text=Catnip",
        shortDesc: "100% organic, locally sourced catnip.",
        longDesc: "Harvested at the peak of freshness, our organic catnip blend provides maximum potency for playtime.",
        rating: 4.9,
        reviews: 210
    },
    { 
        id: 104, 
        name: "Automatic Feeder Bowl", 
        category: "cat", 
        price: 45.00, 
        stock: 5, 
        image: "https://placehold.co/300x200/e2e8f0/475569?text=Auto+Feeder",
        shortDesc: "Programmable timer for precise portion control.",
        longDesc: "Set up to 4 meals a day with customizable portion sizes. Features a battery backup and easy-to-clean stainless steel bowl.",
        rating: 4.2,
        reviews: 56
    }
];

// Cart State Management
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
    if (countEl) {
        countEl.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}

// Ensure header updates on page load
document.addEventListener('DOMContentLoaded', updateCartHeaderCount);
