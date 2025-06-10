// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartButton = document.getElementById('cartButton');
const chatButton = document.getElementById('chatButton');
const cartModal = document.getElementById('cartModal');
const chatModal = document.getElementById('chatModal');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatHistory = document.getElementById('chatHistory');
const authContainer = document.getElementById('authContainer');
const mainContent = document.getElementById('mainContent');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const authTabs = document.querySelectorAll('.auth-tab');
const profileButton = document.getElementById('profileButton');
const ordersButton = document.getElementById('ordersButton');
const logoutButton = document.getElementById('logoutButton');
const profileModal = document.getElementById('profileModal');
const ordersModal = document.getElementById('ordersModal');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const ordersList = document.getElementById('ordersList');
const photoUpload = document.getElementById('photoUpload');
const uploadButton = document.getElementById('uploadButton');

// Sample products data
const sampleProducts = [
    // Electronics
    { id: 1, name: "Wireless Headphones", price: 7999, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60" },
    { id: 2, name: "Smart Watch", price: 15999, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60" },
    { id: 3, name: "Bluetooth Speaker", price: 4499, category: "Electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60" },
    { id: 4, name: "Fitness Tracker", price: 6999, category: "Electronics", image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format&fit=crop&q=60" },
    // Fashion
    { id: 5, name: "Classic T-Shirt", price: 1499, category: "Fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60" },
    { id: 6, name: "Denim Jeans", price: 3999, category: "Fashion", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60" },
    { id: 7, name: "Sneakers", price: 5999, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
    { id: 8, name: "Leather Wallet", price: 2499, category: "Fashion", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60" },
    // Home
    { id: 9, name: "Coffee Maker", price: 5999, category: "Home", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60" },
    { id: 10, name: "Ceramic Mug Set", price: 1999, category: "Home", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&auto=format&fit=crop&q=60" },
    { id: 11, name: "Throw Blanket", price: 2499, category: "Home", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60" },
    { id: 12, name: "Aroma Diffuser", price: 2999, category: "Home", image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=500&auto=format&fit=crop&q=60" },
    // Accessories
    { id: 13, name: "Laptop Backpack", price: 3999, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60" },
    { id: 14, name: "Sunglasses", price: 1999, category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60" },
    { id: 15, name: "Travel Pillow", price: 1299, category: "Accessories", image: "https://images.unsplash.com/photo-1583846781998-527b404a3ceb?w=500&auto=format&fit=crop&q=60" },
    { id: 16, name: "Reusable Water Bottle", price: 999, category: "Accessories", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60" }
];

// State
let cart = [];
let products = [];
let currentUser = null;
let isFreeChatMode = false;

// Modal history for back button
let modalHistory = [];

// Chat state management
let chatState = {
    currentOrder: null,
    returnReason: null,
    waitingForPhoto: false,
    refundRequested: false
};

// Add AI configuration
const AI_CONFIG = {
    apiKey: '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',
    model: 'gpt-3.5-turbo',
    maxTokens: 150
};

// Add FAQ data
const faqData = {
    'Order & Delivery': [
        {
            question: 'How can I track my order?',
            answer: 'You can track your order in two ways:\n1. Click on "My Orders" in your profile\n2. Use the chat assistant and select "Track Order"\n\nYour order status will be updated in real-time.'
        },
        {
            question: 'What are the delivery charges?',
            answer: 'Standard delivery charges are ₹99 per order. Free delivery is available on orders above ₹999. Express delivery (₹199) is available for select locations.'
        },
        {
            question: 'How long does delivery take?',
            answer: 'Standard delivery: 3-5 business days\nExpress delivery: 1-2 business days\nRural areas: 5-7 business days\n\nDelivery times may vary during peak seasons.'
        }
    ],
    'Returns & Refunds': [
        {
            question: 'What is the return policy?',
            answer: 'We offer a 30-day return policy:\n• Products must be unused and in original packaging\n• Return shipping is free\n• Refunds are processed within 5-7 business days\n• Original payment method will be credited'
        },
        {
            question: 'How do I request a return?',
            answer: 'To request a return:\n1. Go to "My Orders"\n2. Select the order you want to return\n3. Click "Request Return"\n4. Choose return reason\n5. Upload photo of the issue\n6. Print return label\n\nOur chat assistant can also help you with returns.'
        },
        {
            question: 'When will I receive my refund?',
            answer: 'Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method. You\'ll receive an email confirmation once the refund is processed.'
        }
    ],
    'Payment & Security': [
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept:\n• Credit/Debit Cards\n• UPI (Google Pay, PhonePe, Paytm)\n• Net Banking\n• Wallets\n• EMI (on select products)\n\nAll payments are secure and encrypted.'
        },
        {
            question: 'Is my payment information secure?',
            answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your complete card details on our servers. All transactions are processed through secure payment gateways.'
        },
        {
            question: 'Do you offer EMI options?',
            answer: 'Yes, EMI is available on products above ₹5,000. You can choose from 3, 6, 9, or 12 months EMI options. EMI is available with most major banks and credit cards.'
        }
    ],
    'Account & Profile': [
        {
            question: 'How do I update my delivery address?',
            answer: 'To update your delivery address:\n1. Go to your profile\n2. Click "Edit Profile"\n3. Update your address\n4. Save changes\n\nYou can add multiple delivery addresses.'
        },
        {
            question: 'How do I change my password?',
            answer: 'To change your password:\n1. Go to your profile\n2. Click "Security Settings"\n3. Select "Change Password"\n4. Enter current and new password\n5. Save changes'
        },
        {
            question: 'How do I delete my account?',
            answer: 'To delete your account:\n1. Go to your profile\n2. Click "Account Settings"\n3. Scroll to bottom\n4. Click "Delete Account"\n5. Confirm deletion\n\nNote: This action cannot be undone.'
        }
    ]
};

// Add chat mode toggle
function toggleChatMode() {
    isFreeChatMode = !isFreeChatMode;
    const modeText = isFreeChatMode ? 'Free Chat' : 'Structured Chat';
    addMessageToChat('bot', `Switched to ${modeText} mode. ${isFreeChatMode ? 'You can now chat freely about any topic.' : 'Please select from the options below.'}`);
    updateChatOptions();
}

function updateChatOptions() {
    const options = isFreeChatMode ? [
        { text: 'Switch to Structured Chat', action: 'toggle_chat_mode' }
    ] : [
        { text: 'Switch to Free Chat', action: 'toggle_chat_mode' },
        { text: 'Return Request', action: 'return_request' },
        { text: 'Help Center', action: 'help_center' }
    ];
    addMessageToChat('bot', 'How can I help you today?', options);
}

async function handleFreeChatMessage(message) {
    try {
        // Handle return/refund related queries
        if (message.toLowerCase().includes('return') || message.toLowerCase().includes('refund')) {
            const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`) || '[]');
            if (orders.length === 0) {
                return "I don't see any orders in your account. Have you made a purchase with us?";
            }
            
            // Show order list for return
            showOrderList(orders);
            return null; // Don't show duplicate message
        }

        // Handle help center related queries
        if (message.toLowerCase().includes('help') || 
            message.toLowerCase().includes('faq') || 
            message.toLowerCase().includes('question') ||
            message.toLowerCase().includes('how to')) {
            showHelpCenter();
            return "I've opened the Help Center for you. You can browse through different categories and click on questions to see their answers.";
        }

        // Handle simple greetings and acknowledgments first
        if (message.toLowerCase().match(/^(hi|hello|hey|okay|ok|yes|yeah|sure)$/)) {
            const greetings = [
                "Hi there! How can I assist you today?",
                "Hello! What can I help you with?",
                "Hey! I'm here to help. What would you like to know?",
                "Great! What would you like to do?",
                "Perfect! How can I assist you?",
                "Sure thing! What can I help you with today?"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a friendly and helpful e-commerce assistant for ShopSphere. Respond in a natural, conversational way. Be helpful but concise. If the user asks about returns, orders, or products, guide them through the process while maintaining a friendly tone. Never repeat the same response twice in a row.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: AI_CONFIG.maxTokens
            })
        });

        if (response.status === 429) {
            // Rate limit exceeded - provide varied fallback responses
            if (message.toLowerCase().includes('product')) {
                const productResponses = [
                    "We have a great selection of products! We offer everything from electronics like headphones and smart watches to fashion items, home goods, and accessories. Is there something specific you're looking for? I'd be happy to help you find it!",
                    "Our store has a wide variety of items! From the latest electronics to trendy fashion and cozy home goods. What kind of products interest you?",
                    "I'd love to tell you about our products! We have everything from tech gadgets to fashion and home decor. What category would you like to explore?"
                ];
                return productResponses[Math.floor(Math.random() * productResponses.length)];
            } else if (message.toLowerCase().includes('order') || message.toLowerCase().includes('track')) {
                const orderResponses = [
                    "I can help you track your order! Just let me know which order you're looking for, and I'll show you its current status and tracking information.",
                    "Sure, I can help you find your order! Which order number would you like to check?",
                    "I'd be happy to help you track your order. Could you share the order number you're looking for?"
                ];
                return orderResponses[Math.floor(Math.random() * orderResponses.length)];
            } else if (message.toLowerCase().includes('return') || message.toLowerCase().includes('refund')) {
                const returnResponses = [
                    "I'd be happy to help you with your return! Could you let me know which order you'd like to return?",
                    "I'll help you process your return. First, could you tell me which order you'd like to return?",
                    "Let's get your return started! Which order would you like to return? I'll walk you through the process."
                ];
                return returnResponses[Math.floor(Math.random() * returnResponses.length)];
            } else {
                const defaultResponses = [
                    "I'm here to help! Whether you need information about our products, want to track an order, or need help with a return, just let me know what you're looking for, and I'll assist you right away.",
                    "How can I assist you today? I can help with product information, order tracking, or returns.",
                    "I'm ready to help! What would you like to know about our products, orders, or returns?"
                ];
                return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
            }
        }

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            return data.choices[0].message.content;
        }
        return "I apologize, but I'm having trouble processing your request right now. Could you try asking that again?";
    } catch (error) {
        console.error('Error in AI chat:', error);
        return "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.";
    }
}

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        currentUser = JSON.parse(user);
        showMainContent();
    } else {
        showAuthContainer();
    }
}

// Show main content
function showMainContent() {
    authContainer.classList.add('hidden');
    mainContent.classList.remove('hidden');
    updateUserInfo();
    fetchProducts();
    fetchOrders();
}

// Show auth container
function showAuthContainer() {
    authContainer.classList.remove('hidden');
    mainContent.classList.add('hidden');
}

// Update user info in profile
function updateUserInfo() {
    if (currentUser) {
        userName.textContent = currentUser.name;
        userEmail.textContent = currentUser.email;
    }
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    try {
        // In a real app, this would be an API call
        // For demo, we'll just check if the user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            currentUser = { name: user.name, email: user.email };
            localStorage.setItem('user', JSON.stringify(currentUser));
            showMainContent();
        } else {
            alert('Invalid email or password');
        }
    } catch (error) {
        alert('Login failed. Please try again.');
    }
}

// Handle signup
async function handleSignup(e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = e.target.querySelectorAll('input[type="password"]')[1].value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        // In a real app, this would be an API call
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        currentUser = { name, email };
        localStorage.setItem('user', JSON.stringify(currentUser));
        showMainContent();
    } catch (error) {
        alert('Signup failed. Please try again.');
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('user');
    currentUser = null;
    cart = [];
    showAuthContainer();
}

// Fetch user orders
async function fetchOrders() {
    try {
        // In a real app, this would be an API call
        const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`) || '[]');
        displayOrders(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

// Display orders
function displayOrders(orders) {
    ordersList.innerHTML = orders.length ? orders.map(order => `
        <div class="order-item">
            <h3>Order #${order.id}</h3>
            <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
            <p>Total: ₹${order.total.toFixed(2)}</p>
            <p>Status: ${order.status}</p>
        </div>
    `).join('') : '<p>No orders found</p>';
}

// Handle auth tab switching
function handleAuthTabClick(e) {
    const tab = e.target.getAttribute('data-tab');
    authTabs.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    
    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
}

// Fetch and display products
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        products = await response.json();
    } catch (error) {
        console.log('Using sample products as server is not available');
        products = sampleProducts;
    }
    displayProducts();
}

function displayProducts() {
    // Group products by category
    const categories = {};
    products.forEach(product => {
        if (!categories[product.category]) categories[product.category] = [];
        categories[product.category].push(product);
    });
    // Render products by category
    productsGrid.innerHTML = Object.keys(categories).map(category => `
        <div class="category-block">
            <h2 class="category-title">${category}</h2>
            <div class="products-grid">
                ${categories[category].map(product => `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">₹${product.price}</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        showNotification('Added to cart!');
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    try {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-thumb">
                <span>${item.name} - ₹${parseFloat(item.price).toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join('');
        // Cost breakdown
        const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
        const tax = subtotal * 0.18; // 18% GST
        const delivery = cart.length > 0 ? 99 : 0;
        const total = subtotal + tax + delivery;
        cartTotal.textContent = total.toFixed(2);
        // Add breakdown below cart items
        cartItems.innerHTML += `
            <div class="cart-breakdown">
                <div><span>Subtotal:</span><span>₹${subtotal.toFixed(2)}</span></div>
                <div><span>GST (18%):</span><span>₹${tax.toFixed(2)}</span></div>
                <div><span>Delivery:</span><span>₹${delivery.toFixed(2)}</span></div>
                <div class="cart-breakdown-total"><span>Total:</span><span>₹${total.toFixed(2)}</span></div>
            </div>
        `;
        console.log('Cart updated successfully');
    } catch (error) {
        console.error('Error updating cart:', error);
        showNotification('Error updating cart display', 'error');
    }
}

// Handle checkout
async function handleCheckout() {
    console.log('Starting checkout process...');
    console.log('Current user:', currentUser);
    console.log('Cart contents:', cart);

    if (!currentUser) {
        console.log('No user logged in');
        showNotification('Please login to checkout', 'error');
        return;
    }

    if (!cart || cart.length === 0) {
        console.log('Cart is empty');
        showNotification('Your cart is empty', 'error');
        return;
    }

    try {
        // Validate cart items
        console.log('Validating cart items...');
        const validCart = cart.every(item => {
            const isValid = item && 
                typeof item.id === 'number' && 
                typeof item.price === 'number' && 
                typeof item.name === 'string';
            
            if (!isValid) {
                console.error('Invalid item:', item);
            }
            return isValid;
        });

        if (!validCart) {
            throw new Error('Invalid cart items detected');
        }

        // Calculate total
        console.log('Calculating total...');
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price);
            if (isNaN(price)) {
                console.error('Invalid price for item:', item);
                throw new Error('Invalid item price');
            }
            return sum + price;
        }, 0);

        // Create new order
        console.log('Creating new order...');
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: cart.map(item => ({
                id: parseInt(item.id),
                name: String(item.name),
                price: parseFloat(item.price),
                image: String(item.image || '')
            })),
            total: parseFloat(total.toFixed(2)),
            status: 'Processing',
            userEmail: currentUser.email
        };

        console.log('Order object created:', order);

        // Get existing orders
        console.log('Fetching existing orders...');
        let orders = [];
        const storageKey = `orders_${currentUser.email}`;
        
        try {
            const existingOrders = localStorage.getItem(storageKey);
            console.log('Existing orders from storage:', existingOrders);
            
            if (existingOrders) {
                orders = JSON.parse(existingOrders);
                if (!Array.isArray(orders)) {
                    console.error('Orders data is not an array:', orders);
                    throw new Error('Invalid orders data structure');
                }
            }
        } catch (error) {
            console.error('Error reading existing orders:', error);
            orders = [];
        }

        // Add new order
        console.log('Adding new order to orders array...');
        orders.push(order);

        // Save to localStorage
        console.log('Saving to localStorage...');
        try {
            const ordersString = JSON.stringify(orders);
            console.log('Orders string to save:', ordersString);
            localStorage.setItem(storageKey, ordersString);
            
            // Verify the save
            const savedOrders = localStorage.getItem(storageKey);
            if (!savedOrders) {
                throw new Error('Failed to verify order save');
            }
        } catch (error) {
            console.error('Error saving order:', error);
            throw new Error('Failed to save order to storage');
        }

        // Clear cart
        console.log('Clearing cart...');
        cart = [];
        updateCart();
        toggleModal(cartModal);

        // Show success message
        console.log('Showing success notification...');
        showNotification('Order placed successfully!', 'success');

        // Update orders display
        console.log('Updating orders display...');
        fetchOrders();

        // Add order confirmation to chat history
        console.log('Adding order confirmation to chat...');
        addMessageToChat('bot', `Your order #${order.id} has been placed successfully! You can track your order status in the "My Orders" section.`);

        console.log('Checkout process completed successfully');

    } catch (error) {
        console.error('Checkout error details:', error);
        console.error('Error stack:', error.stack);
        showNotification(`Checkout failed: ${error.message}`, 'error');
    }
}

// Chat functions
function addMessageToChat(type, message, options = null, htmlContent = null) {
    console.log('Adding message to chat:', { type, message, options, htmlContent });
    try {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        
        if (options && options.type === 'image') {
            const img = document.createElement('img');
            img.src = options.url;
            img.className = 'chat-image';
            img.alt = 'Uploaded image';
            messageElement.appendChild(img);
        } else {
            messageElement.textContent = message;
        }
        
        // Save chat message to localStorage per user
        if (currentUser && currentUser.email) {
            const chatKey = `chat_${currentUser.email}`;
            const chatHistoryArr = JSON.parse(localStorage.getItem(chatKey) || '[]');
            chatHistoryArr.push({ type, message, options, timestamp: new Date().toISOString() });
            localStorage.setItem(chatKey, JSON.stringify(chatHistoryArr));
        }
        
        // Add options if provided
        if (options && Array.isArray(options)) {
            // Render as action options column
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'chat-action-options';
            options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'chat-action-option';
                btn.textContent = option.text;
                btn.onclick = () => handleOptionClick(option.action, option.value);
                actionsDiv.appendChild(btn);
            });
            messageElement.appendChild(actionsDiv);
        } else if (options && !options.type) {
            // For legacy chat options (prebuilt, order, etc.)
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'chat-options';
            options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'chat-option-button';
                button.textContent = option.text;
                button.onclick = () => handleOptionClick(option.action, option.value);
                optionsContainer.appendChild(button);
            });
            messageElement.appendChild(optionsContainer);
        }
        
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        console.log('Message added successfully');

        if (htmlContent) {
            const contentElement = document.createElement('div');
            contentElement.className = 'chat-content';
            contentElement.innerHTML = htmlContent;
            messageElement.appendChild(contentElement);
        }
    } catch (error) {
        console.error('Error adding message to chat:', error);
    }
}

function handleOptionClick(action, value) {
    switch (action) {
        case 'toggle_chat_mode':
            toggleChatMode();
            break;
        case 'select_order':
            const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`) || '[]');
            const order = orders.find(o => o.id === value);
            if (order) {
                chatState.currentOrder = order;
                showOrderDetails(order);
            }
            break;
        case 'return_reason':
            handleReturnReason(value);
            break;
        case 'refund_reason':
            handleRefundReason(value);
            break;
        case 'order_action':
            if (value === 'return') {
                showReturnOptions();
            } else if (value === 'track') {
                showOrderDetails(chatState.currentOrder);
            } else if (value === 'refund') {
                handleRefundRequest();
            }
            break;
        case 'help_center':
            showHelpCenter();
            break;
        case 'return_request':
            const userOrders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`) || '[]');
            if (userOrders.length === 0) {
                addMessageToChat('bot', "I don't see any orders in your account. Have you made a purchase with us?");
            } else {
                showOrderList(userOrders);
            }
            break;
        case 'cancel':
            resetChatState();
            addMessageToChat('bot', 'Request cancelled. How else can I help you?');
            break;
    }
}

// Show welcome message when chat is opened
function showWelcomeMessage() {
    console.log('Showing welcome message');
    const options = [
        { text: 'Switch to Free Chat', action: 'toggle_chat_mode' },
        { text: 'Return Request', action: 'return_request' },
        { text: 'Help Center', action: 'help_center' }
    ];
    
    addMessageToChat('bot', 'Hello! I\'m your shopping assistant. How can I help you today? You can:\n\n' +
        '• View your orders\n' +
        '• Get help with returns or refunds\n' +
        '• Access our help center\n\n' +
        'Or simply type your question below.', options);
}

// UI functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add icon based on type
    const icon = document.createElement('span');
    icon.className = 'notification-icon';
    switch (type) {
        case 'success':
            icon.textContent = '✅';
            break;
        case 'error':
            icon.textContent = '❌';
            break;
        default:
            icon.textContent = 'ℹ️';
    }
    notification.insertBefore(icon, notification.firstChild);
    
    document.body.appendChild(notification);
    
    // Add animation class
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Enhanced modal functions
function toggleModal(modal) {
    if (modal.style.display === 'block') {
        closeModal(modal);
    } else {
        openModal(modal);
    }
}

function openModal(modal) {
    // Close any other open modals
    document.querySelectorAll('.modal').forEach(m => {
        if (m.style.display === 'block') {
            closeModal(m);
        }
    });
    
    modal.style.display = 'block';
    modalHistory.push(modal);
    
    // Add to browser history
    window.history.pushState({ modal: modal.id }, '');
    
    if (modal === chatModal && chatHistory.children.length === 0) {
        showWelcomeMessage();
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
    modalHistory = modalHistory.filter(m => m !== modal);
}

// Handle browser back button
window.addEventListener('popstate', (event) => {
    if (modalHistory.length > 0) {
        const lastModal = modalHistory.pop();
        closeModal(lastModal);
    }
});

// Enhanced close button functionality
function setupCloseButtons() {
    document.querySelectorAll('.close').forEach(closeButton => {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const modal = closeButton.closest('.modal');
            if (modal) {
                closeModal(modal);
                // Add to browser history
                window.history.pushState({ modal: modal.id }, '');
            }
        });
    });
}

// Enhanced modal click outside
function setupModalClickOutside() {
    window.addEventListener('click', (e) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
                // Add to browser history
                window.history.pushState({ modal: modal.id }, '');
            }
        });
    });
}

// Initialize enhanced modal functionality
function initializeModals() {
    setupCloseButtons();
    setupModalClickOutside();
}

// Event Listeners
cartButton.addEventListener('click', () => toggleModal(cartModal));
chatButton.addEventListener('click', () => toggleModal(chatModal));
chatForm.addEventListener('submit', handleChatSubmit);

// Add event listeners for chat options
document.querySelectorAll('.chat-option').forEach(button => {
    button.addEventListener('click', () => {
        const query = button.getAttribute('data-query');
        handleChatOption(query);
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) toggleModal(cartModal);
    if (e.target === chatModal) toggleModal(chatModal);
});

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
signupForm.addEventListener('submit', handleSignup);
logoutButton.addEventListener('click', handleLogout);
authTabs.forEach(tab => tab.addEventListener('click', handleAuthTabClick));

profileButton.addEventListener('click', () => toggleModal(profileModal));
ordersButton.addEventListener('click', () => toggleModal(ordersModal));

// Initialize
checkAuth();
initializeModals();

// Event Listeners
document.getElementById('checkoutButton').addEventListener('click', handleCheckout);

// Enhanced chat functions
async function handleChatSubmit(e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    addMessageToChat('user', message);
    chatInput.value = '';

    try {
        const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`) || '[]');
        
        // If waiting for photo upload
        if (chatState.waitingForPhoto) {
            handlePhotoUpload(message);
            return;
        }

        // If return reason is selected, ask for photo
        if (chatState.returnReason) {
            chatState.waitingForPhoto = true;
            addMessageToChat('bot', 'Please upload a photo of the issue. You can type "cancel" to cancel the return request.');
            return;
        }

        // If order is selected, show return options
        if (chatState.currentOrder) {
            if (message.toLowerCase().includes('return')) {
                showReturnOptions();
            } else {
                showOrderDetails(chatState.currentOrder);
            }
            return;
        }

        // Initial order selection
        if (message.toLowerCase().includes('order') || message.toLowerCase().includes('track')) {
            showOrderList(orders);
            return;
        }

        // Use OpenAI API for chat responses
        if (isFreeChatMode) {
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot typing';
            typingIndicator.textContent = 'Typing...';
            chatHistory.appendChild(typingIndicator);
            chatHistory.scrollTop = chatHistory.scrollHeight;

            // Get AI response
            const response = await handleFreeChatMessage(message);
            
            // Remove typing indicator
            chatHistory.removeChild(typingIndicator);
            
            // Add AI response
            addMessageToChat('bot', response);
        } else {
            // Handle structured chat
            const response = await handleFreeChatMessage(message);
            addMessageToChat('bot', response);
        }
    } catch (error) {
        console.error('Chat error:', error);
        addMessageToChat('bot', 'Sorry, I encountered an error. Please try again.');
    }
}

function showOrderList(orders, mode = 'view') {
    const orderListHTML = orders.map(order => `
        <div class="order-item" data-order-id="${order.id}">
            <div class="order-header">
                <span>Order #${order.id}</span>
                <span>${new Date(order.date).toLocaleDateString()}</span>
            </div>
            <div class="order-details">
                <p>Total: $${order.total}</p>
                <p>Status: ${order.status}</p>
            </div>
            <button class="order-action-btn" data-action="${mode}">${mode === 'track' ? 'Track Order' : 'View Details'}</button>
        </div>
    `).join('');

    addMessageToChat('bot', 'Here are your orders:', null, `
        <div class="order-list">
            ${orderListHTML}
        </div>
    `);

    // Add event listeners to the buttons
    document.querySelectorAll('.order-action-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = e.target.closest('.order-item').dataset.orderId;
            if (mode === 'track') {
                showOrderTracking(orderId);
            } else {
                showOrderDetails(orders.find(o => o.id === orderId));
            }
        });
    });
}

function showOrderTracking(orderId) {
    // Mock tracking information
    const trackingInfo = {
        orderId: orderId,
        status: 'In Transit',
        currentLocation: 'Distribution Center, New York',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        trackingNumber: `TRK-${orderId}-${Math.floor(Math.random() * 1000)}`,
        updates: [
            { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), status: 'Order Processed' },
            { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), status: 'Shipped from Warehouse' },
            { date: new Date(), status: 'In Transit' }
        ]
    };

    const trackingHTML = `
        <div class="tracking-info">
            <h3>Order #${trackingInfo.orderId}</h3>
            <div class="tracking-status">
                <p><strong>Status:</strong> ${trackingInfo.status}</p>
                <p><strong>Current Location:</strong> ${trackingInfo.currentLocation}</p>
                <p><strong>Estimated Delivery:</strong> ${trackingInfo.estimatedDelivery}</p>
                <p><strong>Tracking Number:</strong> ${trackingInfo.trackingNumber}</p>
            </div>
            <div class="tracking-timeline">
                <h4>Tracking Updates</h4>
                ${trackingInfo.updates.map(update => `
                    <div class="timeline-item">
                        <span class="timeline-date">${update.date.toLocaleDateString()}</span>
                        <span class="timeline-status">${update.status}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    addMessageToChat('bot', 'Here\'s your order tracking information:', null, trackingHTML);
}

function showOrderDetails(order) {
    const status = getOrderStatus(order.id);
    const orderDate = new Date(order.date);
    const currentDate = new Date();
    const daysSinceOrder = Math.floor((currentDate - orderDate) / (1000 * 60 * 60 * 24));
    const isRefundEligible = daysSinceOrder <= 30; // 30-day refund policy

    const details = `Order #${order.id}\nStatus: ${status}\nDate: ${orderDate.toLocaleDateString()}\nTotal: ₹${order.total.toFixed(2)}\n\nItems:\n${order.items.map(item => `- ${item.name} (₹${item.price})`).join('\n')}`;
    
    const actionOptions = [
        { text: 'Track Status', action: 'order_action', value: 'track' },
        { text: 'Request Return', action: 'order_action', value: 'return' },
        { text: 'Request Refund', action: 'order_action', value: 'refund' },
        { text: 'Ask About Delivery', action: 'order_action', value: 'delivery' }
    ];
    
    addMessageToChat('bot', details, actionOptions);

    // Store order date for refund checking
    chatState.currentOrder = {
        ...order,
        orderDate: orderDate,
        daysSinceOrder: daysSinceOrder,
        isRefundEligible: isRefundEligible
    };
}

function showReturnOptions() {
    const returnOptions = [
        { text: 'Product Damaged', action: 'return_reason', value: '1' },
        { text: 'Wrong Item Received', action: 'return_reason', value: '2' },
        { text: 'Quality Issues', action: 'return_reason', value: '3' },
        { text: 'Size/Color Mismatch', action: 'return_reason', value: '4' },
        { text: 'Changed My Mind', action: 'return_reason', value: '5' },
        { text: 'Cancel', action: 'cancel', value: null }
    ];
    
    addMessageToChat('bot', 'Please select the reason for return:', returnOptions);
}

function handleReturnReason(option) {
    const reasons = {
        '1': 'Product damaged',
        '2': 'Wrong item received',
        '3': 'Quality issues',
        '4': 'Size/color mismatch',
        '5': 'Changed my mind'
    };
    
    chatState.returnReason = reasons[option];
    chatState.waitingForPhoto = true;
    
    addMessageToChat('bot', `You selected: ${chatState.returnReason}\n\nPlease upload a photo of the issue. You can type "cancel" to cancel the return request.`);
    
    // Show upload button if not already visible
    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton) {
        uploadButton.style.display = 'block';
    }
}

function handleRefundRequest() {
    if (!chatState.currentOrder) {
        addMessageToChat('bot', 'Please select an order first.');
        return;
    }

    if (!chatState.currentOrder.isRefundEligible) {
        addMessageToChat('bot', `Sorry, this order is not eligible for a refund. The 30-day refund period has passed. (Order placed ${chatState.currentOrder.daysSinceOrder} days ago)`);
        return;
    }

    const refundOptions = [
        { text: 'Product Quality Issues', action: 'refund_reason', value: 'quality' },
        { text: 'Wrong Item Received', action: 'refund_reason', value: 'wrong_item' },
        { text: 'Product Damaged', action: 'refund_reason', value: 'damaged' },
        { text: 'Not as Described', action: 'refund_reason', value: 'not_as_described' },
        { text: 'Cancel', action: 'cancel', value: null }
    ];

    addMessageToChat('bot', 'Please select the reason for your refund request:', refundOptions);
}

function handleRefundReason(reason) {
    const reasons = {
        'quality': 'Product Quality Issues',
        'wrong_item': 'Wrong Item Received',
        'damaged': 'Product Damaged',
        'not_as_described': 'Not as Described'
    };

    chatState.returnReason = reasons[reason];
    chatState.refundRequested = true;
    chatState.waitingForPhoto = true;

    addMessageToChat('bot', `You selected: ${chatState.returnReason}\n\nPlease upload a photo of the issue. You can type "cancel" to cancel the refund request.`);
}

function generateRefundBill() {
    const order = chatState.currentOrder;
    const refundDate = new Date();
    const refundNumber = `REF-${Date.now().toString().slice(-6)}`;

    const billStatement = `📄 REFUND BILL STATEMENT\n\n` +
        `Refund Number: ${refundNumber}\n` +
        `Date: ${refundDate.toLocaleDateString()}\n` +
        `Order Number: #${order.id}\n` +
        `Original Order Date: ${order.orderDate.toLocaleDateString()}\n\n` +
        `Items Refunded:\n${order.items.map(item => `- ${item.name}: ₹${item.price}`).join('\n')}\n\n` +
        `Subtotal: ₹${order.total.toFixed(2)}\n` +
        `GST (18%): ₹${(order.total * 0.18).toFixed(2)}\n` +
        `Total Refund Amount: ₹${(order.total * 1.18).toFixed(2)}\n\n` +
        `Refund Reason: ${chatState.returnReason}\n` +
        `Status: Approved\n\n` +
        `The refund will be processed to your original payment method within 5-7 business days.`;

    return billStatement;
}

function handlePhotoUpload(message) {
    if (message.toLowerCase() === 'cancel') {
        resetChatState();
        addMessageToChat('bot', 'Request cancelled. How else can I help you?');
        return;
    }

    // Show initial verification message
    addMessageToChat('bot', '🔍 Analyzing your photo...');

    // Simulate photo analysis with typing indicator
    setTimeout(() => {
        addMessageToChat('bot', '✅ Photo verified successfully!\n\nAnalyzing product condition...');
        
        // Simulate condition analysis
        setTimeout(() => {
            addMessageToChat('bot', '📋 Condition assessment complete.\n\nProcessing request...');
            
            // Simulate processing
            setTimeout(() => {
                if (chatState.refundRequested) {
                    // Show refund bill for refund requests
                    const billStatement = generateRefundBill();
                    addMessageToChat('bot', billStatement);
                } else {
                    // Show return label for regular returns
                    addMessageToChat('bot', '✨ Return request approved!\n\nHere are your return details:\n\n' +
                        `📦 Order: #${chatState.currentOrder.id}\n` +
                        `📝 Reason: ${chatState.returnReason}\n` +
                        `✅ Status: Approved\n\n` +
                        '📧 A return label has been sent to your email.\n' +
                        '📍 You can drop off the package at any of our partner locations or schedule a pickup.\n\n' +
                        '⏱️ Expected refund processing time: 5-7 business days\n\n' +
                        'Is there anything else I can help you with?');
                }
                
                resetChatState();
            }, 2000);
        }, 2000);
    }, 2000);
}

function resetChatState() {
    chatState = {
        currentOrder: null,
        returnReason: null,
        waitingForPhoto: false,
        refundRequested: false
    };
}

// Mock order status function
function getOrderStatus(orderId) {
    // In a real app, this would come from the backend
    const statuses = {
        1: 'Delivered',
        2: 'In Transit',
        3: 'Processing',
        4: 'Delivered',
        5: 'In Transit',
        6: 'Processing'
    };
    return statuses[orderId] || 'Processing';
}

// Enhanced chat options
function handleChatOption(query) {
    switch(query) {
        case 'track':
            // Get orders from localStorage
            const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`) || '[]');
            if (orders.length === 0) {
                addMessageToChat('bot', "I don't see any orders in your account. Have you made a purchase with us?");
                return;
            }
            
            // Show order list for tracking
            showOrderList(orders, 'track');
            break;
        case 'orders':
            const ordersListData = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`) || '[]');
            if (ordersListData.length === 0) {
                addMessageToChat('bot', "I don't see any orders in your account. Have you made a purchase with us?");
                return;
            }
            showOrderList(ordersListData);
            break;
        case 'return':
            showReturnOptions();
            break;
        case 'help':
            showHelpCenter();
            break;
    }
}

// Handle photo upload
uploadButton.addEventListener('click', () => {
    photoUpload.click();
});

photoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // Add the image to chat
                addMessageToChat('user', 'Photo uploaded:', {
                    type: 'image',
                    url: event.target.result
                });
                
                // If waiting for photo upload in return process
                if (chatState.waitingForPhoto) {
                    handlePhotoUpload('photo_uploaded');
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file');
        }
    }
});

// Add chat mode toggle button to the UI
function addChatModeToggle() {
    const chatHeader = document.querySelector('.chat-header');
    const toggleButton = document.createElement('button');
    toggleButton.className = 'chat-mode-toggle';
    toggleButton.textContent = isFreeChatMode ? 'Switch to Structured Chat' : 'Switch to Free Chat';
    toggleButton.onclick = () => {
        toggleChatMode();
        toggleButton.textContent = isFreeChatMode ? 'Switch to Structured Chat' : 'Switch to Free Chat';
    };
    chatHeader.appendChild(toggleButton);
}

// Call this when initializing the chat
addChatModeToggle();

// Add help center function
function showHelpCenter() {
    // Clear any existing help center content
    const existingHelp = document.querySelector('.help-center');
    if (existingHelp) {
        existingHelp.remove();
    }

    const helpContent = Object.entries(faqData).map(([category, faqs]) => `
        <div class="faq-category">
            <h3>${category}</h3>
            ${faqs.map(faq => `
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFAQ(this)">
                        <span>${faq.question}</span>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        ${faq.answer}
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');

    addMessageToChat('bot', 'Here\'s our Help Center with frequently asked questions. Click on any question to see its answer:', null);
    
    const helpDiv = document.createElement('div');
    helpDiv.className = 'help-center';
    helpDiv.innerHTML = helpContent;
    chatHistory.appendChild(helpDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Add search functionality
    const searchDiv = document.createElement('div');
    searchDiv.className = 'faq-search';
    searchDiv.innerHTML = `
        <input type="text" placeholder="Search FAQs..." onkeyup="searchFAQs(this.value)">
    `;
    helpDiv.insertBefore(searchDiv, helpDiv.firstChild);
}

// Add FAQ toggle function
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggle = element.querySelector('.faq-toggle');
    
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        toggle.textContent = '+';
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        toggle.textContent = '−';
    }
}

// Add search functionality for FAQs
function searchFAQs(query) {
    query = query.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        const category = item.closest('.faq-category').querySelector('h3').textContent.toLowerCase();
        
        if (question.includes(query) || answer.includes(query) || category.includes(query)) {
            item.style.display = '';
            // Highlight matching text
            if (query) {
                highlightText(item, query);
            } else {
                removeHighlight(item);
            }
        } else {
            item.style.display = 'none';
        }
    });
}

// Add text highlighting function
function highlightText(element, query) {
    const question = element.querySelector('.faq-question span');
    const answer = element.querySelector('.faq-answer');
    
    const questionText = question.textContent;
    const answerText = answer.textContent;
    
    const highlightedQuestion = questionText.replace(
        new RegExp(query, 'gi'),
        match => `<span class="highlight">${match}</span>`
    );
    
    const highlightedAnswer = answerText.replace(
        new RegExp(query, 'gi'),
        match => `<span class="highlight">${match}</span>`
    );
    
    question.innerHTML = highlightedQuestion;
    answer.innerHTML = highlightedAnswer;
}

// Remove highlighting
function removeHighlight(element) {
    const question = element.querySelector('.faq-question span');
    const answer = element.querySelector('.faq-answer');
    
    question.textContent = question.textContent;
    answer.textContent = answer.textContent;
}

// Update the CSS for help center
const style = document.createElement('style');
style.textContent = `
    .help-center {
        margin: 10px 0;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 8px;
    }

    .faq-search {
        margin-bottom: 15px;
    }

    .faq-search input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        font-size: 0.95em;
    }

    .faq-search input:focus {
        outline: none;
        border-color: #4dabf7;
        box-shadow: 0 0 0 2px rgba(77, 171, 247, 0.2);
    }

    .faq-category {
        margin-bottom: 20px;
    }

    .faq-category h3 {
        color: #2c3e50;
        margin-bottom: 10px;
        font-size: 1.1em;
    }

    .faq-item {
        margin-bottom: 10px;
        border: 1px solid #e9ecef;
        border-radius: 6px;
        overflow: hidden;
    }

    .faq-question {
        padding: 12px 15px;
        background: #fff;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
    }

    .faq-question:hover {
        background: #f1f3f5;
    }

    .faq-toggle {
        font-size: 1.2em;
        color: #6c757d;
    }

    .faq-answer {
        padding: 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
        background: #fff;
        font-size: 0.95em;
        line-height: 1.5;
        white-space: pre-line;
    }

    .faq-answer.active {
        padding: 12px 15px;
    }

    .highlight {
        background-color: #fff3bf;
        padding: 2px;
        border-radius: 2px;
    }
`;
document.head.appendChild(style); 
