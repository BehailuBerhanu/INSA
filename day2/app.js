const products = [
    {
        name: 'MacBook Air M3',
        category: 'laptops',
        price: 145000,
        rating: 4.9,
        description: 'Lightweight laptop with long battery life.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'iPhone 16 Pro',
        category: 'smartphones',
        price: 132000,
        rating: 4.8,
        description: 'Premium smartphone with powerful camera features.',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Gaming Headset',
        category: 'audio',
        price: 18000,
        rating: 4.7,
        description: 'Immersive sound with noise canceling mic.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'HP Laptop 15',
        category: 'laptops',
        price: 98000,
        rating: 4.6,
        description: 'Easy everyday laptop for study and work.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'HP elite book laptop',
        category: 'laptops',
        price: 85000,
        rating: 4.9,
        description: 'best PC for editors and coders',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Mac book M3',
        category: 'laptops',
        price: 145000,
        rating: 5,
        description: 'latest mac product',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'toshiba',
        category: 'laptops',
        price: 35000,
        rating: 3.5,
        description: 'best performance for small office works',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Asus',
        category: 'laptops',
        price: 65000,
        rating: 4,
        description: 'best for university students for research work',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'samsung fold',
        category: 'smartphones',
        price: 20000,
        rating: 3.9,
        description: 'foldable phone is high quality camera and specs',
        image: 'https://images.unsplash.com/photo-1568378711447-f5eef04d85b5?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
];

const container = document.getElementById('product-grid');
const cartButton = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart-btn');
const cartCountOutput = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTopup = document.getElementById('cart-topup');
const cartShipping = document.getElementById('cart-shipping');
const cartTotal = document.getElementById('cart-total');
const cartTopupNote = document.getElementById('cart-topup-note');
const checkoutForm = document.getElementById('checkout-form');
const deliveryCity = document.getElementById('delivery-city');

let cart = [];

function renderProducts() {
    if (!container) return;

    container.innerHTML = '';

    products.forEach((product) => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
            <img src='${product.image}' alt='${product.name}' class='product-image'>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p class='price'>${product.price.toLocaleString()} ETB</p>
            <p>⭐ ${product.rating.toFixed(1)}</p>
            <div class='product-actions'>
                <button class='add-to-cart-btn' data-name='${product.name}'>Add to Cart</button>
                <button class='buy-now-btn' data-name='${product.name}'>Buy Now</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function addToCart(productName) {
    const selectedProduct = products.find((product) => product.name === productName);
    if (!selectedProduct) return;

    const existingItem = cart.find((item) => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...selectedProduct, quantity: 1 });
    }

    renderCart();
}

function openCart() {
    if (cartModal) {
        cartModal.showModal();
    }
}

function closeCart() {
    if (cartModal) {
        cartModal.close();
    }
}

function updateQuantity(productName, change) {
    const existingItem = cart.find((item) => item.name === productName);
    if (!existingItem) return;

    existingItem.quantity += change;

    if (existingItem.quantity <= 0) {
        cart = cart.filter((item) => item.name !== productName);
    }

    renderCart();
}

function renderCart() {
    if (cartCountOutput) {
        cartCountOutput.value = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map((item) => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} ETB each</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" data-action="decrease" data-name="${item.name}">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" data-action="increase" data-name="${item.name}">+</button>
                </div>
            </div>
        `).join('');
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 15000 ? 0 : 300;
    const topup = subtotal >= 15000 ? 0 : Math.max(15000 - subtotal, 0);
    const total = subtotal + shipping;

    if (cartSubtotal) cartSubtotal.textContent = subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (cartTopup) cartTopup.textContent = topup.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (cartShipping) cartShipping.textContent = shipping.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (cartTotal) cartTotal.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (cartTopupNote) {
        cartTopupNote.textContent = subtotal >= 15000
            ? 'You qualify for free delivery.'
            : `Add ${topup.toLocaleString()} ETB more for free delivery.`;
    }
}

renderProducts();
renderCart();

if (container) {
    container.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;

        const productName = button.getAttribute('data-name');
        if (!productName) return;

        if (button.classList.contains('add-to-cart-btn')) {
            addToCart(productName);
        }

        if (button.classList.contains('buy-now-btn')) {
            addToCart(productName);
            openCart();
        }
    });
}

if (cartButton) {
    cartButton.addEventListener('click', openCart);
}

if (closeCartButton) {
    closeCartButton.addEventListener('click', closeCart);
}

if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;

        const productName = button.getAttribute('data-name');
        const action = button.getAttribute('data-action');
        if (!productName || !action) return;

        if (action === 'increase') {
            updateQuantity(productName, 1);
        }

        if (action === 'decrease') {
            updateQuantity(productName, -1);
        }
    });
}

if (checkoutForm) {
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const locationLabel = deliveryCity && deliveryCity.value === 'addis'
            ? 'Addis Ababa'
            : deliveryCity && deliveryCity.value === 'regional'
                ? 'regional Ethiopia'
                : 'international delivery';

        alert(`Thanks for your order! We will deliver to ${locationLabel}.`);
        cart = [];
        renderCart();
        closeCart();
    });
}
