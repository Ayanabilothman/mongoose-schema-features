const generateActivationTemp = (activationLink) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Activation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #555555;
        }
        a.button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
        }
        a.button:hover {
            background-color: #0056b3;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            a.button {
                width: 100%;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Our Service!</h1>
        <p>Thank you for registering. Please activate your account by clicking the button below:</p>
        <a href="${activationLink}" class="button">Activate Account</a>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>Best regards,<br>Your Company Team</p>
    </div>
</body>
</html>`;

export default generateActivationTemp;
