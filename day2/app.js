// --- 1. Products Data (Tech Electronics with Valid Unsplash URLs) ---
const products = [
    {
        id: "t1",
        name: "HP 15.6\" Laptop (Intel i5, 8GB, 512GB SSD)",
        category: "laptops",
        price: 38500,
        rating: 4.6,
        inStock: true,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80", // HP / Sleek Laptop
        description: "Sleek dark laptop designed for daily productivity, business, and multitasking."
    },
    {
        id: "t2",
        name: "Apple MacBook Air 15\" (M2 Chip)",
        category: "laptops",
        price: 112000,
        rating: 4.9,
        inStock: true,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80", // MacBook Air
        description: "Ultra-thin Apple MacBook Air featuring liquid retina display and silent fanless design."
    },
    {
        id: "t3",
        name: "Triple Camera Flagship Smartphone",
        category: "smartphones",
        price: 85000,
        rating: 4.8,
        inStock: true,
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80", // Flagship Smartphone
        description: "High-end smartphone with versatile triple-lens camera setup and vibrant display."
    },
    {
        id: "t4",
        name: "Slim Android Smartphone 6.5\"",
        category: "smartphones",
        price: 18500,
        rating: 4.4,
        inStock: true,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80", // Slim Smartphone
        description: "Budget-friendly smartphone with long-lasting battery life and crisp display."
    },
    {
        id: "t5",
        name: "Pro Gaming Wired Over-Ear Headset",
        category: "audio",
        price: 4200,
        rating: 4.5,
        inStock: true,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80", // Over-Ear Gaming Headset
        description: "Noise-isolating gaming headset with flexible boom microphone and comfortable padding."
    },
    {
        id: "t6",
        name: "True Wireless Stereo Earbuds & Case",
        category: "audio",
        price: 3500,
        rating: 4.7,
        inStock: false,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80", // Wireless Earbuds
        description: "Compact wireless earbuds with deep bass response and sleek charging case."
    }
];

// --- 2. State Management ---
let cart = JSON.parse(localStorage.getItem('merkatotech_cart')) || [];
let activeCategory = 'all';
let maxPrice = 150000;
let minRating = 0;
let inStockOnly = false;
let searchQuery = '';
let currentSort = 'featured';
const freeDeliveryThreshold = 15000;

// --- 3. DOM References ---
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartShipping = document.getElementById('cart-shipping');
const cartTopUp = document.getElementById('cart-topup');
const cartTotal = document.getElementById('cart-total');
const cartTopUpNote = document.getElementById('cart-topup-note');
const navButtons = document.querySelectorAll('.nav-btn');
const categoryTitle = document.getElementById('current-category-title');
const priceRange = document.getElementById('price-range');
const priceVal = document.getElementById('price-val');
const inStockCheckbox = document.getElementById('in-stock-only');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const themeToggle = document.getElementById('theme-toggle');

// --- 4. Render Functions ---

function renderProducts() {
    productGrid.innerHTML = '';

    // Filter Logic
    let filtered = products.filter(product => {
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesPrice = product.price <= maxPrice;
        const matchesRating = product.rating >= minRating;
        const matchesStock = !inStockOnly || product.inStock;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesPrice && matchesRating && matchesStock && matchesSearch;
    });

    // Sorting Logic
    if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    if (filtered.length === 0) {
        productGrid.innerHTML = `<p class="no-results">No tech products match your selected criteria.</p>`;
        return;
    }

    // Dynamic Creation of Product Cards
    filtered.forEach(product => {
        const article = document.createElement('article');
        article.className = 'product-card';
        article.innerHTML = `
            <figure>
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </figure>
            <h3>${product.name}</h3>
            <p><small>${product.description}</small></p>
            <p>Rating: ⭐ ${product.rating} / 5.0</p>
            <p class="price">${product.price.toLocaleString()} ETB</p>
            <p><mark>${product.inStock ? 'In Stock' : 'Out of Stock'}</mark></p>
            <button 
                onclick="addToCart('${product.id}')" 
                ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? 'Add to Cart 🛒' : 'Out of Stock'}
            </button>
        `;
        productGrid.appendChild(article);
    });
}

function updateCartUI() {
    // Update Badge Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Render Cart Items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your tech basket is currently empty.</p>';
    } else {
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.price.toLocaleString()} ETB x ${item.quantity}</small>
                </div>
                <div>
                    <button onclick="changeQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.id}', 1)">+</button>
                    <button onclick="removeFromCart('${item.id}')" aria-label="Remove item">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    // Calculate Totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= freeDeliveryThreshold ? 0 : subtotal > 0 ? 350 : 0;
    const topUpNeeded = subtotal > 0 && subtotal < freeDeliveryThreshold ? freeDeliveryThreshold - subtotal : 0;
    const total = subtotal + shipping;

    cartSubtotal.textContent = subtotal.toLocaleString('en-US', {minimumFractionDigits: 2});
    cartShipping.textContent = shipping.toLocaleString('en-US', {minimumFractionDigits: 2});
    cartTopUp.textContent = topUpNeeded.toLocaleString('en-US', {minimumFractionDigits: 2});
    cartTotal.textContent = total.toLocaleString('en-US', {minimumFractionDigits: 2});

    if (subtotal === 0) {
        cartTopUpNote.textContent = 'Your cart is empty.';
    } else if (topUpNeeded > 0) {
        cartTopUpNote.textContent = `Add ${topUpNeeded.toLocaleString('en-US')} ETB more to unlock free delivery.`;
    } else {
        cartTopUpNote.textContent = 'You qualify for free delivery.';
    }

    // Save to LocalStorage
    localStorage.setItem('merkatotech_cart', JSON.stringify(cart));
}

// --- 5. Global Action Handlers ---

window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
};

window.changeQuantity = function(productId, delta) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

// --- 6. Event Listeners ---

// Navigation Categories
navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        navButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeCategory = e.target.dataset.category;
        categoryTitle.textContent = e.target.textContent;
        renderProducts();
    });
});

// Price Filter
priceRange.addEventListener('input', (e) => {
    maxPrice = Number(e.target.value);
    priceVal.textContent = maxPrice.toLocaleString();
    renderProducts();
});

// Stock Filter
inStockCheckbox.addEventListener('change', (e) => {
    inStockOnly = e.target.checked;
    renderProducts();
});

// Rating Radio Buttons
document.querySelectorAll('input[name="rating-filter"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        minRating = Number(e.target.value);
        renderProducts();
    });
});

// Search Bar
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = searchInput.value;
    renderProducts();
});

// Sorting Select
sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
});

// Cart Dialog Modals
cartBtn.addEventListener('click', () => cartModal.showModal());
closeCartBtn.addEventListener('click', () => cartModal.close());

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Checkout Form Submission
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Ameseginalehu! Thank you for ordering with Merkato Tech. Your purchase is confirmed!');
    cart = [];
    updateCartUI();
    cartModal.close();
});

// Reset Filter Listener
document.getElementById('reset-filters').addEventListener('click', () => {
    maxPrice = 150000;
    minRating = 0;
    inStockOnly = false;
    searchQuery = '';
    priceVal.textContent = '150000';
    setTimeout(renderProducts, 50);
});

// --- 7. Initial Load ---
renderProducts();
updateCartUI();