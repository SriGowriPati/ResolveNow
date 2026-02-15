# QUICK START GUIDE

Get ResolveNow up and running in 5 minutes!

## Prerequisites Checklist
- [ ] Node.js installed (https://nodejs.org/)
- [ ] MongoDB installed and running
- [ ] Code editor (VS Code recommended)

## Quick Setup (Windows)

### 1. Open PowerShell and Navigate to Project
```powershell
cd "c:\Users\ASUS\Downloads\apsche project\Resolvenow"
```

### 2. Start Backend (Terminal 1)
```powershell
cd backend
npm install
npm start
```
✅ Wait for: "Server running on port 5000"

### 3. Start Frontend (Terminal 2)
```powershell
cd frontend
npm install
npm start
```
✅ Application opens at: http://localhost:3000

---

## Quick Setup (Mac/Linux)

### 1. Navigate to Project
```bash
cd ~/path/to/Resolvenow
```

### 2. Start Backend (Terminal 1)
```bash
cd backend
npm install
npm start
```

### 3. Start Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

---

## First Login

### Create Account:
1. Click **SignUp** at top right
2. Fill in form:
   - Full Name: John Doe
   - Email: john@example.com
   - Password: Test@123
   - Phone: 1234567890
   - User Type: Customer
3. Click **Register**

### Access Dashboard:
- Customer: http://localhost:3000/dashboard
- Agent: http://localhost:3000/agent-dashboard
- Admin: http://localhost:3000/admin-dashboard

---

## Key Features to Test

### As Customer:
1. ✅ Create a complaint (My Dashboard → Register Complaint)
2. ✅ Track status (My Complaints)
3. ✅ Chat with agent (View Complaint → Chat)
4. ✅ Provide feedback (After resolution)

### As Agent:
1. ✅ View assigned complaints
2. ✅ Update status
3. ✅ Chat with customers

### As Admin:
1. ✅ View all complaints
2. ✅ Assign to agents
3. ✅ View statistics

---

## .env Files Quick Copy

### Backend .env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resolvenow
JWT_SECRET=your_secret_key_123
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend .env
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| Port 5000 in use | `netstat -ano \| findstr :5000` then kill process |
| MongoDB not running | Start MongoDB service in Windows Services |
| Module not found | Delete node_modules, run `npm install` again |
| CORS errors | Check backend and frontend are running |

---

## Project Structure
```
Resolvenow/
├── backend/
│   ├── controllers/     # Business logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth & validation
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
├── SETUP_GUIDE.md      # Detailed setup
├── API_DOCUMENTATION.md # API reference
└── README.md
```

---

## Important Files

| File | Purpose |
|------|---------|
| backend/.env | Backend configuration |
| frontend/.env | Frontend configuration |
| server.js | Backend entry point |
| App.js | Frontend main component |
| AuthContext.js | Authentication state |
| api.js | API service |

---

## Useful Commands

```bash
# Backend
npm start           # Start server
npm run dev        # Start with auto-reload

# Frontend
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests

# Database
mongosh            # Open MongoDB shell
show databases     # List databases
use resolvenow     # Switch to resolvenow DB
show collections   # List collections
```

---

## API Base URL
```
http://localhost:5000/api
```

---

## Documentation Files

- **SETUP_GUIDE.md** - Detailed installation and setup
- **API_DOCUMENTATION.md** - Complete API reference
- **backend/README.md** - Backend specific info
- **frontend/README.md** - Frontend specific info

---

## Next Steps

1. ✅ Customize branding (colors, logos)
2. ✅ Configure email notifications
3. ✅ Add more complaint categories
4. ✅ Set up automated tests
5. ✅ Deploy to production

---

## Support

For issues or questions:
- Review the SETUP_GUIDE.md
- Check API_DOCUMENTATION.md
- Look at specific README files in backend/frontend

---

**You're all set! Happy coding!** 🚀
