# Email Configuration with Google SMTP

This application now uses Nodemailer with Google SMTP for sending emails. Follow these steps to configure it:

## Setup Instructions

### 1. Enable 2-Factor Authentication on your Google Account
- Go to your Google Account settings
- Enable 2-Factor Authentication if not already enabled

### 2. Generate an App Password
- Go to your Google Account settings
- Navigate to Security > 2-Step Verification > App passwords
- Generate a new app password for "Mail"
- Copy the 16-character password (remove spaces)

### 3. Configure Environment Variables
Add these variables to your `.env.local` file:

```env
GOOGLE_EMAIL=your-gmail-address@gmail.com
GOOGLE_APP_PASSWORD=your-16-character-app-password
```

### 4. Gmail Settings (Optional)
If you encounter issues, you may need to:
- Enable "Less secure app access" (not recommended)
- OR use App Passwords (recommended)

## Email Functions

The application includes two email functions:

- `sendVerificationEmail(email, token)` - Sends email verification
- `sendPasswordResetEmail(email, token)` - Sends password reset emails

Both functions use the same Gmail SMTP configuration and maintain the existing email templates.

## Troubleshooting

1. **Authentication Error**: Ensure you're using an App Password, not your regular Gmail password
2. **SMTP Error**: Check that your Gmail account has 2FA enabled and App Passwords are available
3. **Rate Limiting**: Gmail has sending limits; consider upgrading to Google Workspace for higher limits

## Security Notes

- Never commit your actual Gmail credentials to version control
- Use App Passwords instead of your main Gmail password
- Consider using a dedicated Gmail account for sending emails
- For production, consider upgrading to Google Workspace or using a dedicated email service
