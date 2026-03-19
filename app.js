// ============================================
// MAIN APP FUNCTIONALITY
// ============================================

// Check if user is logged in
window.addEventListener('load', function() {
    const isLoginPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
    const isLoggedIn = localStorage.getItem('techcorp_user');

    if (isLoginPage && isLoggedIn) {
        window.location.href = 'dashboard.html';
    } else if (!isLoginPage && !isLoggedIn) {
        window.location.href = 'index.html';
    }

    // Initialize active nav item
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'dashboard';
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.dataset.page === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// ============================================
// LOGIN FUNCTIONALITY
// ============================================

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Store user session
        const user = {
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('techcorp_user', JSON.stringify(user));
        
        // Show success message
        showNotification('Login successful! Redirecting...', 'success');

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    });
}

// ============================================
// LOGOUT FUNCTIONALITY
// ============================================

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('techcorp_user');
        window.location.href = 'index.html';
    }
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#51cf66' : type === 'error' ? '#ff6b6b' : '#4dabf7'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// MODAL FUNCTIONALITY
// ============================================

function createModal(title, content, buttons = []) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 8px;
            padding: 30px;
            max-width: 500px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 1001;
        ">
            <h2 style="margin-top: 0; margin-bottom: 20px;">${title}</h2>
            <div style="margin-bottom: 20px;">${content}</div>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                ${buttons.map(btn => `<button class="btn ${btn.class || 'btn-primary'}" onclick="${btn.onClick}">${btn.text}</button>`).join('')}
            </div>
        </div>
    `;

    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
    `;
    overlay.onclick = () => modal.remove();

    document.body.appendChild(modal);
}

// ============================================
// DEFAULT ACTION HANDLERS
// ============================================

function addEvent() {
    showNotification('Opening event creation dialog...', 'info');
    // Event creation logic would go here
}

function uploadDocument() {
    showNotification('Opening file upload dialog...', 'info');
    // File upload logic would go here
}

function changePassword() {
    createModal('Change Password', `
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <input type="password" placeholder="Current password" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            <input type="password" placeholder="New password" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            <input type="password" placeholder="Confirm password" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
    `, [
        { text: 'Cancel', onClick: "this.closest('.modal').remove()", class: 'btn-secondary' },
        { text: 'Change Password', onClick: "showNotification('Password changed successfully!', 'success'); this.closest('.modal').remove();" }
    ]);
}

function deleteAccount() {
    if (confirm('Are you absolutely sure? This action cannot be undone. All your data will be permanently deleted.')) {
        showNotification('Account deletion requested. Please check your email for confirmation.', 'info');
    }
}

function deleteDoc() {
    showNotification('Document deleted successfully', 'success');
}

function downloadData() {
    showNotification('Preparing your data export...', 'info');
    // Simulate data download
    setTimeout(() => {
        showNotification('Data export ready for download', 'success');
    }, 2000);
}

function saveSettings(event) {
    if (event) {
        event.preventDefault();
    }
    showNotification('Settings saved successfully!', 'success');
}

function filterDocuments() {
    showNotification('Documents filtered', 'info');
}

function sortDocuments() {
    showNotification('Documents sorted', 'info');
}

function selectAllDocs() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.doc-checkbox');
    checkboxes.forEach(cb => cb.checked = selectAll.checked);
}

function previousPage() {
    showNotification('Previous page', 'info');
}

function nextPage() {
    showNotification('Next page', 'info');
}

function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.settings-section');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Update active button
    const buttons = document.querySelectorAll('.settings-tab');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Initialize user info if logged in
function initializeUserInfo() {
    const user = JSON.parse(localStorage.getItem('techcorp_user') || '{}');
    if (user.email) {
        const userName = user.email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
        const initials = user.email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase()).join('');
        
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.textContent = initials.substring(0, 2);
        }

        const userNameElement = document.querySelector('.user-dropdown p:first-child');
        if (userNameElement) {
            userNameElement.textContent = userName;
        }

        const userEmailElement = document.querySelector('.user-email');
        if (userEmailElement) {
            userEmailElement.textContent = user.email;
        }
    }
}

// Initialize on page load
window.addEventListener('load', initializeUserInfo);

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

function formatTime(time) {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(time));
}
