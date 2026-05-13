# Kravos Mailer

A simple and efficient email console built with Node.js, Express, and Nodemailer. This tool allows you to send HTML or Plain Text emails with support for aliases, CC, BCC, and file-based templates.

## Features

- **Alias Support:** Choose from pre-configured sender identities.
- **Dynamic Content:** Send plain text or upload HTML files as email templates.
- **Advanced Routing:** Supports Recipients (To), CC, and BCC.
- **Improved Reliability:** 
  - Backend validation for required fields.
  - CORS enabled for cross-origin frontend connections.
  - Automatic cleanup of uploaded template files.
  - Detailed request logging and error handling.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- A Gmail account (or any SMTP service) with an [App Password](https://support.google.com/accounts/answer/185833) generated.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Asma-Zain/sendemail-kravos.git
   cd sendemail-kravos
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the Server:**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```
   *Note: Ensure `.env` is ignored by git (already handled in `.gitignore`).*


## Running the App

1. **Start the server:**
   ```bash
   node server.js
   ```

2. **Access the console:**
   Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `server.js`: The Express backend handling mail logic and file uploads.
- `public/`: Contains the frontend assets.
  - `index.html`: The mail console interface.
  - `script.js`: Frontend logic for sending requests to the API.
  - `style.css`: Modern styling for the console.
- `uploads/`: Temporary storage for uploaded HTML templates (auto-cleaned).

## API Documentation

### POST `/send-mail`
Sends an email using multipart/form-data.

**Parameters:**
- `from`: The sender alias (e.g., `asma@kravos.tech`).
- `to`: Recipient email(s).
- `cc` (optional): CC recipients.
- `bcc` (optional): BCC recipients.
- `subject`: Email subject.
- `bodyType`: Either `html` or `text`.
- `body`: The content of the email (ignored if a template file is provided).
- `template` (optional): An HTML file to be used as the email body.

## License

This project is private and for internal use at Kravos.
