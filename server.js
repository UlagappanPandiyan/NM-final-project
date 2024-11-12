const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'se',
    password: 'Joker123#',
    port: 5432,
});

// Endpoint to store student data
app.post('/enroll', async (req, res) => {
    const { name, email, website, image, gender, skills } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO students (name, email, website, image, gender, skills) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, email, website, image, gender, skills]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
