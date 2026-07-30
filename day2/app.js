const products = [
    {
        name: 'MacBook Air M3',
        category: 'laptops',
        price: 145000,
        rating: 4.9,
        description: 'Lightweight laptop with long battery life.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260"%3E%3Crect width="400" height="260" rx="24" fill="%23f3f4f6"/%3E%3Crect x="92" y="54" width="216" height="152" rx="18" fill="%231f2937"/%3E%3Crect x="108" y="70" width="184" height="118" rx="10" fill="%23ffffff"/%3E%3Crect x="172" y="208" width="72" height="14" rx="7" fill="%23dc2626"/%3E%3Ccircle cx="200" cy="128" r="40" fill="%23dc2626" opacity="0.2"/%3E%3C/svg%3E'
    },
    {
        name: 'iPhone 16 Pro',
        category: 'smartphones',
        price: 132000,
        rating: 4.8,
        description: 'Premium smartphone with powerful camera features.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260"%3E%3Crect width="400" height="260" rx="24" fill="%23f3f4f6"/%3E%3Crect x="152" y="40" width="96" height="180" rx="24" fill="%231f2937"/%3E%3Crect x="166" y="58" width="68" height="144" rx="14" fill="%23ffffff"/%3E%3Ccircle cx="200" cy="136" r="26" fill="%23dc2626" opacity="0.18"/%3E%3Crect x="176" y="198" width="48" height="8" rx="4" fill="%23dc2626"/%3E%3C/svg%3E'
    },
    {
        name: 'Gaming Headset',
        category: 'audio',
        price: 18000,
        rating: 4.7,
        description: 'Immersive sound with noise canceling mic.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260"%3E%3Crect width="400" height="260" rx="24" fill="%23f3f4f6"/%3E%3Crect x="112" y="92" width="176" height="102" rx="40" fill="%23dc2626"/%3E%3Crect x="134" y="114" width="132" height="60" rx="28" fill="%23ffffff"/%3E%3Crect x="154" y="70" width="92" height="30" rx="14" fill="%231f2937"/%3E%3Crect x="176" y="46" width="48" height="26" rx="12" fill="%23dc2626"/%3E%3C/svg%3E'
    },
    {
        name: 'HP Laptop 15',
        category: 'laptops',
        price: 98000,
        rating: 4.6,
        description: 'Easy everyday laptop for study and work.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260"%3E%3Crect width="400" height="260" rx="24" fill="%23f3f4f6"/%3E%3Crect x="96" y="78" width="208" height="122" rx="16" fill="%231f2937"/%3E%3Crect x="112" y="94" width="176" height="90" rx="10" fill="%23ffffff"/%3E%3Crect x="146" y="196" width="108" height="16" rx="8" fill="%23dc2626"/%3E%3Ccircle cx="200" cy="140" r="32" fill="%23dc2626" opacity="0.2"/%3E%3C/svg%3E'
    }
];

const container = document.getElementById('product-grid');

if (container) {
    container.innerHTML = '';

    products.forEach((product) => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p class="price">${product.price.toLocaleString()} ETB</p>
            <p>⭐ ${product.rating.toFixed(1)}</p>
        `;
        container.appendChild(card);
    });
}
