// Email template definitions for the application

/**
 * Welcome email template
 * Sent when a user joins the waitlist
 */
export function generateWelcomeEmail(email: string): {subject: string, html: string} {
  const subject = 'Welcome to Our Exclusive Waitlist';
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Waitlist</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }
    .content {
      background-color: #f9f9f9;
      padding: 30px;
      border-radius: 8px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 12px;
      color: #888;
    }
    h1 {
      color: #000;
      margin-top: 0;
    }
    p {
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background-color: #000;
      color: #fff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 4px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <!-- Logo -->
      <img src="https://example.com/logo.png" alt="Logo" class="logo">
    </div>
    
    <div class="content">
      <h1>Thank You for Joining Our Waitlist</h1>
      
      <p>Hello,</p>
      
      <p>Thank you for joining our exclusive waitlist. We're thrilled to have you as part of our community.</p>
      
      <p>We're working hard to prepare our upcoming collection, and you'll be among the first to know when it launches.</p>
      
      <p>Stay tuned for exclusive updates and early access opportunities.</p>
      
      <p>Best regards,<br>The Team</p>
    </div>
    
    <div class="footer">
      <p>© 2025 Company. All rights reserved.</p>
      <p>You're receiving this email because you signed up for our waitlist with this email address: ${email}</p>
    </div>
  </div>
</body>
</html>
  `;
  
  return { subject, html };
}

/**
 * Custom promotional email template
 * Can be used for special announcements or offers
 */
export function generatePromotionalEmail(email: string, customMessage: string = ""): {subject: string, html: string} {
  const subject = 'Special Announcement for Our Waitlist Members';
  
  const promotionalMessage = customMessage || 'We have some exciting news to share with you about our upcoming collection.';
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Special Announcement</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }
    .content {
      background-color: #f9f9f9;
      padding: 30px;
      border-radius: 8px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 12px;
      color: #888;
    }
    h1 {
      color: #000;
      margin-top: 0;
    }
    p {
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background-color: #000;
      color: #fff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 4px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <!-- Logo -->
      <img src="https://example.com/logo.png" alt="Logo" class="logo">
    </div>
    
    <div class="content">
      <h1>Special Announcement</h1>
      
      <p>Hello,</p>
      
      <p>${promotionalMessage}</p>
      
      <p>As a valued member of our waitlist, you'll have exclusive early access before the general public.</p>
      
      <p>Stay tuned for more details coming soon.</p>
      
      <p>Best regards,<br>The Team</p>
    </div>
    
    <div class="footer">
      <p>© 2025 Company. All rights reserved.</p>
      <p>You're receiving this email because you signed up for our waitlist with this email address: ${email}</p>
    </div>
  </div>
</body>
</html>
  `;
  
  return { subject, html };
}

/**
 * Launch announcement email template
 * Sent when the collection is officially launched
 */
export function generateLaunchEmail(email: string): {subject: string, html: string} {
  const subject = 'Our Collection Has Launched - Exclusive Access Inside';
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We've Launched!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }
    .content {
      background-color: #f9f9f9;
      padding: 30px;
      border-radius: 8px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 12px;
      color: #888;
    }
    h1 {
      color: #000;
      margin-top: 0;
    }
    p {
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background-color: #000;
      color: #fff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 4px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <!-- Logo -->
      <img src="https://example.com/logo.png" alt="Logo" class="logo">
    </div>
    
    <div class="content">
      <h1>We've Launched!</h1>
      
      <p>Hello,</p>
      
      <p>We're excited to announce that our exclusive collection is now available!</p>
      
      <p>As a valued member of our waitlist, you now have exclusive early access before we open to the general public.</p>
      
      <p style="text-align: center;">
        <a href="https://example.com/collection" class="button">Shop the Collection Now</a>
      </p>
      
      <p>This exclusive access period will end in 48 hours, so be sure to explore the collection while you have priority access!</p>
      
      <p>Thank you for your interest and support.</p>
      
      <p>Best regards,<br>The Team</p>
    </div>
    
    <div class="footer">
      <p>© 2025 Company. All rights reserved.</p>
      <p>You're receiving this email because you signed up for our waitlist with this email address: ${email}</p>
    </div>
  </div>
</body>
</html>
  `;
  
  return { subject, html };
}