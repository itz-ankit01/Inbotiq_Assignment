# Full-Stack Mini Project

A full-stack web application with role-based authentication (User/Admin) built with Next.js, Express, and MongoDB.

## Features

- **Authentication with Roles:**
  - Signup page with role selection (User or Admin)
  - Login page
  - Logout functionality
  - Secure password storage using bcrypt
  - JWT-based authentication

- **Dashboard:**
  - Protected route accessible only when logged in
  - Displays welcome message with user name and role
  - Role-specific header showing "Welcome, [Name] (User)" or "Welcome, [Name] (Admin)"
  - Logout button to securely sign out

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- bcryptjs for password hashing
- JWT for authentication

### Frontend
- Next.js 14 with TypeScript
- TailwindCSS for styling
- Axios for API calls

## Project Structure

```
Assignment/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── auth.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   └── User.model.js
│   │   ├── routes/
│   │   │   └── auth.routes.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   └── index.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── .env.example
│   ├── .gitignore
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string and JWT secret:
```env
PORT=5001
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5001` (default port is 5001 to avoid conflicts with macOS AirPlay Receiver)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user account
  - Body: `{ name, email, password, role }`
  - Returns: User data and JWT token

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: User data and JWT token

- `GET /api/auth/me` - Get current user info (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: User data

- `POST /api/auth/logout` - Logout user (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

## Deployment

### Prerequisites

1. **GitHub Account**: Push your code to a GitHub repository
2. **MongoDB Atlas**: Set up a free MongoDB cluster and get your connection string
3. **Render Account**: Sign up at [render.com](https://render.com) (free tier available)
4. **Netlify Account**: Sign up at [netlify.com](https://netlify.com) (free tier available)

---

### Step 1: Deploy Backend on Render

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub account and select your repository

3. **Configure the service**
   - **Name**: `your-app-backend` (or any name you prefer)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Select "Free" (or paid if preferred)

4. **Set Environment Variables**
   Click "Add Environment Variable" and add:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters
   JWT_EXPIRE=7d
   NODE_ENV=production
   FRONTEND_URL=https://your-netlify-app.netlify.app,http://localhost:3000
   ```
   
   **Important**: 
   - Replace `your-mongodb-atlas-connection-string` with your actual MongoDB Atlas connection string
   - Use a strong, random string for `JWT_SECRET` (at least 32 characters)
   - Make sure your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs) or Render's IP ranges
   - For `FRONTEND_URL`, you can add it now with a placeholder, or add it after deploying frontend (Render will auto-redeploy)
   - **Note**: Render automatically assigns a PORT, so you don't need to set it manually

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend
   - Wait for deployment to complete (usually 2-5 minutes)
   - Copy your backend URL (e.g., `https://your-app-backend.onrender.com`)

6. **Test your backend**
   - Visit `https://your-app-backend.onrender.com/api/health`
   - You should see: `{"status":"OK","message":"Server is running"}`

---

### Step 2: Deploy Frontend on Netlify

1. **Ensure your code is on GitHub**
   - Make sure all your frontend code is committed and pushed to GitHub

2. **Create a new site on Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account and select your repository

3. **Configure build settings**
   - Netlify should auto-detect Next.js if you have `netlify.toml` in your `frontend` folder
   - If not, click "Show advanced" and set:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   
   **Note**: The project includes a `netlify.toml` file that should auto-configure these settings

4. **Set Environment Variables**
   Click "New variable" and add:
   ```
   NEXT_PUBLIC_API_URL=https://your-app-backend.onrender.com/api
   ```
   
   **Important**: Replace `https://your-app-backend.onrender.com` with your actual Render backend URL

5. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your frontend
   - Wait for deployment to complete (usually 3-5 minutes)
   - Your site will be available at a URL like `https://random-name-123.netlify.app`

6. **Configure custom domain (optional)**
   - Go to "Site settings" → "Domain management"
   - Add your custom domain if you have one

---

### Step 3: Update CORS Settings (Important!)

After deploying, you need to update your backend CORS settings to allow requests from your Netlify frontend:

1. **Add FRONTEND_URL environment variable in Render**
   - Go to your Render service dashboard
   - Navigate to "Environment" tab
   - Add a new environment variable:
     ```
     FRONTEND_URL=https://your-netlify-app.netlify.app,http://localhost:3000
     ```
   - Replace `https://your-netlify-app.netlify.app` with your actual Netlify URL
   - Render will automatically redeploy with the new CORS settings
   
   **Note**: The backend code already supports this - just add the environment variable!

---

### Step 4: Test Your Deployment

1. **Test Frontend**
   - Visit your Netlify URL
   - Try signing up a new user
   - Try logging in
   - Check if the dashboard loads correctly

2. **Test Backend**
   - Check Render logs for any errors
   - Test API endpoints using Postman or curl

---

### Troubleshooting

**Backend Issues:**
- **Build fails**: Check Render build logs for errors
- **MongoDB connection fails**: Verify your MongoDB Atlas connection string and IP whitelist
- **Port issues**: Render automatically assigns a port via `process.env.PORT`, so don't set PORT manually
- **CORS errors**: Make sure `FRONTEND_URL` environment variable is set correctly in Render

**Frontend Issues:**
- **Build fails**: Check Netlify build logs
- **API calls fail**: Verify `NEXT_PUBLIC_API_URL` is set correctly
- **CORS errors**: Make sure you've updated CORS settings in backend

**Common Solutions:**
- Clear browser cache and cookies
- Check browser console for errors
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

---

### Important Notes

1. **Free Tier Limitations**:
   - Render free tier: Services spin down after 15 minutes of inactivity (first request may be slow)
   - Netlify free tier: 100GB bandwidth, 300 build minutes/month

2. **Environment Variables**:
   - Never commit `.env` files to GitHub
   - Always set environment variables in the deployment platform's dashboard

3. **MongoDB Atlas**:
   - Free tier (M0) is sufficient for development
   - Make sure to whitelist all IPs or specific IP ranges

4. **Security**:
   - Use strong JWT secrets in production
   - Keep your MongoDB connection string secure
   - Regularly update dependencies

## Environment Variables

Make sure to set up the following environment variables:

**Backend:**
- `PORT` - Server port (default: 5001, automatically tries next port if in use)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - Token expiration time (default: 7d)

**Frontend:**
- `NEXT_PUBLIC_API_URL` - Backend API URL

## License

This project is open source and available for portfolio use.

