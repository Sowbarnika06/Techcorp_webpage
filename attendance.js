// ============================================
// ATTENDANCE FUNCTIONALITY
// ============================================

let attendanceData = [];
let currentAttendanceTab = 'daily';

function switchAttendanceTab(tab) {
    currentAttendanceTab = tab;
    
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tab + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update active button
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function checkIn() {
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    showNotification('Checked in at ' + timeString, 'success');
    updateAttendanceLog();
}

function checkOut() {
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    showNotification('Checked out at ' + timeString, 'success');
}

function updateAttendanceLog() {
    const dateInput = document.getElementById('attendanceDate');
    const selectedDate = dateInput ? dateInput.value : '2026-03-19';
    showNotification('Attendance updated for ' + selectedDate, 'info');
}

function updateMonthlyLog() {
    const monthInput = document.getElementById('monthYear');
    const selectedMonth = monthInput ? monthInput.value : '2026-03';
    showNotification('Monthly log updated for ' + selectedMonth, 'info');
}

// Initialize attendance page
document.addEventListener('DOMContentLoaded', function() {
    // Set default dates
    const today = new Date();
    const attendanceDate = document.getElementById('attendanceDate');
    if (attendanceDate) {
        attendanceDate.valueAsDate = today;
    }
    
    const monthYear = document.getElementById('monthYear');
    if (monthYear) {
        monthYear.value = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0');
    }
});
