const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
    origin: "https://portfolio-backend-8uab8k7-krinal-khakharias-projects.vercel.app" // Replace with your frontend URL
}));
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Database Setup
const db = new sqlite3.Database('./messages.db', (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        // Create the contacts table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                message TEXT
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Contacts table is ready');
            }
        });
    }
});

// Default Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Save Contact Form Data
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const stmt = db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');
    stmt.run(name, email, message, function(err) {
        if (err) {
            console.error('Error inserting data:', err); // Log the error
            return res.status(500).json({ error: err.message });
        }
        console.log('Data inserted successfully:', { name, email, message }); // Log success
        res.json({ success: true, message: 'Message saved successfully' });
    });
    stmt.finalize();
});

// Get All Messages (For Testing)
app.get('/messages', (req, res) => {
    db.all('SELECT * FROM contacts', [], (err, rows) => {
        if (err) {
            console.error('Error fetching messages:', err); // Log the error
            res.status(500).json({ error: err.message });
        } else {
            console.log('Fetched messages:', rows); // Log the fetched data
            res.json(rows);
        }
    });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});