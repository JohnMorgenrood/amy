# Setting Up the Contact Form

The contact form uses **Web3Forms** to send emails to `rubyroyal1@gmail.com`. This is much simpler than Resend and works perfectly with Gmail!

## Quick Setup (5 minutes):

### Step 1: Get Your Free Web3Forms Access Key

1. Go to **https://web3forms.com**
2. Enter `rubyroyal1@gmail.com` in the email field
3. Click "Get Access Key"
4. Check the Gmail inbox for `rubyroyal1@gmail.com`
5. Click the verification link in the email
6. Copy the **Access Key** shown on the page

### Step 2: Add the Key to Your Project

1. Open the `.env.local` file in the root of your project
2. Find the line: `NEXT_PUBLIC_WEB3FORMS_KEY=`
3. Paste your access key after the `=` sign
4. Save the file

Example:
```
NEXT_PUBLIC_WEB3FORMS_KEY=abc123-def456-ghi789
```

### Step 3: Restart Your Dev Server

If your development server is running:
1. Stop it (press Ctrl+C in the terminal)
2. Start it again: `npm run dev`

### Step 4: Test the Form

1. Go to your website's contact section
2. Fill out the form and submit
3. Check `rubyroyal1@gmail.com` for the email

## Why Web3Forms?

- ✅ **No domain verification needed** (unlike Resend)
- ✅ **Works with Gmail** (Resend has issues with this)
- ✅ **Completely free** up to 250 submissions/month
- ✅ **No backend code needed** (works client-side)
- ✅ **Built-in spam protection**
- ✅ **Instant delivery**

## For Vercel Deployment:

When you deploy to Vercel, add the environment variable:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add: `NEXT_PUBLIC_WEB3FORMS_KEY` with your access key
4. Redeploy the site

## Troubleshooting:

**Emails not arriving?**
- Check spam folder in Gmail
- Verify the access key is correct in `.env.local`
- Make sure you restarted the dev server after adding the key
- Test the key at https://web3forms.com/test

**Form showing error?**
- The form will fall back to showing an alert with Amy's email if Web3Forms fails
- Users can then email directly

## Need Help?

Web3Forms documentation: https://docs.web3forms.com
