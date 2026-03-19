# TechCorp Dashboard Application

A professional, fully functional dashboard application built with HTML, CSS, and JavaScript. Features a modern UI with multiple pages, responsive design, and complete user management.

## Project Structure

```
techcorp/
├── index.html           # Login Page
├── dashboard.html       # Main Dashboard with Statistics
├── calendar.html        # Calendar & Scheduling
├── documents.html       # Documents Management with Table
├── settings.html        # User Settings & Preferences
├── styles.css          # Global Styles
├── app.js              # Main Application Logic
├── calendar.js         # Calendar Functionality
├── documents.js        # Documents Management Logic
├── settings.js         # Settings Page Logic
└── README.md           # This file
```

## Features

### 1. **Login Page**
- Email and password authentication
- Remember me checkbox
- Form validation
- Responsive login layout
- Clean, modern design with gradient background

### 2. **Dashboard**
- Statistics cards showing key metrics
- Recent activity table
- User information display
- Quick navigation to other pages
- Responsive grid layout

### 3. **Calendar & Schedule**
- Monthly calendar view with navigation
- Mini calendar for date selection
- Upcoming events list
- Week and day view options
- Interactive event management
- Event filtering and search

### 4. **Documents & Files**
- Comprehensive document table
- Search functionality
- Filter by document type (PDF, Word, Excel, PowerPoint)
- Sort by name, date, or size
- Download, share, and delete operations
- Pagination support
- Batch operations (select multiple)

### 5. **Settings**
- **Profile Tab**: Update personal information
- **Account Tab**: Manage subscription and preferences
- **Notifications Tab**: Control notification settings
- **Security Tab**: Password management and 2FA options
- **Advanced Tab**: Data export and account deletion
- Settings persistence with localStorage

### 6. **Sidebar Navigation**
- Easy page navigation
- Active page highlighting
- Company branding with logo
- User profile access
- Logout functionality

## Getting Started

### 1. Open in Browser
Simply open `index.html` in your web browser to start the application.

### 2. Login
- Use any email and password combination (demo app doesn't validate credentials)
- Check "Remember me" to stay logged in
- Credentials are stored in browser localStorage

### 3. Navigate
Use the sidebar menu to navigate between:
- Dashboard
- Calendar
- Documents
- Settings

## Key Features Explained

### Session Management
- User sessions are stored in localStorage
- Automatic redirection to login if not authenticated
- Logout clears session and returns to login page

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Responsive sidebar (collapses on smaller screens)
- Mobile-optimized tables and forms
- Touch-friendly interface

### Local Storage
- Settings are persisted in browser storage
- No server required for basic functionality
- Data survives page refreshes

### Notifications
- Toast notifications for user feedback
- Automatic dismissal after 3 seconds
- Different types: success, error, info

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #6c757d;
    --success-color: #51cf66;
    /* ... more colors ... */
}
```

### Company Name & Logo
1. Edit company name in HTML files
2. Modify SVG logo in sidebar header
3. Update logo colors in CSS

### Add New Pages
1. Create new HTML file following the existing template
2. Add navigation link in sidebar
3. Create corresponding JavaScript file if needed

## Form Handling

### Adding New Form Fields
All forms use standard HTML5 validation. To add a field:

```html
<div class="form-group">
    <label for="fieldName">Label</label>
    <input type="text" id="fieldName" name="fieldName" required>
</div>
```

## Extending Functionality

### Add Database Backend
Replace localStorage calls with API endpoints:

```javascript
// Current (localStorage)
localStorage.setItem('key', value);

// Backend (example)
fetch('/api/settings', { method: 'POST', body: JSON.stringify(data) })
```

### Add Authentication
Replace demo login with real authentication:

```javascript
// Current (demo)
localStorage.setItem('techcorp_user', JSON.stringify(user));

// Real auth (example)
const response = await fetch('/api/login', { ... });
const token = response.data.token;
```

## Troubleshooting

### Not Logged In After Refresh
- Check if browser localStorage is enabled
- Clear browser cache and cookies
- Try in private/incognito mode

### Styles Not Loading
- Ensure `styles.css` is in the same directory as HTML files
- Check browser console for errors
- Verify file paths are correct

### JavaScript Errors
- Open browser console (F12) to view errors
- Check that all .js files are in the same directory
- Verify script tags reference correct file names

## File Details

### HTML Files
- Use semantic HTML5 structure
- Accessible form controls with labels
- Responsive meta viewport tag included
- Proper document structure

### CSS File
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- CSS custom properties (variables)
- Multiple utility classes

### JavaScript Files
- Modular functions
- localStorage for data persistence
- Event listeners for interactivity
- Form validation

## Performance

- Optimized CSS with minimal repaints
- Efficient DOM updates
- Minimal external dependencies
- Fast load times (no external libraries)

## Security Notes

**This is a demo application. For production use:**
- Validate all inputs on server side
- Use HTTPS for all connections
- Implement proper authentication
- Hash and salt passwords
- Use secure session management
- Add CSRF protection

## License

Free to use and modify for personal and commercial projects.

## Support

For issues or questions, review the code comments in each JavaScript file or test in the browser console.

**Version:** 1.0.0  
**Last Updated:** March 19, 2026
