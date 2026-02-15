# INSTALLATION AND SETUP GUIDE

## Complete Installation Guide for ResolveNow

Follow these step-by-step instructions to set up and run the ResolveNow application on your local machine.

---

## **STEP 1: Prerequisites**

Before you begin, ensure you have the following installed:

1. **Node.js and npm**
   - Download from: https://nodejs.org/en/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **MongoDB**
   - Download from: https://www.mongodb.com/try/download/community
   - Installation guide: https://docs.mongodb.com/manual/installation/
   - Start MongoDB service:
     - **Windows**: MongoDB runs as a service automatically
     - **Mac**: `brew services start mongodb-community`
     - **Linux**: `sudo systemctl start mongod`

3. **Git** (optional but recommended)
   - Download from: https://git-scm.com/downloads

4. **Code Editor** (e.g., Visual Studio Code)
   - Download from: https://code.visualstudio.com/

---

## **STEP 2: Project Setup**

1. Navigate to the project directory:
   ```bash
   cd "c:\Users\ASUS\Downloads\apsche project\Resolvenow"
   ```

2. The project structure should look like:
   ```
   Resolvenow/
   ├── backend/
   ├── frontend/
   ├── README.md
   └── .gitignore
   ```

---

## **STEP 3: Backend Setup**

### 3.1 Install Dependencies
```bash
cd backend
npm install
```

This installs all required packages:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- socket.io
- express-validator

### 3.2 Configure Environment Variables
Create a `.env` file in the backend directory:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit the `.env` file and set:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resolvenow
JWT_SECRET=your_super_secret_jwt_key_12345
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3.3 Start the Backend Server

**Option 1: Using npm start**
```bash
npm start
```

**Option 2: Using npm run dev (with auto-reload)**
```bash
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

✅ Backend is running at: `http://localhost:5000`

---

## **STEP 4: Frontend Setup**

### 4.1 Open New Terminal and Navigate to Frontend
```bash
cd ../frontend
```

### 4.2 Install Dependencies
```bash
npm install
```

This installs:
- react
- react-router-dom
- axios
- bootstrap
- @mui/material
- socket.io-client

### 4.3 Configure Environment Variables
Create a `.env` file in the frontend directory:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit the `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4.4 Start the Frontend Development Server
```bash
npm start
```

The application will automatically open in your browser at:
```
http://localhost:3000
```

---

## **STEP 5: Testing the Application**

### 5.1 Create Test User Accounts

**Test Admin Account:**
- Email: admin@resolvenow.com
- Password: Admin@123
- Name: Admin User

**Test Agent Account:**
- Email: agent@resolvenow.com
- Password: Agent@123
- Name: Support Agent

**Test Customer Account:**
- Email: customer@resolvenow.com
- Password: Customer@123
- Name: John Doe

### 5.2 Manual Testing Flow

1. **Sign Up as Customer**
   - Go to http://localhost:3000/signup
   - Fill in all required fields
   - Click "Register"

2. **Login as Customer**
   - Go to http://localhost:3000/login
   - Use your created credentials
   - You should be redirected to dashboard

3. **Create a Complaint**
   - Click "Register your Complaint" button
   - Fill in complaint details
   - Submit the complaint

4. **Track Complaint**
   - View complaint in dashboard
   - Click "View" to see details
   - Check status timeline

5. **Admin Functions**
   - Login with admin account at /admin-dashboard
   - View all complaints
   - Assign complaints to agents

6. **Agent Functions**
   - Login with agent account at /agent-dashboard
   - View assigned complaints
   - Update complaint status
   - Send messages to customers

---

## **STEP 6: Database Setup**

### 6.1 Check MongoDB Connection

MongoDB should automatically create the database when you first run the application.

To verify the database was created:
```bash
mongosh  # or mongo (older versions)
```

Inside MongoDB shell:
```javascript
show databases
use resolvenow
show collections
```

Expected collections:
- user_schema
- complaint_schema
- assigned_complaint
- message

### 6.2 View Data (Optional)
```javascript
db.user_schema.find()
db.complaint_schema.find()
```

---

## **STEP 7: Project Structure Overview**

### Backend Structure
```
backend/
├── controllers/           # Business logic
│   ├── authController.js
│   ├── userController.js
│   ├── complaintController.js
│   ├── agentController.js
│   ├── messageController.js
│   └── adminController.js
├── models/               # Database schemas
│   ├── User.js
│   ├── Complaint.js
│   ├── AssignedComplaint.js
│   └── Message.js
├── routes/               # API endpoints
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── complaintRoutes.js
│   ├── agentRoutes.js
│   ├── messageRoutes.js
│   └── adminRoutes.js
├── middleware/           # Authentication & validation
│   └── authMiddleware.js
├── server.js             # Express server setup
├── package.json
└── .env
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── PrivateRoute.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Profile.js
│   │   ├── CreateComplaint.js
│   │   ├── CustomerDashboard.js
│   │   ├── ComplaintDetails.js
│   │   ├── AgentDashboard.js
│   │   ├── AgentComplaintManager.js
│   │   └── AdminDashboard.js
│   ├── services/
│   │   └── api.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── complaint.css
│   │   ├── profile.css
│   │   └── home.css
│   ├── App.js
│   └── index.js
├── public/
│   └── index.html
└── package.json
```

---

## **STEP 8: Running in Production**

### 8.1 Build Frontend for Production
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` folder.

### 8.2 Backend Production Configuration
Update `.env` for production:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resolvenow
JWT_SECRET=strong_production_secret_key
FRONTEND_URL=https://yourdomain.com
```

### 8.3 Deploy
- Deploy backend to Heroku, AWS, or similar platform
- Deploy frontend static files to Vercel, Netlify, or similar

---

## **STEP 9: Troubleshooting**

### Problem: Port Already in Use
```bash
# For Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Problem: MongoDB Connection Failed
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Default connection string: `mongodb://localhost:27017/resolvenow`

### Problem: CORS Errors
- Ensure backend is running
- Check FRONTEND_URL in backend .env
- Frontend should be able to reach `http://localhost:5000/api`

### Problem: Module Not Found
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Problem: Port 3000 Already in Use
```bash
# Frontend will auto-suggest a different port
# Or set a different port:
PORT=3001 npm start
```

---

## **STEP 10: API Testing**

Use Postman or Insomnia to test APIs:

1. **Download**: https://www.postman.com/downloads/

2. **Import API Collection**
   - Create new requests for each endpoint

3. **Example Test Request**:
   ```
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json
   
   {
     "email": "customer@resolvenow.com",
     "password": "Customer@123"
   }
   ```

---

## **STEP 11: Features Checklist**

- ✅ User Registration & Login
- ✅ Complaint Creation
- ✅ Complaint Tracking
- ✅ Real-time Status Updates
- ✅ Chat/Messaging System
- ✅ Agent Assignment
- ✅ Admin Dashboard
- ✅ Role-based Access Control
- ✅ Feedback & Rating System
- ✅ Responsive Design

---

## **ADDITIONAL RESOURCES**

- **MongoDB Documentation**: https://docs.mongodb.com/
- **Express.js Guide**: https://expressjs.com/
- **React Documentation**: https://react.dev/
- **Bootstrap Documentation**: https://getbootstrap.com/docs/
- **Material-UI Documentation**: https://mui.com/

---

## **SUPPORT & CONTACT**

For issues, questions, or suggestions:
- Check the README files in backend/ and frontend/ directories
- Review error messages in browser console and terminal
- Verify all environment variables are correctly set
- Ensure all prerequisites are installed

---

## **NEXT STEPS**

1. Explore the application features
2. Test all user roles (Customer, Agent, Admin)
3. Customize branding and styling
4. Add more validation rules
5. Implement email notifications
6. Set up automated testing
7. Deploy to production

Congratulations! You have successfully set up ResolveNow! 🎉
