// ============================================
// CALENDAR FUNCTIONALITY
// ============================================

let currentDate = new Date(2026, 2, 19); // March 19, 2026

function initializeCalendar() {
    renderMiniCalendar();
    renderCalendarGrid();
    updateCalendarTitle();
}

function renderMiniCalendar() {
    const miniCalendar = document.getElementById('miniCalendar');
    if (!miniCalendar) return;

    miniCalendar.innerHTML = '';
    
    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'mini-calendar-day';
        miniCalendar.appendChild(emptyDay);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'mini-calendar-day';
        dayElement.textContent = day;

        // Highlight today
        if (day === currentDate.getDate() && 
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear()) {
            dayElement.classList.add('active');
        }

        dayElement.addEventListener('click', () => {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            renderMiniCalendar();
            renderCalendarGrid();
        });

        miniCalendar.appendChild(dayElement);
    }
}

function renderCalendarGrid() {
    const grid = document.querySelector('.calendar-grid');
    if (!grid) return;

    // Clear existing calendar days
    const existingDays = grid.querySelectorAll('.calendar-day, .calendar-day.other-month');
    existingDays.forEach(day => day.remove());

    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayElement = createCalendarDay(day, true);
        grid.appendChild(dayElement);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = createCalendarDay(day, false);
        grid.appendChild(dayElement);
    }

    // Add days from next month
    const totalCells = firstDay + daysInMonth;
    const remainingCells = (Math.ceil(totalCells / 7) * 7) - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = createCalendarDay(day, true);
        grid.appendChild(dayElement);
    }
}

function createCalendarDay(day, isOtherMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = `calendar-day ${isOtherMonth ? 'other-month' : ''}`;

    // Check if today
    const today = new Date();
    if (!isOtherMonth && 
        day === today.getDate() && 
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear()) {
        dayElement.classList.add('today');
    }

    // Add click event to open tasks modal
    dayElement.style.cursor = 'pointer';
    dayElement.addEventListener('click', function() {
        if (!isOtherMonth) {
            openTasksForCalendarDate(day);
        }
    });

    dayElement.innerHTML = `
        <div class="calendar-day-number">${day}</div>
        <div class="calendar-day-events">
            ${getEventsForDay(day, isOtherMonth) ? '<div class="day-event">' + getEventsForDay(day, isOtherMonth) + '</div>' : ''}
        </div>
    `;

    return dayElement;
}

function getEventsForDay(day, isOtherMonth) {
    // Sample events
    const events = {
        19: 'Team Standup',
        20: 'Client Meeting',
        21: 'Project Review',
        23: 'Training',
        25: 'Release Day'
    };

    return events[day] || '';
}

function updateCalendarTitle() {
    const title = document.getElementById('calendarTitle');
    if (title) {
        const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        title.textContent = monthYear;
    }

    const monthSpan = document.getElementById('currentMonth');
    if (monthSpan) {
        const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        monthSpan.textContent = monthYear;
    }
}

function prevMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    renderMiniCalendar();
    renderCalendarGrid();
    updateCalendarTitle();
}

function nextMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    renderMiniCalendar();
    renderCalendarGrid();
    updateCalendarTitle();
}

function switchView(view) {
    const monthView = document.getElementById('monthView');
    const weekView = document.getElementById('weekView');
    const buttons = document.querySelectorAll('.view-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (view === 'month') {
        monthView.style.display = 'grid';
        if (weekView) weekView.style.display = 'none';
    } else if (view === 'week') {
        if (monthView) monthView.style.display = 'none';
        if (weekView) weekView.style.display = 'grid';
    } else if (view === 'day') {
        if (monthView) monthView.style.display = 'none';
        if (weekView) weekView.style.display = 'none';
        showNotification('Day view coming soon', 'info');
    }
}

function openTasksForCalendarDate(day) {
    // Format date as YYYY-MM-DD for consistency
    const dateString = currentDate.getFullYear() + '-' + 
                      String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(day).padStart(2, '0');
    
    // Check if we have access to timesheet modal (cross-page communication)
    // Show notification that user should go to timesheet page
    const dateObj = new Date(dateString + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    showNotification(`Click on Timesheet page to add tasks for ${formattedDate}`, 'info');
    
    // Or redirect to timesheet with the selected date
    setTimeout(() => {
        // Store selected date in sessionStorage for timesheet to use
        sessionStorage.setItem('selectedDateForTasks', dateString);
        window.location.href = 'timesheet.html';
    }, 1500);
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', initializeCalendar);
