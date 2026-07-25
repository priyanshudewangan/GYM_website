import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretmatrixkey';

// Mock DB for users
const users = [];

// Login/Register endpoint (JWT)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  
  // Dummy check
  let user = users.find(u => u.email === email);
  if (!user) {
    user = { id: Date.now(), email };
    users.push(user);
  }
  
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
});

// Google Sheets Integration
const setupGoogleSheets = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json', // Must be provided by user
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    return googleSheets;
  } catch (error) {
    console.error('Google Sheets auth failed (missing credentials.json probably):', error.message);
    return null;
  }
};

app.post('/api/register', async (req, res) => {
  const { name, email, phone, plan } = req.body;
  if (!name || !email || !phone || !plan) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Log to mock database
  console.log('New Registration:', { name, email, phone, plan });

  // Attempt Google Sheets integration
  const googleSheets = await setupGoogleSheets();
  if (googleSheets) {
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (spreadsheetId) {
      try {
        await googleSheets.spreadsheets.values.append({
          auth: googleSheets.auth,
          spreadsheetId,
          range: 'Sheet1!A:D',
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [[name, email, phone, plan, new Date().toISOString()]],
          },
        });
        console.log('Saved to Google Sheets');
      } catch (err) {
        console.error('Error saving to sheets:', err.message);
      }
    }
  }

  res.status(200).json({ message: 'Registration successful!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
