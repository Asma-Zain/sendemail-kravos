require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

const upload = multer({
    dest: "uploads/"
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

app.use(express.static("public"));

const aliases = {
    "asma@kravos.tech": '"Asma" <asma@kravos.tech>',
    "info@kravos.tech": '"Info" <info@kravos.tech>',
    "nitheesh@kravos.tech": '"Nitheesh" <nitheesh@kravos.tech>',
    "animesh@kravos.tech": '"Animesh" <animesh@kravos.tech>'
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error("Transporter verification error:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

app.post("/send-mail", upload.single("template"), async (req, res) => {

    console.log("Received mail request:", req.body);
    if (req.file) {
        console.log("Received file:", req.file.originalname);
    }

    try {

        const { from, to, cc, bcc, subject, bodyType, body } = req.body;

        if (!to) {
            return res.status(400).json({ success: false, error: "Recipient (To) is required" });
        }

        const selectedAlias = from;

        if (!aliases[selectedAlias]) {
            console.warn("Unknown alias selected:", selectedAlias);
        }

        let content = body;

        if (req.file) {
            content = fs.readFileSync(req.file.path, "utf8");
            // Clean up uploaded file
            fs.unlinkSync(req.file.path);
        }

        const mailOptions = {
            from: aliases[selectedAlias] || selectedAlias,
            to: to,
            cc: cc || undefined,
            bcc: bcc || undefined,
            subject: subject || "(No Subject)",
            [bodyType || "text"]: content || ""
        };

        const result = await transporter.sendMail(mailOptions);

        console.log("Mail sent:", result.response);

        res.json({
            success: true
        });

    } catch (err) {

        console.error("Error sending mail:", err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
