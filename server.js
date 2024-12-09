// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Create an instance of the express app
const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, JS)
app.use(express.static('public'));

// Route to handle form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Set up email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or use another email service
        auth: {
            user: 'palideepak98@gmail.com', // Your email address
            pass: 'Anujp@1.', // Your email password (or use OAuth2 for better security)
        },
    });

    // Set up email options
    const mailOptions = {
        from: email,
        to: 'palideepak98@gmail.com', // Email where the form submissions will be sent
        subject: `Message from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Message sent successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
