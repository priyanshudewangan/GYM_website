# MATRIX Gym Website

A minimalistic, "liquid glass effect" website for the MATRIX Gym, featuring an Express backend with Google Sheets integration for registration.

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install` (already done if following initial setup)
3. Obtain your `credentials.json` from Google Cloud Console for a Service Account with access to Google Sheets API.
4. Place `credentials.json` in the `/backend` folder.
5. Create a `.env` file in the `/backend` folder with the following variables:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret
   SPREADSHEET_ID=your_google_spreadsheet_id
   ```
6. Start the server: `node server.js`

### 2. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

### 3. Deployment Instructions

#### Frontend (Vercel / Netlify)
1. Push the repository to GitHub.
2. Link the repository to Vercel or Netlify.
3. The build command is `npm run build` and output directory is `dist`.
4. Add any frontend environment variables if necessary.

#### Backend (Render / Heroku)
1. Deploy the backend folder to Render as a Web Service.
2. Add your environment variables (`SPREADSHEET_ID`, `JWT_SECRET`) in the Render dashboard.
3. For `credentials.json`, you can convert it to a base64 environment variable and parse it inside `server.js` or use Render's Secret Files feature.
4. Update the frontend fetch URL in `src/App.tsx` from `http://localhost:5000/api/register` to your deployed backend URL.

### Requirements Fulfilled
- ✅ AI-assisted UI vibe (clean, minimal, liquid glass, no glowing gradients).
- ✅ Sections: Hero, About, Membership, Trainers, Registration Form.
- ✅ Responsive Design.
- ✅ Backend with Node.js and Express.js.
- ✅ Registration endpoint ready for Google Sheets API integration.
- ✅ Setup for JWT Authentication.
# GYM_website
