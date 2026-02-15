# API DOCUMENTATION - ResolveNow

Complete API reference for the ResolveNow complaint management system.

**Base URL**: `http://localhost:5000/api`

---

## **Authentication Endpoints**

### 1. User Registration
- **Endpoint**: `POST /auth/register`
- **Description**: Register a new user account
- **Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "1234567890",
  "userType": "customer"
}
```
- **Response** (201):
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "userType": "customer"
  }
}
```
- **User Types**: `customer`, `agent`, `admin`

### 2. User Login
- **Endpoint**: `POST /auth/login`
- **Description**: Login user and get JWT token
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```
- **Response** (200):
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "userType": "customer"
  }
}
```

### 3. Verify Token
- **Endpoint**: `GET /auth/verify`
- **Description**: Verify JWT token validity
- **Headers**: `Authorization: Bearer token`
- **Response** (200):
```json
{
  "message": "Token verified",
  "user": {
    "userId": "user_id",
    "email": "john@example.com",
    "userType": "customer"
  }
}
```

---

## **User Management Endpoints**

### 4. Get User Profile
- **Endpoint**: `GET /users/profile`
- **Description**: Get authenticated user's profile
- **Headers**: `Authorization: Bearer token`
- **Response** (200):
```json
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "userType": "customer",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "pincode": "10001",
  "createdAt": "2024-02-12T10:00:00Z"
}
```

### 5. Update User Profile
- **Endpoint**: `PUT /users/profile`
- **Description**: Update user profile information
- **Headers**: `Authorization: Bearer token`
- **Request Body**:
```json
{
  "fullName": "Jane Doe",
  "phone": "9876543210",
  "address": "456 Oak Ave",
  "city": "Los Angeles",
  "state": "CA",
  "pincode": "90001"
}
```
- **Response** (200):
```json
{
  "message": "Profile updated successfully",
  "user": { /* updated user data */ }
}
```

### 6. Get All Users (Admin Only)
- **Endpoint**: `GET /users`
- **Description**: Get list of all users
- **Headers**: `Authorization: Bearer token` (Admin token required)
- **Response** (200): Array of user objects

### 7. Get Users by Type
- **Endpoint**: `GET /users/type/:userType`
- **Description**: Get users filtered by type
- **Headers**: `Authorization: Bearer token` (Admin token required)
- **Parameters**: `userType` - customer, agent, or admin
- **Response** (200): Array of users with specified type

---

## **Complaint Management Endpoints**

### 8. Create Complaint
- **Endpoint**: `POST /complaints`
- **Description**: Submit a new complaint
- **Headers**: `Authorization: Bearer token`
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "pincode": "10001",
  "description": "Product arrived damaged",
  "category": "product-defect",
  "priority": "high"
}
```
- **Response** (201):
```json
{
  "message": "Complaint registered successfully",
  "complaint": {
    "_id": "complaint_id",
    "userId": "user_id",
    "status": "open",
    "createdAt": "2024-02-12T10:00:00Z"
  }
}
```
- **Categories**: product-defect, service-quality, delivery-issue, billing, other
- **Priorities**: low, medium, high

### 9. Get User's Complaints
- **Endpoint**: `GET /complaints/my-complaints`
- **Description**: Get all complaints submitted by logged-in user
- **Headers**: `Authorization: Bearer token`
- **Response** (200): Array of complaint objects

### 10. Get Complaint by ID
- **Endpoint**: `GET /complaints/:id`
- **Description**: Get detailed information about a specific complaint
- **Headers**: `Authorization: Bearer token`
- **Parameters**: `id` - Complaint ID
- **Response** (200): Complaint object with full details

### 11. Update Complaint
- **Endpoint**: `PUT /complaints/:id`
- **Description**: Update complaint status or feedback
- **Headers**: `Authorization: Bearer token`
- **Request Body** (Customer can update):
```json
{
  "status": "resolved",
  "rating": 5,
  "feedback": "Great service!"
}
```
- **Response** (200):
```json
{
  "message": "Complaint updated successfully",
  "complaint": { /* updated complaint */ }
}
```

### 12. Get All Complaints (Admin/Agent)
- **Endpoint**: `GET /complaints?status=open&priority=high`
- **Description**: Get all complaints (with optional filters)
- **Headers**: `Authorization: Bearer token` (Admin/Agent token required)
- **Query Parameters**:
  - `status` - Filter by status
  - `priority` - Filter by priority
- **Response** (200): Array of all complaints

### 13. Assign Complaint to Agent
- **Endpoint**: `POST /complaints/assign`
- **Description**: Assign a complaint to an agent (Admin only)
- **Headers**: `Authorization: Bearer token` (Admin token required)
- **Request Body**:
```json
{
  "complaintId": "complaint_id",
  "agentId": "agent_user_id",
  "agentName": "Support Agent"
}
```
- **Response** (200):
```json
{
  "message": "Complaint assigned successfully",
  "complaint": { /* updated complaint */ }
}
```

---

## **Agent Endpoints**

### 14. Get Assigned Complaints
- **Endpoint**: `GET /agents/assigned`
- **Description**: Get complaints assigned to the agent
- **Headers**: `Authorization: Bearer token` (Agent token required)
- **Response** (200): Array of assigned complaints

### 15. Update Complaint Status
- **Endpoint**: `PUT /agents/status`
- **Description**: Update complaint status by assigned agent
- **Headers**: `Authorization: Bearer token` (Agent token required)
- **Request Body**:
```json
{
  "complaintId": "complaint_id",
  "status": "in-progress",
  "notes": "Investigating the issue"
}
```
- **Response** (200):
```json
{
  "message": "Complaint status updated successfully",
  "complaint": { /* updated complaint */ }
}
```
- **Status Options**: assigned, in-progress, resolved, closed

### 16. Get Agent Workload
- **Endpoint**: `GET /agents/workload`
- **Description**: Get number of active complaints for the agent
- **Headers**: `Authorization: Bearer token` (Agent token required)
- **Response** (200):
```json
{
  "workload": 5
}
```

---

## **Message/Chat Endpoints**

### 17. Send Message
- **Endpoint**: `POST /messages/send`
- **Description**: Send a message on a complaint thread
- **Headers**: `Authorization: Bearer token`
- **Request Body**:
```json
{
  "complaintId": "complaint_id",
  "message": "Here's the update on your issue",
  "senderType": "agent"
}
```
- **Response** (201):
```json
{
  "message": "Message sent successfully",
  "data": {
    "_id": "message_id",
    "complaintId": "complaint_id",
    "message": "Here's the update on your issue",
    "createdAt": "2024-02-12T10:00:00Z"
  }
}
```

### 18. Get Messages for Complaint
- **Endpoint**: `GET /messages/:complaintId`
- **Description**: Get all messages for a specific complaint
- **Headers**: `Authorization: Bearer token`
- **Parameters**: `complaintId` - Complaint ID
- **Response** (200): Array of message objects

### 19. Mark Messages as Read
- **Endpoint**: `PUT /messages/:complaintId/read`
- **Description**: Mark complaint messages as read
- **Headers**: `Authorization: Bearer token`
- **Parameters**: `complaintId` - Complaint ID
- **Response** (200):
```json
{
  "message": "Messages marked as read"
}
```

---

## **Admin Endpoints**

### 20. Get Dashboard Statistics
- **Endpoint**: `GET /admin/dashboard/stats`
- **Description**: Get system statistics for admin dashboard
- **Headers**: `Authorization: Bearer token` (Admin token required)
- **Response** (200):
```json
{
  "totalUsers": 25,
  "totalAgents": 5,
  "totalComplaints": 100,
  "openComplaints": 15,
  "resolvedComplaints": 75
}
```

### 21. Get All Complaints (Paginated)
- **Endpoint**: `GET /admin/complaints?page=1&limit=10&status=open`
- **Description**: Get all complaints with pagination
- **Headers**: `Authorization: Bearer token` (Admin token required)
- **Query Parameters**:
  - `page` - Page number (default: 1)
  - `limit` - Results per page (default: 10)
  - `status` - Filter by status (optional)
- **Response** (200):
```json
{
  "complaints": [ /* array of complaints */ ],
  "total": 100,
  "page": 1,
  "pages": 10
}
```

### 22. Reassign Complaint
- **Endpoint**: `PUT /admin/complaints/reassign`
- **Description**: Reassign complaint to different agent
- **Headers**: `Authorization: Bearer token` (Admin token required)
- **Request Body**:
```json
{
  "complaintId": "complaint_id",
  "newAgentId": "agent_user_id",
  "agentName": "New Agent Name"
}
```
- **Response** (200):
```json
{
  "message": "Complaint reassigned successfully",
  "complaint": { /* updated complaint */ }
}
```

### 23. Delete User
- **Endpoint**: `DELETE /admin/users/:userId`
- **Description**: Delete a user account
- **Headers**: `Authorization: Bearer token` (Admin token required)
- **Parameters**: `userId` - User ID to delete
- **Response** (200):
```json
{
  "message": "User deleted successfully"
}
```

### 24. Get Agent Statistics
- **Endpoint**: `GET /admin/agents/stats`
- **Description**: Get performance stats for all agents
- **Headers**: `Authorization: Bearer token` (Admin token required)
- **Response** (200):
```json
[
  {
    "agentId": "agent_user_id",
    "agentName": "Support Agent",
    "assigned": 10,
    "resolved": 8
  }
]
```

---

## **Error Responses**

### Common Error Codes

**400 - Bad Request**
```json
{
  "message": "Validation error message",
  "errors": [ /* array of validation errors */ ]
}
```

**401 - Unauthorized**
```json
{
  "message": "Invalid token or No token provided"
}
```

**403 - Forbidden**
```json
{
  "message": "Insufficient permissions for this action"
}
```

**404 - Not Found**
```json
{
  "message": "Resource not found"
}
```

**500 - Server Error**
```json
{
  "message": "Internal server error"
}
```

---

## **Authentication**

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

The token is obtained from login or register endpoints and should be stored in localStorage on the frontend.

---

## **Rate Limiting**

Currently no rate limiting is implemented. Consider adding it for production:
```bash
npm install express-rate-limit
```

---

## **CORS Configuration**

CORS is enabled for frontend at `http://localhost:3000` in development.

For production, update the FRONTEND_URL in `.env` to your deployed frontend domain.

---

## **Testing Endpoints**

Use Postman, Insomnia, or cURL to test these endpoints:

**Example with cURL**:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "Test123",
    "phone": "1234567890",
    "userType": "customer"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123"
  }'
```

---

## **Version Information**

- **API Version**: 1.0
- **Last Updated**: February 2024
- **Node.js**: v16+
- **Express**: v4.18+
- **MongoDB**: v4.0+
