// ============================================
// LEAVE MANAGEMENT FUNCTIONALITY
// ============================================

let leaveData = [];

const leaveApplications = [
    {
        id: 1,
        fromDate: '03/20/2026',
        toDate: '03/22/2026',
        leaveType: 'Casual Leave',
        duration: '3 days',
        reason: 'Personal work',
        status: 'Approved',
        approved: 'HR Manager'
    },
    {
        id: 2,
        fromDate: '02/15/2026',
        toDate: '02/16/2026',
        leaveType: 'Sick Leave',
        duration: '2 days',
        reason: 'Medical appointment',
        status: 'Approved',
        approved: 'HR Manager'
    },
    {
        id: 3,
        fromDate: '04/10/2026',
        toDate: '04/12/2026',
        leaveType: 'Annual Leave',
        duration: '3 days',
        reason: 'Vacation with family',
        status: 'Pending',
        approved: '-'
    },
    {
        id: 4,
        fromDate: '01/26/2026',
        toDate: '01/26/2026',
        leaveType: 'Other Leave',
        duration: '1 day',
        reason: 'Republic Day',
        status: 'Approved',
        approved: 'HR Manager'
    },
    {
        id: 5,
        fromDate: '03/25/2026',
        toDate: '03/27/2026',
        leaveType: 'Casual Leave',
        duration: '3 days',
        reason: 'Friend\'s wedding',
        status: 'Rejected',
        approved: 'HR Manager'
    }
];

function openLeaveForm() {
    const modal = document.getElementById('leaveFormModal');
    if (modal) {
        modal.style.display = 'flex';
        // Set today's date as default
        const today = new Date();
        const dateString = today.getFullYear() + '-' + 
                          String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                          String(today.getDate()).padStart(2, '0');
        
        const fromDateInput = document.getElementById('leaveFromDate');
        if (fromDateInput) {
            fromDateInput.value = dateString;
        }
    }
}

function closeLeaveForm() {
    const modal = document.getElementById('leaveFormModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('leaveForm').reset();
    }
}

function submitLeaveForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('leaveEmployeeName').value;
    const email = document.getElementById('leaveEmployeeEmail').value;
    const fromDate = document.getElementById('leaveFromDate').value;
    const toDate = document.getElementById('leaveToDate').value;
    const dayType = document.getElementById('leaveDayType').value;
    const leaveType = document.getElementById('leaveType').value;
    const reason = document.getElementById('leaveReason').value;
    
    // Validation
    if (!name || !email || !fromDate || !toDate || !dayType || !leaveType) {
        showNotification('Please fill in all required fields', 'info');
        return;
    }
    
    // Check if dates are valid
    const from = new Date(fromDate);
    const to = new Date(toDate);
    
    if (from > to) {
        showNotification('From Date must be before To Date', 'info');
        return;
    }
    
    // Calculate duration
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Create new leave application
    const newLeave = {
        id: leaveApplications.length + 1,
        fromDate: from.toLocaleDateString('en-US'),
        toDate: to.toLocaleDateString('en-US'),
        leaveType: leaveType,
        duration: diffDays + ' day' + (diffDays > 1 ? 's' : ''),
        reason: reason || '-',
        status: 'Pending',
        approved: '-'
    };
    
    leaveApplications.unshift(newLeave);
    
    closeLeaveForm();
    showNotification('Leave application submitted successfully!', 'success');
    updateLeaveTable();
}

function updateLeaveTable() {
    const tbody = document.getElementById('leaveTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = leaveApplications.map((leave, index) => `
        <tr>
            <td>${leave.id}</td>
            <td>${leave.fromDate}</td>
            <td>${leave.toDate}</td>
            <td>${leave.leaveType}</td>
            <td>${leave.duration}</td>
            <td>${leave.reason}</td>
            <td>
                <span class="badge badge-${
                    leave.status === 'Approved' ? 'success' : 
                    leave.status === 'Pending' ? 'info' : 
                    'danger'
                }">
                    ${leave.status}
                </span>
            </td>
            <td>${leave.approved}</td>
            <td>
                <button class="btn-icon" title="Edit">✏️</button>
                <button class="btn-icon" title="Delete" onclick="deleteLeave(${leave.id})">🗑️</button>
            </td>
        </tr>
    `).join('');
    
    updateLeaveCount();
}

function deleteLeave(id) {
    if (confirm('Are you sure you want to delete this leave application?')) {
        leaveApplications.splice(leaveApplications.findIndex(l => l.id === id), 1);
        updateLeaveTable();
        showNotification('Leave application deleted', 'success');
    }
}

function updateLeaveCount() {
    const leaveCount = document.getElementById('leaveCount');
    if (leaveCount) {
        leaveCount.textContent = `Showing ${leaveApplications.length} leave application${leaveApplications.length !== 1 ? 's' : ''}`;
    }
}

function previousLeafPage() {
    showNotification('Previous page', 'info');
}

function nextLeafPage() {
    showNotification('Next page', 'info');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateLeaveTable();
});
