// ============================================
// SETTINGS PAGE FUNCTIONALITY
// ============================================

// Settings data stored in localStorage
const defaultSettings = {
    profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@techcorp.com',
        phone: '+1 (555) 123-4567',
        bio: '',
        department: 'Engineering'
    },
    account: {
        language: 'English (US)',
        timezone: 'EST (UTC-5)'
    },
    notifications: {
        email: true,
        push: true,
        sms: false,
        documents: true,
        meetings: true,
        comments: true,
        team: false
    }
};

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('techcorp_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
}

// Save settings to localStorage
function saveSettingsToStorage(settings) {
    localStorage.setItem('techcorp_settings', JSON.stringify(settings));
}

// Initialize settings on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
    setupEventListeners();
});

function initializeSettings() {
    const settings = loadSettings();

    // Load profile settings
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const bioInput = document.getElementById('bio');
    const departmentInput = document.getElementById('department');

    if (firstNameInput) firstNameInput.value = settings.profile.firstName;
    if (lastNameInput) lastNameInput.value = settings.profile.lastName;
    if (emailInput) emailInput.value = settings.profile.email;
    if (phoneInput) phoneInput.value = settings.profile.phone;
    if (bioInput) bioInput.value = settings.profile.bio;
    if (departmentInput) departmentInput.value = settings.profile.department;

    // Load account settings
    const languageSelect = document.getElementById('language');
    const timezoneSelect = document.getElementById('timezone');

    if (languageSelect) languageSelect.value = settings.account.language;
    if (timezoneSelect) timezoneSelect.value = settings.account.timezone;

    // Load notification settings
    const emailNotif = document.getElementById('emailNotif');
    const pushNotif = document.getElementById('pushNotif');
    const smsNotif = document.getElementById('smsNotif');
    const docNotif = document.getElementById('docNotif');
    const meetingNotif = document.getElementById('meetingNotif');
    const commentNotif = document.getElementById('commentNotif');
    const teamNotif = document.getElementById('teamNotif');

    if (emailNotif) emailNotif.checked = settings.notifications.email;
    if (pushNotif) pushNotif.checked = settings.notifications.push;
    if (smsNotif) smsNotif.checked = settings.notifications.sms;
    if (docNotif) docNotif.checked = settings.notifications.documents;
    if (meetingNotif) meetingNotif.checked = settings.notifications.meetings;
    if (commentNotif) commentNotif.checked = settings.notifications.comments;
    if (teamNotif) teamNotif.checked = settings.notifications.team;
}

function setupEventListeners() {
    // Save button click handlers
    const saveButtons = document.querySelectorAll('.btn-primary');
    saveButtons.forEach(btn => {
        if (btn.textContent.includes('Save')) {
            btn.addEventListener('click', function(e) {
                if (!this.form) {
                    saveSettings(e);
                }
            });
        }
    });
}

function saveSettings(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    const settings = loadSettings();

    // Get profile settings
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const bioInput = document.getElementById('bio');
    const departmentInput = document.getElementById('department');

    if (firstNameInput) settings.profile.firstName = firstNameInput.value;
    if (lastNameInput) settings.profile.lastName = lastNameInput.value;
    if (emailInput) settings.profile.email = emailInput.value;
    if (phoneInput) settings.profile.phone = phoneInput.value;
    if (bioInput) settings.profile.bio = bioInput.value;
    if (departmentInput) settings.profile.department = departmentInput.value;

    // Get account settings
    const languageSelect = document.getElementById('language');
    const timezoneSelect = document.getElementById('timezone');

    if (languageSelect) settings.account.language = languageSelect.value;
    if (timezoneSelect) settings.account.timezone = timezoneSelect.value;

    // Get notification settings
    const emailNotif = document.getElementById('emailNotif');
    const pushNotif = document.getElementById('pushNotif');
    const smsNotif = document.getElementById('smsNotif');
    const docNotif = document.getElementById('docNotif');
    const meetingNotif = document.getElementById('meetingNotif');
    const commentNotif = document.getElementById('commentNotif');
    const teamNotif = document.getElementById('teamNotif');

    if (emailNotif) settings.notifications.email = emailNotif.checked;
    if (pushNotif) settings.notifications.push = pushNotif.checked;
    if (smsNotif) settings.notifications.sms = smsNotif.checked;
    if (docNotif) settings.notifications.documents = docNotif.checked;
    if (meetingNotif) settings.notifications.meetings = meetingNotif.checked;
    if (commentNotif) settings.notifications.comments = commentNotif.checked;
    if (teamNotif) settings.notifications.team = teamNotif.checked;

    // Save to localStorage
    saveSettingsToStorage(settings);

    showNotification('Settings saved successfully!', 'success');
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
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === tabName.toLowerCase() || 
            (tabName === 'account' && btn.textContent.toLowerCase() === 'account')) {
            btn.classList.add('active');
        }
    });
}

function changePassword() {
    let newPassword = '';
    
    // Create a modal for password change
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <div style="
                background: white;
                border-radius: 8px;
                padding: 30px;
                max-width: 400px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            ">
                <h2 style="margin-top: 0; margin-bottom: 20px;">Change Password</h2>
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <input type="password" id="currentPass" placeholder="Current password" style="
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-family: inherit;
                    ">
                    <input type="password" id="newPass" placeholder="New password" style="
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-family: inherit;
                    ">
                    <input type="password" id="confirmPass" placeholder="Confirm password" style="
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-family: inherit;
                    ">
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn btn-secondary" onclick="this.closest('div').parentElement.parentElement.remove()">Cancel</button>
                    <button class="btn btn-primary" onclick="updatePassword(this)">Update Password</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function updatePassword(button) {
    const currentPass = document.getElementById('currentPass');
    const newPass = document.getElementById('newPass');
    const confirmPass = document.getElementById('confirmPass');

    if (!currentPass.value || !newPass.value || !confirmPass.value) {
        showNotification('Please fill in all fields', 'info');
        return;
    }

    if (newPass.value !== confirmPass.value) {
        showNotification('Passwords do not match', 'info');
        return;
    }

    if (newPass.value.length < 6) {
        showNotification('Password must be at least 6 characters', 'info');
        return;
    }

    // Close modal
    button.closest('div').parentElement.parentElement.remove();
    showNotification('Password changed successfully!', 'success');
}

function downloadData() {
    showNotification('Preparing your data export...', 'info');
    
    // Simulate data download
    setTimeout(() => {
        const userData = {
            profile: loadSettings().profile,
            exportDate: new Date().toISOString()
        };

        // Create blob and download
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `techcorp-data-${new Date().getTime()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showNotification('Data exported successfully', 'success');
    }, 1500);
}

function deleteAccount() {
    const confirmed = confirm('Are you absolutely sure? This action cannot be undone.\n\nType "DELETE" in the prompt to confirm.');
    
    if (confirmed) {
        const userInput = prompt('Type "DELETE" to confirm account deletion:');
        
        if (userInput === 'DELETE') {
            // Clear all user data
            localStorage.removeItem('techcorp_user');
            localStorage.removeItem('techcorp_settings');
            
            showNotification('Account deleted. Redirecting to login...', 'info');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showNotification('Account deletion cancelled', 'info');
        }
    }
}

// Make settigns form handle submission properly
const profileForm = document.querySelector('.settings-section form');
if (profileForm) {
    profileForm.addEventListener('submit', saveSettings);
}
