import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB total
    files: 20 // max 20 files
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.xls', '.xlsx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Create Nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload documents endpoint
  app.post("/api/upload-documents", upload.array("files", 20), async (req, res) => {
    try {
      const { advisorId, companyType, comments, consents } = req.body;
      const files = req.files as Express.Multer.File[];

      // Validate required fields
      if (!advisorId || !companyType || !files || files.length === 0) {
        return res.status(400).json({ 
          message: "Brak wymaganych danych (advisorId, companyType, files)" 
        });
      }

      // Map advisorId to email
      const advisorEmails: Record<string, string> = {
        adriano: "adriano.orkisz@kancelaria-finansowa.com.pl",
        krystian: "krystian.skowronski@kancelaria-finansowa.com.pl"
      };

      const advisorEmail = advisorEmails[advisorId];
      if (!advisorEmail) {
        return res.status(400).json({ message: "Nieprawidłowy ID doradcy" });
      }

      // Parse consents if it's a JSON string
      let parsedConsents = consents;
      if (typeof consents === 'string') {
        try {
          parsedConsents = JSON.parse(consents);
        } catch (e) {
          parsedConsents = consents;
        }
      }

      // Prepare email attachments
      const attachments = files.map(file => ({
        filename: file.originalname,
        path: file.path
      }));

      // Prepare email body
      const emailBody = `
Doradco, otrzymałeś nowe dokumenty od klienta.

Typ firmy: ${companyType}

Liczba załączonych dokumentów: ${files.length}
Nazwy plików:
${files.map((f, i) => `${i + 1}. ${f.originalname}`).join('\n')}

Komentarz klienta:
${comments || '(brak komentarza)'}

Zgody klienta:
${JSON.stringify(parsedConsents, null, 2)}

---
Wysłane przez EU Funding Finder
      `.trim();

      // Create transporter and send email
      const transporter = createTransporter();
      
      const mailOptions = {
        from: process.env.SMTP_USER || '"EU Funding Finder" <noreply@eu-funding.com>',
        to: advisorEmail,
        subject: "Nowe dokumenty od klienta – EU Funding Finder",
        text: emailBody,
        attachments
      };

      console.log(`Sending email to ${advisorEmail} with ${files.length} attachments...`);
      
      const info = await transporter.sendMail(mailOptions);
      
      console.log("Email sent:", info.messageId);
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

      // Clean up uploaded files
      await Promise.all(files.map(file => 
        fs.unlink(file.path).catch(err => 
          console.error(`Failed to delete ${file.path}:`, err)
        )
      ));

      res.json({ 
        success: true, 
        message: "Dokumenty zostały wysłane",
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info) // For testing with Ethereal
      });

    } catch (error: any) {
      console.error("Error uploading documents:", error);
      
      // Clean up files in case of error
      if (req.files) {
        const files = req.files as Express.Multer.File[];
        await Promise.all(files.map(file => 
          fs.unlink(file.path).catch(() => {})
        ));
      }
      
      res.status(500).json({ 
        message: "Błąd podczas wysyłania dokumentów",
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
