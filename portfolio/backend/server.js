require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

let db = null;
try {
  db = require('./db');
} catch (err) {
  console.warn("Database module not loaded or offline:", err.message);
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*" // Allows requests from Vercel, Netlify, localhost, or any frontend domain
}));

// Gunaj's Primary Email for receiving messages and requests
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "gunnajpchugh@gmail.com";

// Setup Nodemailer Transporter
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // 16-character Gmail App Password
    },
  });
  console.log("Nodemailer SMTP transporter initialized with user:", process.env.EMAIL_USER);
} else {
  console.warn("⚠️ EMAIL_USER and EMAIL_PASS environment variables are not set. Emails will be logged to console.");
}

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
    emailConfigured: Boolean(transporter),
    recipient: RECIPIENT_EMAIL
  });
});

// 1. General Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required fields."
    });
  }

  const cleanSubject = subject ? subject.trim() : `New Portfolio Message from ${name}`;
  console.log(`[Contact Form Received] From: ${name} <${email}> | Subject: ${cleanSubject}`);

  let emailSent = false;

  // Send real email to Gunaj via Nodemailer
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"${name} (Portfolio)" <${process.env.EMAIL_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: `[Portfolio Contact] ${cleanSubject}`,
        text: `You have received a new contact message from your portfolio!\n\nName: ${name}\nEmail: ${email}\nSubject: ${cleanSubject}\n\nMessage:\n${message}\n\n---\nSent via gunaj-chugh portfolio`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; margin-top: 0;">New Portfolio Contact Message</h2>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
            <p style="margin: 6px 0;"><strong>Sender Name:</strong> ${name}</p>
            <p style="margin: 6px 0;"><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 6px 0;"><strong>Subject:</strong> ${cleanSubject}</p>
            <div style="margin-top: 15px; padding: 15px; background: #f8fafc; border-left: 4px solid #facc15; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap; color: #334155;">${message}</p>
            </div>
            <div style="margin-top: 20px;">
              <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(cleanSubject)}" style="display: inline-block; padding: 10px 18px; background: #0f172a; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Reply Directly to ${name}
              </a>
            </div>
          </div>
        `,
      });
      emailSent = true;
      console.log(`Email successfully dispatched to ${RECIPIENT_EMAIL}`);
    } catch (emailErr) {
      console.error("Nodemailer error sending contact message:", emailErr);
    }
  }

  // Attempt database backup (non-blocking so DB failure never breaks the user request)
  if (db && typeof db.query === 'function') {
    const sql = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, email, cleanSubject, message], (dbErr) => {
      if (dbErr) {
        console.warn("Database insert failed (continuing gracefully):", dbErr.message);
      } else {
        console.log("Contact recorded in MySQL database.");
      }
    });
  }

  return res.json({
    success: true,
    message: "Data saved successfully",
    emailSent: emailSent,
  });
});

// 2. Official Resume Request Endpoint
app.post("/api/resume-request", async (req, res) => {
  const { name, email, company, note } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: "Name and email are required to request resume."
    });
  }

  const companyName = company ? company.trim() : "Direct Recruiter / Visitor";
  const customNote = note ? note.trim() : "Interested in reviewing Gunaj's resume for engineering roles.";
  console.log(`[Resume Request Received] From: ${name} <${email}> @ ${companyName}`);

  let emailSent = false;

  // Send real email alert to Gunaj via Nodemailer
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"${name} (Resume Request)" <${process.env.EMAIL_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: `[Resume Request] ${name} from ${companyName}`,
        text: `Someone has requested your official resume via portfolio!\n\nName: ${name}\nEmail: ${email}\nCompany: ${companyName}\nNote/Opportunity:\n${customNote}\n\nReply directly to send your latest resume PDF!\n---\nGunaj Chugh Portfolio`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="background: #0f172a; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px;">
              <h2 style="color: #facc15; margin: 0; font-size: 18px;">Official Resume Request Received</h2>
            </div>
            <p style="margin: 6px 0;"><strong>Requester Name:</strong> ${name}</p>
            <p style="margin: 6px 0;"><strong>Official Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 6px 0;"><strong>Company / Team:</strong> ${companyName}</p>
            <div style="margin-top: 15px; padding: 15px; background: #f8fafc; border-left: 4px solid #38bdf8; border-radius: 4px;">
              <p style="margin: 0; font-weight: bold; color: #64748b; font-size: 12px;">MESSAGE / ROLE NOTE:</p>
              <p style="margin: 6px 0 0 0; color: #334155; white-space: pre-wrap;">${customNote}</p>
            </div>
            <div style="margin-top: 20px;">
              <a href="mailto:${email}?subject=Gunaj%20Chugh%20-%20Software%20Engineer%20Resume&body=Hi%20${encodeURIComponent(name)},%0A%0AThank%20you%20for%20reaching%20out!%20Please%20find%20attached%20my%20latest%20resume.%0A%0ABest%20regards,%0AGunaj%20Chugh" style="display: inline-block; padding: 11px 20px; background: #22c55e; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Send Resume to ${name} &rarr;
              </a>
            </div>
          </div>
        `,
      });
      emailSent = true;
      console.log(`Resume request email dispatched to ${RECIPIENT_EMAIL}`);
    } catch (emailErr) {
      console.error("Nodemailer error sending resume request:", emailErr);
    }
  }

  // Backup log in database
  if (db && typeof db.query === 'function') {
    const sql = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;
    const summaryMsg = `[Resume Request] Company: ${companyName} | Note: ${customNote}`;
    db.query(sql, [name, email, `Resume Request - ${companyName}`, summaryMsg], (dbErr) => {
      if (dbErr) {
        console.warn("Database insert failed (continuing gracefully):", dbErr.message);
      }
    });
  }

  return res.json({
    success: true,
    message: "Resume request recorded successfully",
    emailSent: emailSent,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
