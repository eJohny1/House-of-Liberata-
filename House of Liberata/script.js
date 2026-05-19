// ============================================
// HOUSE OF LIBERATA - COMPLETE CART FUNCTIONALITY
// ============================================

// Product Database
const products = [
    // Featured Products & New Arrivals 
    { id: 1, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/p1.jpg", category: "featured" },
    { id: 2, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/z1.jpg", category: "featured" },
    { id: 3, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/p2.jpg", category: "featured" },
    { id: 4, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/z2.jpg", category: "featured" },
    { id: 5, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/p3.jpg", category: "featured" },
    { id: 6, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/z3.jpg", category: "featured" },
    { id: 7, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/p4.jpg", category: "featured" },
    { id: 8, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/z4.jpg", category: "featured" },
    { id: 9, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/p5.jpg", category: "new" },
    { id: 10, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/z5.jpg", category: "new" },
    { id: 11, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/p6.jpg", category: "new" },
    { id: 12, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/z6.jpg", category: "new" },
    { id: 13, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/p7.jpg", category: "new" },
    { id: 14, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/z7.jpg", category: "new" },
    { id: 15, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/p8.jpg", category: "new" },
    { id: 16, name: "Cameroon Cultural Traditional Outfits", price: 50, image: "img/products/z8.jpg", category: "new" },
    // Shop page additional products
    { id: 17, name: "Women's Modern Boubou Gown", price: 50.15, image: "img/products/p1.jpg", category: "shop" },
    { id: 18, name: "Women's up and Down boubou", price: 44.99, image: "img/products/p2.jpg", category: "shop" },
    { id: 19, name: "Women's Ankara up and Down", price: 60.75, image: "img/products/p3.jpg", category: "shop" },
];

// ============================================
// CART MANAGEMENT
// ============================================

// Load cart from localStorage or initialize empty
let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('liberataCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
}

function saveCart() {
    localStorage.setItem('liberataCart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return false;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
    return true;
}

// Remove item from cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        showNotification(`${removedItem.name} removed from cart`);
        renderCartPage(); // Re-render cart page if on cart page
        return true;
    }
    return false;
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
            renderCartPage(); // Re-render cart page
        }
        return true;
    }
    return false;
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count display in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = getCartCount();
    
    cartCountElements.forEach(element => {
        if (count > 0) {
            element.textContent = count;
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}

// Show notification message
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#088178' : '#ef3636'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #088178;
        color: white;
        font-size: 10px;
        font-weight: bold;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
    }
    
    #sp-cart {
        position: relative;
    }
    
    .remove-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #ef3636;
        font-size: 18px;
        transition: 0.3s;
    }
    
    .remove-btn:hover {
        color: #c0392b;
        transform: scale(1.1);
    }
    
    .quantity-input {
        width: 60px;
        padding: 8px;
        text-align: center;
        border: 1px solid #e2e9e1;
        border-radius: 4px;
    }
    
    .update-btn {
        background: #088178;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 5px;
        transition: 0.3s;
    }
    
    .update-btn:hover {
        background: #06685c;
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// RENDER CART PAGE
// ============================================

function renderCartPage() {
    const cartTableBody = document.querySelector('#cart tbody');
    if (!cartTableBody) return;
    
    if (cart.length === 0) {
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 60px;">
                    <i class="fa-solid fa-shopping-cart" style="font-size: 48px; color: #ccc; margin-bottom: 20px; display: block;"></i>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added any items to your cart yet.</p>
                    <a href="shop.html" class="normal" style="display: inline-block; margin-top: 20px; background: #088178; color: white; text-decoration: none;">Continue Shopping</a>
                </td>
            </tr>
        `;
        document.querySelector('#Subtotal table tbody')?.remove();
        document.querySelector('#Subtotal table')?.appendChild(createSubtotalRows());
        return;
    }
    
    cartTableBody.innerHTML = cart.map(item => `
        <tr data-id="${item.id}">
            <td><a href="#" class="remove-btn" data-id="${item.id}"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                <button class="update-btn" data-id="${item.id}">Update</button>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');
    
    // Reattaching event listeners
    attachCartEventListeners();
    
    // Update subtotal table
    const subtotalTable = document.querySelector('#Subtotal table');
    const oldTbody = subtotalTable.querySelector('tbody');
    if (oldTbody) oldTbody.remove();
    subtotalTable.appendChild(createSubtotalRows());
}

function createSubtotalRows() {
    const subtotal = getCartTotal();
    const tbody = document.createElement('tbody');
    tbody.innerHTML = `
        <tr>
            <td>Cart Subtotal</td>
            <td>$${subtotal.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Shipping</td>
            <td>Free</td>
        </tr>
        <tr>
            <td><strong>Total</strong></td>
            <td><strong>$${subtotal.toFixed(2)}</strong></td>
        </tr>
    `;
    return tbody;
}

function attachCartEventListeners() {
    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
        });
    });
    
    // Update buttons
    document.querySelectorAll('.update-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
            const newQuantity = parseInt(input.value);
            if (!isNaN(newQuantity) && newQuantity > 0) {
                updateQuantity(id, newQuantity);
            } else {
                showNotification('Please enter a valid quantity', 'error');
            }
        });
    });
    
    // Quantity input enter key
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const id = parseInt(input.dataset.id);
                const newQuantity = parseInt(input.value);
                if (!isNaN(newQuantity) && newQuantity > 0) {
                    updateQuantity(id, newQuantity);
                }
            }
        });
    });
}

// ============================================
// COUPON FUNCTIONALITY
// ============================================

function applyCoupon() {
    const couponInput = document.querySelector('#coupon input');
    if (!couponInput) return;
    
    const couponBtn = document.querySelector('#coupon button');
    if (!couponBtn) return;
    
    couponBtn.addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();
        
        // Define valid coupons
        const coupons = {
            'LIBERATA10': 0.10,
            'SAVE20': 0.20,
            'FREESHIP': 0,
            'WELCOME15': 0.15
        };
        
        if (coupons[code] !== undefined) {
            let discount = coupons[code];
            let subtotal = getCartTotal();
            let discountAmount = subtotal * discount;
            let newTotal = subtotal - discountAmount;
            
            // Update the cart totals display with discount
            const subtotalTable = document.querySelector('#Subtotal table');
            if (subtotalTable) {
                const oldTbody = subtotalTable.querySelector('tbody');
                if (oldTbody) oldTbody.remove();
                
                const tbody = document.createElement('tbody');
                if (discount > 0) {
                    tbody.innerHTML = `
                        <tr>
                            <td>Cart Subtotal</td>
                            <td>$${subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Discount (${code})</td>
                            <td style="color: #088178;">-$${discountAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>Free</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>$${newTotal.toFixed(2)}</strong></td>
                        </tr>
                    `;
                } else {
                    tbody.innerHTML = `
                        <tr>
                            <td>Cart Subtotal</td>
                            <td>$${subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>Free</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>$${subtotal.toFixed(2)}</strong></td>
                        </tr>
                    `;
                }
                subtotalTable.appendChild(tbody);
            }
            
            showNotification(`Coupon ${code} applied! ${discount > 0 ? `You saved $${discountAmount.toFixed(2)}` : 'Free shipping applied!'}`);
            couponInput.value = '';
        } else {
            showNotification('Invalid coupon code', 'error');
        }
    });
}

// ============================================
// SHOP PAGE FUNCTIONALITY
// ============================================

function initializeShopPage() {
    // Add to cart buttons on shop page
    document.querySelectorAll('.cart-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Find the product container
            const productDiv = link.closest('.pro');
            if (productDiv) {
                // Try to get product ID from data attribute or use image src as identifier
                let productId = productDiv.dataset.id;
                
                if (!productId) {
                    // Find product by image src match
                    const img = productDiv.querySelector('img');
                    const imgSrc = img ? img.src.split('/').pop() : '';
                    const product = products.find(p => p.image.includes(imgSrc));
                    if (product) {
                        productId = product.id;
                    } else {
                        // Default to a product ID based on index
                        const index = Array.from(document.querySelectorAll('.pro')).indexOf(productDiv);
                        productId = (index % products.length) + 1;
                    }
                }
                
                addToCart(productId);
            }
        });
    });
    
    // Make product clickable to navigate to single product page
    document.querySelectorAll('.pro').forEach(product => {
        product.addEventListener('click', (e) => {
            // Don't navigate if clicking on cart link
            if (e.target.closest('.cart-link')) return;
            
            // Get product ID or use image as identifier
            let productId = product.dataset.id;
            if (!productId) {
                const img = product.querySelector('img');
                const imgSrc = img ? img.src.split('/').pop() : '';
                const foundProduct = products.find(p => p.image.includes(imgSrc));
                productId = foundProduct ? foundProduct.id : 1;
            }
            
            // Store product ID in sessionStorage for singlepro.html to use
            sessionStorage.setItem('viewProductId', productId);
            window.location.href = 'singlepro.html';
        });
        product.style.cursor = 'pointer';
    });
}

// ============================================
// SINGLE PRODUCT PAGE FUNCTIONALITY
// ============================================

function initializeSingleProductPage() {
    // Load product from sessionStorage or use default
    const productId = sessionStorage.getItem('viewProductId');
    
    if (productId) {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            // Update page with product details
            const productTitle = document.querySelector('#prodinfo .lone-pro-specs h4');
            const productPrice = document.querySelector('#prodinfo .lone-pro-specs h2');
            const mainImage = document.querySelector('#sin-img');
            const productDescription = document.querySelector('#prodinfo .lone-pro-specs span');
            
            if (productTitle) productTitle.textContent = product.name;
            if (productPrice) productPrice.textContent = `$${product.price.toFixed(2)}`;
            if (mainImage) mainImage.src = product.image;
            if (productDescription) {
                productDescription.innerHTML = `Step into daily life wrapped in the vibrant storytelling of African tradition with our signature ${product.name}. Crafted from premium 100% cotton Ankara wax print, this isn't just a dress, it's a wearable canvas where Cameroon's colorful narratives meet modern comfort.`;
            }
        }
    }
    
    // Add to cart button on single product page
    const addToCartBtn = document.querySelector('#prodinfo .lone-pro-specs button.normal');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const productId = sessionStorage.getItem('viewProductId') || 1;
            const quantityInput = document.querySelector('#prodinfo .lone-pro-specs input');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            addToCart(parseInt(productId), quantity);
        });
    }
}

// ============================================
// CHECKOUT FUNCTIONALITY
// ============================================

function initializeCheckout() {
    const checkoutBtn = document.querySelector('#Subtotal button.normal');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty. Add some items first!', 'error');
            } else {
                showNotification('Proceeding to checkout... This feature is coming soon!', 'success');
                // You can redirect to a checkout page here
                // window.location.href = 'checkout.html';
            }
        });
    }
}

// ============================================
// NEWSLETTER SUBSCRIPTION
// ============================================

function initializeNewsletter() {
    const subscribeBtn = document.querySelector('#newsletter-container button');
    const emailInput = document.querySelector('#newsletter-container input');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (email && email.includes('@') && email.includes('.')) {
                showNotification(`Thanks for subscribing! We'll send updates to ${email}`);
                emailInput.value = '';
                // You can save email to localStorage or send to backend here
                let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                }
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

function initializeMobileMenu() {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');
    
    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        });
    }
    
    if (close) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }
}

// ============================================
// CART PAGE COUPON PERSISTENCE
// ============================================

// Store active coupon in localStorage
let activeCoupon = null;

function saveCouponToCart() {
    // This function can be expanded to persist coupons across page reloads
}

// ============================================
// INITIALIZE ALL PAGES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    loadCart();
    
    // Initialize mobile menu (from original script)
    initializeMobileMenu();
    
    // Update cart count in header
    updateCartCount();
    
    // Initialize cart page if on cart.html
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
        applyCoupon();
        initializeCheckout();
    }
    
    // Initialize shop page if on shop.html or index.html
    if (window.location.pathname.includes('shop.html') || window.location.pathname.includes('index.html')) {
        initializeShopPage();
    }
    
    // Initialize single product page
    if (window.location.pathname.includes('singlepro.html')) {
        initializeSingleProductPage();
    }
    
    // Initialize newsletter subscription
    initializeNewsletter();
    
    // Add cart count badge to cart icon
    const cartIcon = document.querySelector('#sp-cart a, #mobile a[href="cart.html"]');
    if (cartIcon && !cartIcon.querySelector('.cart-count')) {
        const badge = document.createElement('span');
        badge.className = 'cart-count';
        cartIcon.style.position = 'relative';
        cartIcon.appendChild(badge);
        updateCartCount();
    }
});