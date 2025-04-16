import { google } from 'googleapis';

const API_KEY = process.env.GOOGLE_API_KEY;

export async function GET() {
  try {
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = 'Sheet1!A1:E10000'; // Check if this range is correct

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log('Google Sheets API response:', data); // Log the API response

    if (!data.values || data.values.length === 0) {
      return Response.json({ message: 'No data found' }, { status: 404 });
    }

    const headers = data.values[0];
    const rows = data.values.slice(1);

    const formattedData = rows.map(row => {
      return headers.reduce((obj, header, index) => {
        obj[header] = row[index] || '';
        return obj;
      }, {});
    });

    return Response.json({ data: formattedData });
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    return Response.json(
      { error: 'Failed to fetch data from Google Sheets', details: error.message },
      { status: 500 }
    );
  }
}
