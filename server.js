const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");

const app = express();

const upload = multer({
    dest: "uploads/"
});

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
        user: "asmazinbox321@gmail.com",
        pass: "gzuhpycpjwvearkf"
    }
});

app.post("/send-mail", upload.single("template"), async (req, res) => {

    try {

        const selectedAlias = req.body.from;

        let content = req.body.body;

        if (req.file) {
            content = fs.readFileSync(req.file.path, "utf8");
        }

        const mailOptions = {
            from: aliases[selectedAlias],
            to: req.body.to,
            cc: req.body.cc,
            bcc: req.body.bcc,
            subject: req.body.subject,
            [req.body.bodyType]: content
        };

        const result = await transporter.sendMail(mailOptions);

        console.log("Mail sent:", result.response);

        res.json({
            success: true
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});