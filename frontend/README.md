# ResolveNow Frontend

React-based frontend for the ResolveNow complaint management system.

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

The application runs on http://localhost:3000

## Features

### Customer Features
- User registration and login
- Create and submit complaints
- Track complaint status in real-time
- Chat with assigned agents
- Provide feedback and ratings
- View complaint history

### Agent Features
- View assigned complaints
- Update complaint status
- Communicate with customers
- Manage workload
- Resolve complaints

### Admin Features
- Dashboard with analytics
- Manage all complaints
- Assign complaints to agents
- View user and agent statistics
- Manage platform users

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── PrivateRoute.js
│   └── ...
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Signup.js
│   ├── Profile.js
│   ├── CreateComplaint.js
│   ├── CustomerDashboard.js
│   ├── ComplaintDetails.js
│   ├── AgentDashboard.js
│   ├── AgentComplaintManager.js
│   ├── AdminDashboard.js
│   └── ...
├── services/
│   └── api.js
├── context/
│   └── AuthContext.js
├── styles/
│   ├── auth.css
│   ├── dashboard.css
│   ├── complaint.css
│   ├── profile.css
│   ├── home.css
│   └── index.css
├── App.js
└── index.js
```

## Key Components

### AuthContext
Manages user authentication state globally. Provides login, register, logout functions and token management.

### PrivateRoute
Protects routes that require authentication. Can also restrict access based on user roles.

### API Service
Axios-based API client with automatic token injection in request headers.

## Styling

- Bootstrap 5 for responsive layout
- Material-UI for additional components
- Custom CSS for branding and animations
- Gradient backgrounds for modern look

## Dependencies

- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- bootstrap - CSS framework
- @mui/material - Material Design components
- socket.io-client - Real-time communication

## Authentication

Uses JWT tokens stored in localStorage. Tokens are automatically sent with all API requests via axios interceptors.

## Real-time Features

Socket.io is configured but can be extended for:
- Real-time notification updates
- Live chat notifications
- Status change updates

## Development Tips

1. Use React DevTools browser extension for debugging
2. Check browser console for API errors
3. Verify token in localStorage for auth issues
4. Use Network tab to inspect API calls
5. Test responsive design with device emulation

## Build for Production

```bash
npm run build
```

Creates optimized production build in the `build/` folder.

## Troubleshooting

- **CORS errors**: Ensure backend CORS is configured correctly
- **API not responding**: Check backend is running on port 5000
- **Login not working**: Verify JWT_SECRET matches between frontend and backend
- **Routing issues**: Clear browser cache and rebuild
