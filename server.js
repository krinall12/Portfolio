const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Replace with your Google Apps Script URL
const googleScriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

app.post('/api', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    // Send data to Google Sheets via Google Apps Script
    const response = await axios.post(googleScriptUrl, {
      name,
      email,
      message,
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