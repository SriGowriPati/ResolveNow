# ResolveNow - Online Complaint Registration and Management System

## Project Overview
ResolveNow is a comprehensive web-based complaint management system that enables users to submit, track, and resolve complaints efficiently. The platform includes features for customers, agents, and administrators with real-time updates and messaging capabilities.

## Tech Stack
- **Frontend:** React.js, Bootstrap, Material-UI, Axios, Socket.io
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Real-time Communication:** Socket.io
- **Database:** MongoDB

## Features
- User registration and authentication
- Complaint submission with detailed information
- Real-time complaint tracking
- Agent assignment system
- Chat/Messaging system between users and agents
- Admin dashboard with analytics
- Feedback and rating system
- Responsive UI design

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Git for version control

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resolvenow
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Start the backend server:
```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

The application will be accessible at `http://localhost:3000`

## Project Structure

### Backend
```
backend/
├── controllers/    # Request handlers
├── models/        # Database schemas
├── routes/        # API endpoints
├── middleware/    # Authentication & validation
├── server.js      # Main application file
└── package.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/   # Reusable components
│   ├── pages/       # Page components
│   ├── services/    # API calls
│   ├── context/     # React Context
│   ├── styles/      # CSS files
│   ├── App.js       # Main App component
│   └── index.js     # Entry point
├── public/          # Static files
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify token

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin)
- `GET /api/users/type/:userType` - Get users by type (admin)

### Complaints
- `POST /api/complaints` - Create complaint
- `GET /api/complaints/my-complaints` - Get user complaints
- `GET /api/complaints/:id` - Get complaint details
- `PUT /api/complaints/:id` - Update complaint
- `GET /api/complaints` - Get all complaints (admin/agent)
- `POST /api/complaints/assign` - Assign complaint (admin)

### Messages
- `POST /api/messages/send` - Send message
- `GET /api/messages/:complaintId` - Get messages
- `PUT /api/messages/:complaintId/read` - Mark as read

### Admin
- `GET /api/admin/dashboard/stats` - Get dashboard stats
- `GET /api/admin/complaints` - Get all complaints
- `PUT /api/admin/complaints/reassign` - Reassign complaint
- `DELETE /api/admin/users/:userId` - Delete user
- `GET /api/admin/agents/stats` - Get agent statistics

## User Roles
1. **Customer** - Submit and track complaints
2. **Agent** - Manage assigned complaints and communicate with customers
3. **Admin** - Oversee system, manage users, and assign complaints

## Security Features
- Password hashing with bcryptjs
- JWT authentication
- Role-based access control
- Data validation and sanitization
- CORS configuration
- Environment variables for sensitive data

## Future Enhancements
- Email notifications for complaint updates
- SMS notifications
- Advanced analytics and reporting
- Complaint categorization with auto-routing
- Document/attachment upload
- Complaint escalation system
- Mobile app development
- Multi-language support

## License
MIT

## Support
For issues or questions, please contact the development team.
