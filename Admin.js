// Get all users from localStorage
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function getOrdersForUser(email) {
    return JSON.parse(localStorage.getItem(`orders_${email}`) || '[]');
}

function getChatForUser(email) {
    return JSON.parse(localStorage.getItem(`chat_${email}`) || '[]');
}

const userButtonsDiv = document.getElementById('userButtons');
const notesSection = document.getElementById('notesSection');
const orderList = document.getElementById('orderList');
const chatList = document.getElementById('chatList');

let selectedUserEmail = null;

function renderUserButtons() {
    const users = getAllUsers();
    userButtonsDiv.innerHTML = '';
    users.forEach(user => {
        const btn = document.createElement('button');
        btn.className = 'user-btn' + (user.email === selectedUserEmail ? ' selected' : '');
        btn.textContent = `${user.name} (${user.email})`;
        btn.onclick = () => {
            selectedUserEmail = user.email;
            renderUserButtons();
            renderNotesForUser(user.email);
        };
        userButtonsDiv.appendChild(btn);
    });
}

function renderNotesForUser(email) {
    notesSection.style.display = 'block';
    // Orders
    const orders = getOrdersForUser(email);
    orderList.innerHTML = orders.length ? orders.map(order => `
        <li>
            <span class="order-id">Order #${order.id}</span> <span class="order-status">(${order.status})</span><br>
            <span>Date: ${new Date(order.date).toLocaleDateString()}</span><br>
            <span>Total: $${order.total.toFixed(2)}</span><br>
            <span>Items: ${order.items.map(i => i.name).join(', ')}</span>
        </li>
    `).join('') : '<li>No orders found.</li>';
    // Chat
    const chats = getChatForUser(email);
    chatList.innerHTML = chats.length ? chats.map(msg => `
        <li>
            <span class="chat-type-${msg.type}">${msg.type === 'user' ? 'User' : 'Bot'}:</span> ${msg.message}
            <span class="timestamp">${msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ''}</span>
        </li>
    `).join('') : '<li>No chat queries found.</li>';
}

// Initial render
renderUserButtons(); 
