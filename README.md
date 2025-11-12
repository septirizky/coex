# Next.js WhatsApp Embedded Signup Demo

Minimal Next.js (App Router) app to launch **WhatsApp Embedded Signup** via the Facebook JavaScript SDK.

## 1) Configure Meta App
- Create Meta App and add **Facebook Login for Business**.
- In **Facebook Login for Business → Configurations**, create a configuration with **Login variation = WhatsApp Embedded Signup**. Copy the **Configuration ID**.
- In **Facebook Login for Business → Settings**:
  - Enable OAuth and **Login with the JavaScript SDK**.
  - Add your HTTPS domains (local tunnel/Vercel) to **Allowed Domains for the JavaScript SDK**.
  - Add any **Valid OAuth Redirect URIs** you use.
- Request required permissions for production: `whatsapp_business_management` and typically `business_management`.

## 2) Environment
Copy `.env.local.example` to `.env.local` and set:
```env
NEXT_PUBLIC_FB_APP_ID=123456789012345
NEXT_PUBLIC_FB_LOGIN_CONFIG_ID=abcdefg_hijklmnop # optional but recommended
WHATSAPP_VERIFY_TOKEN=super-secret-verify-token
```

## 3) Run locally
```bash
npm i
npm run dev # http://localhost:3000
```

Use an HTTPS tunnel (e.g., ngrok) if you test logins locally.

## 4) Deploy to Vercel
- Push this repo to GitHub and import in Vercel.
- Configure the three environment variables in Vercel.
- Ensure your Vercel domain is listed in **Allowed Domains for the JavaScript SDK** in App Dashboard.

## 5) Webhooks (optional)
- Set the **Callback URL** to `https://YOUR_DOMAIN/api/webhooks/whatsapp` and the **Verify Token** to `WHATSAPP_VERIFY_TOKEN`.
- After signup, subscribe your app to the customer's WABA via Graph API.
