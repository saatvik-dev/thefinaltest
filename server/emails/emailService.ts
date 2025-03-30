import nodemailer from 'nodemailer';
import { generateWelcomeEmail, generatePromotionalEmail, generateLaunchEmail } from './templates';

// Configure nodemailer with environment variables or default test account
export class EmailService {
  private transporter: nodemailer.Transporter;
  private initialized: boolean = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
      },
    });
  }

  /**
   * Initialize the email service
   * If no email configuration is provided, it creates a test account using Ethereal
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = new Promise(async (resolve) => {
      // If no email credentials are provided, create a test account
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        try {
          console.log('[EmailService] No email credentials found, creating test account...');
          const testAccount = await nodemailer.createTestAccount();
          
          this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass,
            },
          });
          
          console.log('[EmailService] Test account created:');
          console.log(`- Username: ${testAccount.user}`);
          console.log(`- Password: ${testAccount.pass}`);
          console.log(`- Preview URL: https://ethereal.email/login`);
        } catch (error) {
          console.error('[EmailService] Error creating test account:', error);
        }
      }

      this.initialized = true;
      resolve();
    });

    return this.initializationPromise;
  }

  /**
   * Send an email
   * @param to Recipient email address
   * @param subject Email subject
   * @param html Email body in HTML format
   */
  async sendEmail(to: string, subject: string, html: string): Promise<any> {
    await this.initialize();

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Waitlist <no-reply@example.com>',
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('[EmailService] Email sent:', info.messageId);
      
      // If using Ethereal, log the preview URL
      if (info.messageId && info.messageId.includes('ethereal')) {
        console.log('[EmailService] Preview URL:', nodemailer.getTestMessageUrl(info));
      }
      
      return info;
    } catch (error) {
      console.error('[EmailService] Error sending email:', error);
      throw error;
    }
  }

  /**
   * Send a welcome email to a new waitlist subscriber
   * @param email Recipient email address
   */
  async sendWelcomeEmail(email: string): Promise<any> {
    const { subject, html } = generateWelcomeEmail(email);
    return this.sendEmail(email, subject, html);
  }

  /**
   * Send a promotional email to a waitlist subscriber
   * @param email Recipient email address
   * @param customMessage Optional custom message to include in the email
   */
  async sendPromotionalEmail(email: string, customMessage?: string): Promise<any> {
    const { subject, html } = generatePromotionalEmail(email, customMessage);
    return this.sendEmail(email, subject, html);
  }

  /**
   * Send a launch announcement email to a waitlist subscriber
   * @param email Recipient email address
   */
  async sendLaunchEmail(email: string): Promise<any> {
    const { subject, html } = generateLaunchEmail(email);
    return this.sendEmail(email, subject, html);
  }
}

// Singleton instance of the email service
export const emailService = new EmailService();