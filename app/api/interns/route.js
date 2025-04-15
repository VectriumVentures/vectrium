// app/api/sheets/route.js

import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    // Load credentials from the JSON file
    // Place your downloaded service account JSON file in the project root
    // or in a secure location (with appropriate path adjustments)
    const keyFilePath = path.join(process.cwd(), 'app', 'credentials.json');
    const credentials = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    
    // Get data from spreadsheet
    // Store just the spreadsheet ID in your environment variables
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = 'Sheet1!A1:E10000'; // Adjust range as needed
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    
    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return Response.json({ message: 'No data found' }, { status: 404 });
    }
    
    // Convert to JSON with headers as keys
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      return headers.reduce((obj, header, index) => {
        obj[header] = row[index] || '';
        return obj;
      }, {});
    });
    
    return Response.json({ data });
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    return Response.json(
      { error: 'Failed to fetch data from Google Sheets', details: error.message },
      { status: 500 }
    );
  }
}