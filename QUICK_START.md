# Quick Start Guide 🚀

## Step 1: Fix PowerShell (One-time setup)

**Run PowerShell as Administrator:**
1. Press `Win + X`
2. Select "Windows PowerShell (Admin)" or "Terminal (Admin)"
3. Run this command:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
4. Type `Y` and press Enter to confirm

## Step 2: Start the Development Server

Open a terminal in the project folder and run:
```bash
npm run dev
```

The app will be available at: http://localhost:5173

## Step 3: Test the New Features

### ✨ Language Switcher
- Look for **UZ** and **RU** buttons in the top navigation
- Click to switch between Uzbek and Russian
- All text updates immediately

### 👨‍👩‍👦 Parent Information Section
Scroll down on the registration form to find:
- **Ota-Ona ma'lumotlari** (in Uzbek)
- **Информация о родителях** (in Russian)

This section includes:
- Father's name and phone
- Mother's name and phone

### 📊 Google Sheets Setup (To Save Form Data)

#### A. Deploy the Script
1. Open: https://docs.google.com/spreadsheets/d/1Ystv4eBqN1Be4hoKrq9ya6A1lHIUqqVsSdromGp4XH0/edit
2. Click **Extensions** → **Apps Script**
3. Delete any existing code
4. Copy all content from `google-apps-script.js`
5. Paste into the editor
6. Click **💾 Save**
7. Click **Deploy** → **New deployment**
8. Click ⚙️ → Select **Web app**
9. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
10. Click **Deploy**
11. Click **Authorize access** and follow prompts
12. **Copy the Web App URL**

#### B. Configure the App
1. Create a file named `.env` in the project root (same folder as `package.json`)
2. Add this line (replace with your URL):
```
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```
3. Save the file
4. **Restart the dev server** (Ctrl+C, then `npm run dev` again)

#### C. Test It
1. Fill out the registration form
2. Select 3 subjects
3. Complete the test
4. Check your Google Sheet - new "Responses" tab with the data!

## 🎯 What's New?

| Feature | Description |
|---------|-------------|
| 🌐 **Russian Language** | Full Russian translation with easy toggle (UZ/RU) |
| 👪 **Parent Info** | New section for father and mother contact details |
| 📝 **Google Sheets** | All form submissions automatically saved to your spreadsheet |

## 📁 Important Files

- `IMPLEMENTATION_SUMMARY.md` - Detailed technical summary
- `GOOGLE_SHEETS_SETUP.md` - Complete Google Sheets setup guide
- `google-apps-script.js` - Script to paste in Google Apps Script
- `.env.example` - Example environment variables

## 🆘 Common Issues

**"npm is not recognized"**
- Install Node.js from https://nodejs.org

**PowerShell script error**
- Run PowerShell as Admin
- Execute the Set-ExecutionPolicy command above

**Data not saving to Google Sheets**
- Check that `.env` file exists (not `.env.example`)
- Verify the URL is correct
- Restart dev server after creating `.env`
- Check browser console (F12) for errors

**Language not switching**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh the page (Ctrl+Shift+R)

## 💡 Pro Tips

1. The `.env` file is already gitignored - your keys are safe
2. The Google Apps Script creates its own "Responses" sheet
3. Parent information fields are optional (not required)
4. Language preference resets on page refresh (by design)

---

**Need more help?** See `IMPLEMENTATION_SUMMARY.md` for full details!
