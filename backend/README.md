# ResolveNow Backend

Backend server for the ResolveNow complaint management system built with Express.js and MongoDB.

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resolvenow
JWT_SECRET=your_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Running the Server

```bash
npm start          # Start server
npm run dev       # Start with nodemon for development
```

## Database Models

### User
- fullName
- email
- password (hashed)
- phone
- userType (customer/agent/admin)
- address, city, state, pincode
- isActive
- timestamps

### Complaint
- userId (reference to User)
- name, email, phone
- address, city, state, pincode
- description
- category
- priority (low/medium/high)
- status (open/in-progress/resolved/closed)
- assignedAgent (reference to User)
- rating, feedback
- timestamps

### Message
- userId (reference to User)
- senderType (customer/agent)
- complaintId (reference to Complaint)
- message
- isRead
- timestamps

### AssignedComplaint
- agentId (reference to User)
- complaintId (reference to Complaint)
- agentName
- status
- notes
- timestamps

## API Routes

All routes are protected with JWT authentication except login and register.

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/verify

### Users
- GET /api/users/profile
- PUT /api/users/profile
- GET /api/users (admin)
- GET /api/users/type/:userType (admin)

### Complaints
- POST /api/complaints (customer)
- GET /api/complaints/my-complaints (customer)
- GET /api/complaints/:id
- PUT /api/complaints/:id (customer)
- GET /api/complaints (admin/agent)
- POST /api/complaints/assign (admin)

### Messages
- POST /api/messages/send
- GET /api/messages/:complaintId
- PUT /api/messages/:complaintId/read

### Admin
- GET /api/admin/dashboard/stats
- GET /api/admin/complaints
- PUT /api/admin/complaints/reassign
- DELETE /api/admin/users/:userId
- GET /api/admin/agents/stats

## Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - CORS middleware
- express-validator - Input validation
- socket.io - Real-time communication
- dotenv - Environment variables

## Development

Use nodemon for development to automatically restart the server on file changes:

```bash
npx nodemon server.js
```
