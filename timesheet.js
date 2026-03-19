// ============================================
// TIMESHEET FUNCTIONALITY
// ============================================

let timesheetData = [];
let currentTimesheetTab = 'daily';
let tasksForDate = {}; // Store tasks by date

const timesheetEntries = [
    {
        id: 1,
        task: 'API Development - User Authentication',
        project: 'TechCorp Dashboard',
        startTime: '09:00 AM',
        endTime: '11:30 AM',
        hours: 2.5,
        date: '2026-03-19'
    },
    {
        id: 2,
        task: 'Code Review - Module Testing',
        project: 'Quality Assurance',
        startTime: '12:00 PM',
        endTime: '01:00 PM',
        hours: 1,
        date: '2026-03-19'
    },
    {
        id: 3,
        task: 'Database Optimization',
        project: 'Backend Team',
        startTime: '02:00 PM',
        endTime: '04:30 PM',
        hours: 2.5,
        date: '2026-03-19'
    },
    {
        id: 4,
        task: 'Team Meeting & Planning',
        project: 'Project Management',
        startTime: '04:45 PM',
        endTime: '05:30 PM',
        hours: 0.75,
        date: '2026-03-19'
    },
    {
        id: 5,
        task: 'Documentation & Reporting',
        project: 'Administrative',
        startTime: '05:30 PM',
        endTime: '06:15 PM',
        hours: 0.75,
        date: '2026-03-19'
    }
];

function openAddTasksForDate() {
    const dateInput = document.getElementById('timesheetDate');
    const selectedDate = dateInput.value;
    
    const modal = document.getElementById('addTasksModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Format date for display
        const dateObj = new Date(selectedDate + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        document.getElementById('selectedDateDisplay').textContent = formattedDate;
        
        // Load tasks for this date
        loadTasksForDate(selectedDate);
        
        // Reset form
        document.getElementById('addTasksForm').reset();
    }
}

function closeAddTasksModal() {
    const modal = document.getElementById('addTasksModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function calculateHours(startTime, endTime) {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    let diff = endMinutes - startMinutes;
    if (diff < 0) diff += 24 * 60; // Handle overnight
    
    return (diff / 60).toFixed(2);
}

function submitTask(event) {
    event.preventDefault();
    
    const dateInput = document.getElementById('timesheetDate');
    const selectedDate = dateInput.value;
    const taskDetail = document.getElementById('taskDetail').value;
    const projectName = document.getElementById('taskProjectName').value;
    const startTime = document.getElementById('taskStartTime').value;
    const endTime = document.getElementById('taskEndTime').value;
    const category = document.getElementById('taskCategory').value;
    const status = document.getElementById('taskStatus').value;
    const description = document.getElementById('taskDescription').value;
    
    // Validate
    if (!taskDetail || !projectName || !startTime || !endTime) {
        showNotification('Please fill in all required fields', 'info');
        return;
    }
    
    const startTimeFormatted = convertTo12Hour(startTime);
    const endTimeFormatted = convertTo12Hour(endTime);
    const hours = calculateHours(startTime, endTime);
    
    // Initialize date entry if not exists
    if (!tasksForDate[selectedDate]) {
        tasksForDate[selectedDate] = [];
    }
    
    // Create new task
    const newTask = {
        id: Math.random(),
        task: taskDetail,
        project: projectName,
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
        hours: parseFloat(hours),
        date: selectedDate,
        category: category,
        status: status,
        description: description
    };
    
    // Add to tasks for date
    tasksForDate[selectedDate].push(newTask);
    
    // Also add to main timesheet entries
    timesheetEntries.unshift(newTask);
    
    // Reset form and reload
    document.getElementById('addTasksForm').reset();
    loadTasksForDate(selectedDate);
    updateTimesheetTable();
    
    showNotification('Task added successfully!', 'success');
}

function convertTo12Hour(time) {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const displayHour = hourInt === 0 ? 12 : hourInt > 12 ? hourInt - 12 : hourInt;
    return `${String(displayHour).padStart(2, '0')}:${minute} ${period}`;
}

function loadTasksForDate(selectedDate) {
    const tbody = document.getElementById('tasksForDateBody');
    if (!tbody) return;
    
    const tasksOnDate = timesheetEntries.filter(entry => entry.date === selectedDate);
    
    if (tasksOnDate.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-light);">No tasks added yet</td></tr>`;
    } else {
        tbody.innerHTML = tasksOnDate.map(task => `
            <tr>
                <td>${task.task}</td>
                <td>${task.project}</td>
                <td>${task.startTime} - ${task.endTime}</td>
                <td>${task.hours} hrs</td>
                <td>
                    <span class="badge ${task.status === 'Completed' ? 'badge-success' : task.status === 'In Progress' ? 'badge-info' : 'badge-warning'}">
                        ${task.status}
                    </span>
                </td>
                <td>
                    <button class="btn-icon" title="Delete" onclick="deleteTaskFromModal(${task.id})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }
}

function deleteTaskFromModal(taskId) {
    if (confirm('Delete this task?')) {
        const index = timesheetEntries.findIndex(t => t.id === taskId);
        if (index > -1) {
            timesheetEntries.splice(index, 1);
        }
        
        const dateInput = document.getElementById('timesheetDate');
        const selectedDate = dateInput.value;
        loadTasksForDate(selectedDate);
        updateTimesheetTable();
        showNotification('Task deleted', 'success');
    }
}

function switchTimeSheetTab(tab) {
    currentTimesheetTab = tab;
    
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

function addTimeEntry() {
    showNotification('Opening time entry dialog...', 'info');
}

function addTimeEntryRow() {
    const taskName = document.getElementById('taskName').value;
    const taskProject = document.getElementById('taskProject').value;
    const taskHours = document.getElementById('taskHours').value;
    
    if (!taskName || !taskProject || !taskHours) {
        showNotification('Please fill in all fields', 'info');
        return;
    }
    
    // Calculate times (just for demo)
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + parseFloat(taskHours) * 60 * 60 * 1000);
    
    const timeEntry = {
        id: Math.random(),
        task: taskName,
        project: taskProject,
        startTime: startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        endTime: endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        hours: parseFloat(taskHours),
        date: document.getElementById('timesheetDate').value || new Date().toISOString().split('T')[0]
    };
    
    timesheetEntries.unshift(timeEntry);
    
    // Clear form
    document.getElementById('taskName').value = '';
    document.getElementById('taskProject').value = '';
    document.getElementById('taskHours').value = '';
    
    updateTimesheetTable();
    showNotification('Time entry added successfully!', 'success');
}

function updateTimesheetTable() {
    const tbody = document.getElementById('timesheetBody');
    if (!tbody) return;
    
    const selectedDate = document.getElementById('timesheetDate').value || new Date().toISOString().split('T')[0];
    
    // Filter entries for selected date
    const filteredEntries = timesheetEntries.filter(entry => entry.date === selectedDate);
    
    tbody.innerHTML = filteredEntries.map(entry => `
        <tr>
            <td>${entry.task}</td>
            <td>${entry.project}</td>
            <td>${entry.startTime}</td>
            <td>${entry.endTime}</td>
            <td>${entry.hours} hrs</td>
            <td>
                <button class="btn-icon" title="Edit">✏️</button>
                <button class="btn-icon" title="Delete" onclick="deleteTimeEntry(${entry.id})">🗑️</button>
            </td>
        </tr>
    `).join('');
    
    updateTotalHours(filteredEntries);
}

function updateTotalHours(entries) {
    const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
    const summaryDiv = document.querySelector('.timesheet-summary');
    
    if (summaryDiv) {
        summaryDiv.innerHTML = `
            <div class="summary-stat">
                <span>Total Hours:</span>
                <strong>${totalHours.toFixed(2)} hrs</strong>
            </div>
        `;
    }
}

function deleteTimeEntry(id) {
    if (confirm('Are you sure you want to delete this time entry?')) {
        timesheetEntries.splice(timesheetEntries.findIndex(e => e.id === id), 1);
        updateTimesheetTable();
        showNotification('Time entry deleted', 'success');
    }
}

function updateTimeSheetLog() {
    const dateInput = document.getElementById('timesheetDate');
    const selectedDate = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
    updateTimesheetTable();
}

function updateWeeklySheet() {
    const weekSelector = document.getElementById('weekSelector');
    const selectedWeek = weekSelector ? weekSelector.value : 'week3';
    showNotification('Weekly timesheet updated for ' + selectedWeek, 'info');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set default date to today
    const today = new Date();
    const dateString = today.getFullYear() + '-' + 
                      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(today.getDate()).padStart(2, '0');
    
    const timesheetDate = document.getElementById('timesheetDate');
    if (timesheetDate) {
        // Check if a date was passed from calendar
        const selectedDate = sessionStorage.getItem('selectedDateForTasks');
        if (selectedDate) {
            timesheetDate.value = selectedDate;
            sessionStorage.removeItem('selectedDateForTasks');
            // Open the modal after setting the date
            setTimeout(() => {
                openAddTasksForDate();
            }, 100);
        } else {
            timesheetDate.value = dateString;
        }
    }
    
    updateTimesheetTable();
    
    // Close modal when clicking outside
    const modal = document.getElementById('addTasksModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAddTasksModal();
            }
        });
    }
});
