export const VERIFICATION_EMAIL_TEMPLATE = 
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    /* Keyframe for smooth fade-in */
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    /* Keyframe for pulse effect on verification code */
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }

    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      animation: fadeIn 1s ease-in;
      background: #f4f4f4;
    }

    .header {
      background: linear-gradient(to right, #5A9A3D, #8BBE5F);
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
      background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png');
      background-size: cover;
    }

    .header h1 {
      color: white;
      margin: 0;
      font-family: 'Georgia', serif;
      font-size: 36px;
    }

    .content {
      background-color: #fff;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      font-size: 16px;
    }

    .verification-code {
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 5px;
      color: #5A9A3D;
      animation: pulse 1.5s infinite;
      padding: 5px;
      background: #f4f4f4;
      border-radius: 8px;
    }

    .cta-button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #5A9A3D;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
      transition: background-color 0.3s ease;
      font-family: 'Arial', sans-serif;
    }

    .cta-button:hover {
      background-color: #468a2b;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Verify Your Farm Shop Account</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Thank you for signing up with Farm Shop! We are excited to have you join our community of farmers and agriculture enthusiasts.</p>
    <p>Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span class="verification-code">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration and start shopping for your farm needs.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn’t create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your Farm Shop Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    /* Keyframe for smooth fade-in */
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    /* Keyframe for pulse effect on success icon */
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }

    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      animation: fadeIn 1s ease-in;
      background: #f4f4f4;
    }

    .header {
      background: linear-gradient(to right, #5A9A3D, #8BBE5F);
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
      background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png');
      background-size: cover;
    }

    .header h1 {
      color: white;
      margin: 0;
      font-family: 'Georgia', serif;
      font-size: 36px;
    }

    .content {
      background-color: #fff;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      font-size: 16px;
    }

    .success-icon {
      font-size: 50px;
      background-color: #4CAF50;
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      line-height: 60px;
      display: inline-block;
      animation: pulse 1.5s infinite;
    }

    .cta-button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #5A9A3D;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
      transition: background-color 0.3s ease;
      font-family: 'Arial', sans-serif;
    }

    .cta-button:hover {
      background-color: #468a2b;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Successful</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div class="success-icon">✓</div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your Farm Shop Team</p>
    <a href="#" class="cta-button">Secure My Account</a>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    /* Keyframe for smooth fade-in */
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      animation: fadeIn 1s ease-in;
      background: #f4f4f4;
    }

    .header {
      background: linear-gradient(to right, #5A9A3D, #8BBE5F);
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
      background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png');
      background-size: cover;
    }

    .header h1 {
      color: white;
      margin: 0;
      font-family: 'Georgia', serif;
      font-size: 36px;
    }

    .content {
      background-color: #fff;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      font-size: 16px;
    }

    .cta-button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #5A9A3D;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
      transition: background-color 0.3s ease;
      font-family: 'Arial', sans-serif;
    }

    .cta-button:hover {
      background-color: #468a2b;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" class="cta-button">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your Farm Shop Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


export const WELCOME_EMAIL_TEMPLATE=
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Farm Shop</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }

    .header {
      background: linear-gradient(to right, #6DBE45, #4CAF50);
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
      color: white;
    }

    .header h1 {
      margin: 0;
      font-size: 36px;
    }

    .content {
      background-color: #fff;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      font-size: 16px;
    }

    .cta-button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
      transition: background-color 0.3s ease;
    }

    .cta-button:hover {
      background-color: #388E3C;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }

    .highlight {
      color: #5A9A3D;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome to Farm Shop!</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Thank you for joining Farm Shop, the ultimate online marketplace where farmers and buyers can connect directly! Whether you're looking to buy fresh, local produce or sell your farm goods, Farm Shop is here to help.</p>
    
    <p><span class="highlight">For Farmers:</span> You can now showcase and sell your farm products to a growing community of buyers. It's an easy and efficient way to reach more customers and grow your business. Start by listing your products today!</p>
    
    <p><span class="highlight">For Buyers:</span> Farm Shop offers a unique opportunity to shop for fresh, high-quality farm products directly from local farmers. From organic vegetables to handcrafted goods, you're supporting local farms while getting the best products.</p>

    <p>We're excited to have you here! To get started, explore our marketplace and start browsing or listing your products.</p>
    
    <p>If you need help, our team is always here to support you.</p>
    
    <a href="#" class="cta-button">Start Exploring Farm Shop</a>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`
