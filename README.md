# Techcorp_webpage
Here's comprehensive README content for your TechCorp Dashboard GitHub repository:

```markdown
# TechCorp Dashboard - Employee Management System

A modern, intuitive employee management dashboard built with vanilla HTML5, CSS3, and JavaScript. This web application provides comprehensive tools for attendance tracking, timesheet management, leave applications, calendar scheduling, and document management.

## 🌟 Features

### Core Functionality
- **📊 Dashboard** - Overview with statistics cards and activity timeline
- **✅ Attendance Tracking** - Daily and monthly attendance logs with check-in/check-out functionality
- **⏱️ TimeSheet Management** - Task logging with automatic hour calculation and date-based task creation
- **📋 Leave Management** - Leave balance tracking and application system with approval status
- **📅 Calendar & Schedule** - Interactive month/week/day views with upcoming events list
- **📄 Document Management** - File management with search, filter, and download capabilities
- **⚙️ Settings** - User profile, account, notifications, security, and advanced settings

### Interactive Features
- **Date-Click Modal** - Click any date to create tasks with start time, end time, project name, and category
- **Cross-Page Navigation** - Seamless navigation between Calendar and TimeSheet with auto-selected dates
- **Real-Time Validation** - Form validation on all input pages
- **Responsive Design** - Mobile, tablet, and desktop optimized layouts
- **Modern UI/UX** - Gradient backgrounds, smooth animations, and professional styling

## 📋 Tech Stack

- **Frontend**: HTML5, CSS3 (Custom properties, Grid/Flexbox)
- **Scripting**: Vanilla JavaScript (ES6+)
- **Storage**: localStorage & sessionStorage for client-side data persistence
- **Design Pattern**: Client-side data management with real-time UI updates
- **Browser APIs**: Date object, DOM manipulation, Event listeners

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No dependencies or build tools required

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/techcorp-dashboard.git
cd techcorp-dashboard
```

2. **Open in browser**
```bash
# Option 1: Direct file open
Open `index.html` in your preferred browser

# Option 2: Use a local server (recommended)
python -m http.server 8000
# or
npx http-server
```

3. **Access the application**
- Navigate to `http://localhost:8000` (or the server address)

## 📁 Project Structure

```
techcorp-dashboard/
├── index.html              # Login page
├── dashboard.html          # Main dashboard page
├── attendance.html         # Attendance tracking page
├── timesheet.html          # TimeSheet and task management page
├── leave.html              # Leave management page
├── calendar.html           # Calendar and scheduling page
├── documents.html          # Document management page
├── settings.html           # User settings page
├── styles.css              # Global stylesheet with responsive design
├── app.js                  # Global utilities and common functions
├── calendar.js             # Calendar logic and date interactions
├── timesheet.js            # TimeSheet form handling and task management
├── attendance.js           # Attendance tracking logic
├── leave.js                # Leave management logic
├── documents.js            # Document management logic
└── README.md               # This file
```

## 🎯 Key Pages & Features

### 1. Login Page (index.html)
- User authentication simulation
- Session management
- Demo credentials validation

### 2. Dashboard (dashboard.html)
- Statistics cards (Total Employees, Present Today, etc.)
- Activity timeline with recent events
- Quick access navigation

### 3. Attendance (attendance.html)
- Daily attendance log with check-in/check-out buttons
- Monthly attendance summary
- Presence percentage tracking

### 4. TimeSheet (timesheet.html)
- Daily and weekly task views
- **Add Tasks Modal**: Click date input to open task creation form
- Task details: Project name, start time, end time, category, status, description
- Automatic hour calculation
- Task list display and management

### 5. Leave Management (leave.html)
- Leave balance tracking with breakdown by type
- Leave application form with modal interface
- Status tracking (Pending, Approved, Rejected)
- Leave history

### 6. Calendar (calendar.html)
- **Month View** - Full month overview with color-coded events
- **Week View** - Hourly schedule with event slots
- Date selection with automatic navigation to TimeSheet
- Upcoming events sidebar
- Mini calendar for quick navigation

### 7. Documents (documents.html)
- File listing with metadata
- Search, filter, and sort functionality
- Download and delete capabilities
- File type indicators

### 8. Settings (settings.html)
- **Profile Tab** - User information and avatar
- **Account Tab** - Login credentials and account settings
- **Notifications Tab** - Notification preferences
- **Security Tab** - Password and two-factor authentication
- **Advanced Tab** - System preferences and export options

## 💾 Data Persistence

The application uses browser storage for data management:
- **localStorage** - Persistent user data and settings
- **sessionStorage** - Temporary data for cross-page communication (e.g., selected dates)

Data structure examples:
```javascript
// Timesheet entries
{
    id: unique_id,
    task: "Task description",
    project: "Project name",
    startTime: "09:00",
    endTime: "17:00",
    hours: 8,
    date: "2026-03-19",
    category: "Development",
    status: "Completed",
    description: "Task details"
}

// Leave records
{
    leaveType: "Sick Leave",
    startDate: "2026-03-20",
    endDate: "2026-03-21",
    reason: "Personal",
    status: "Pending"
}
```

## 🎨 Design Features

- **Modern Gradient Design** - Blue gradient color scheme throughout
- **Responsive Layout** - Adapts to all screen sizes
- **Custom Scrollbars** - Styled with gradient colors
- **Smooth Animations** - Cubic-bezier transitions for interactive elements
- **Professional Styling** - Box shadows, border-radius, and spacing
- **Accessibility** - Semantic HTML and keyboard navigation support

## 🔌 API Integration Ready

The application is structured to easily integrate with:
- RESTful APIs for user authentication
- Backend databases for data persistence
- Cloud file storage services
- Email notification services

## 📱 Browser Compatibility

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 File Statistics

- **Total Pages**: 8 HTML files
- **Stylesheet Size**: ~2000+ CSS lines with responsive design
- **JavaScript Code**: 1000+ lines across multiple modules
- **Zero Dependencies**: Fully vanilla implementation

## 🔐 Authentication

Currently features a demo authentication system. For production use, implement:
- JWT token-based authentication
- Secure password hashing
- Two-factor authentication
- Session management

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time data synchronization
- [ ] Multi-user support with role-based access
- [ ] Recurring tasks and events
- [ ] PDF/Excel export functionality
- [ ] Email notifications
- [ ] Task comments and collaboration
- [ ] Advanced reporting and analytics
- [ ] Mobile app version
- [ ] Dark mode theme

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Usage Tips

### Adding a New Task
1. Navigate to TimeSheet page
2. Click on the date input field
3. Modal opens with task creation form
4. Fill in task details (Project, Start Time, End Time, etc.)
5. Click "Add Task" to save

### Applying for Leave
1. Go to Leave Management page
2. Click "Apply for Leave" button
3. Select leave type, dates, and reason
4. Submit application
5. Track status in the leave history

### Switching Calendar Views
- Click "Month" for full month overview
- Click "Week" for hourly schedule
- Click "Day" for detailed day view

### Creating Events from Calendar
1. Click any date in the calendar
2. Click the "New Event" button in the top-right
3. Fill in event details
4. Save event
