import { google } from 'googleapis';

export async function GET() {
  try {
    // Use credentials directly from environment variable
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
      return Response.json(
        { error: 'Spreadsheet ID not configured' },
        { status: 500 }
      );
    }
    
    const range = 'Sheet1!A1:E10000';
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    
    // Rest of your code...
    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return Response.json({ message: 'No data found' }, { status: 404 });
    }
    
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