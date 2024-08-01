const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const Joi = require('joi');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_flick',
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Joi validation schema
const contactSchema = Joi.object({
    fullname: Joi.string().min(3).max(100).required(),
    contact_num: Joi.string().pattern(/^\d{10}$/).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(3).max(100).required(),
    message: Joi.string().min(3).max(500).required(),
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

// Route to handle contact form submission
app.post(`${process.env.SUB_URI}/add-contact`, (req, res) => {
    const { error } = contactSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { fullname, contact_num, email, subject, message } = req.body;
    const query = 'INSERT INTO contact_messages (fname, contact_num, email, subject, message) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [fullname, contact_num, email, subject, message], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Message from Flick Website',
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${fullname}</p>
                <p><strong>Contact Number:</strong> ${contact_num}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Message sent successfully' });
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
