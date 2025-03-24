const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Replace with your Google Apps Script URL
const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxDotHIrnfMhvpYJCamWH1yIdsvA5fs8MXsMbhH5bTI26CKoo-6zxDRVOKiMKsbOHu1BQ/exec';

// Replace with your Spreadsheet ID
const spreadsheetId = '1dWExi_hHXmM8E1C5Qh5qlMDbDf-JoMesAZ0kqJ3TluU';

app.post('/api', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    // Send data to Google Apps Script
    const response = await axios.post(googleScriptUrl, {
      name,
      email,
      message,
      spreadsheetId, // Pass the spreadsheet ID to the script
    });

    if (response.data.success) {
      res.status(200).json({ message: 'Message sent successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to send message!' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error connecting to the server!' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});