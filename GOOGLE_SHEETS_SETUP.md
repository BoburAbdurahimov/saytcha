# Google Sheets Integration Setup Guide

This guide will help you set up the Google Sheets integration to automatically save all form submissions from your Hayot Yuli Education application.

## Prerequisites

- Access to the Google Sheets document: `https://docs.google.com/spreadsheets/d/1Ystv4eBqN1Be4hoKrq9ya6A1lHIUqqVsSdromGp4XH0/edit?gid=0#gid=0`
- Google account with edit permissions to the above spreadsheet

## Step-by-Step Setup

### 1. Open Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Ystv4eBqN1Be4hoKrq9ya6A1lHIUqqVsSdromGp4XH0/edit
2. Click on `Extensions` in the menu
3. Select `Apps Script`

### 2. Add the Script

1. If there's any existing code in the editor, delete it
2. Copy the entire content from `google-apps-script.js` file in this project
3. Paste it into the Apps Script editor
4. Click the save icon (💾) or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
5. Give your project a name (e.g., "Hayot Yuli Data Collector")

### 3. Deploy as Web App

1. Click the `Deploy` button in the top right
2. Select `New deployment`
3. Click the gear icon (⚙️) next to "Select type"
4. Choose `Web app`
5. Fill in the deployment details:
   - **Description**: "Hayot Yuli Education Form Submission Handler" (or any description)
   - **Execute as**: Select `Me (your email)`
   - **Who has access**: Select `Anyone`
6. Click `Deploy`
7. You may need to authorize the script:
   - Click `Authorize access`
   - Select your Google account
   - Click `Advanced` if you see a warning
   - Click `Go to [Project Name] (unsafe)`
   - Click `Allow`

### 4. Copy the Web App URL

1. After deployment, you'll see a "Web app" URL
2. Copy this entire URL (it should look like: `https://script.google.com/macros/s/...../exec`)

### 5. Configure Your Application

1. Open the `.env` file in your project root (or create it if it doesn't exist)
2. Add or update the following line:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=your_copied_url_here
   ```
   Replace `your_copied_url_here` with the URL you copied in step 4

3. Save the `.env` file

### 6. Test the Integration

1. Restart your development server if it's running:
   ```bash
   npm run dev
   ```

2. Fill out the registration form completely
3. Complete the subject selection
4. Complete the test
5. Check your Google Sheet - you should see a new "Responses" tab with the submitted data

## Data Structure

The script will automatically create a "Responses" sheet with the following columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the form was submitted |
| First Name | Student's first name |
| Last Name | Student's last name |
| Phone | Student's phone number |
| Region | Student's region/province |
| District | Student's district |
| School Number | School/Lyceum/College number |
| Father Name | Father's name |
| Father Phone | Father's phone number |
| Mother Name | Mother's name |
| Mother Phone | Mother's phone number |
| Q1-Q6 | Answers to the survey questions |
| English Level | English language proficiency |
| Russian Level | Russian language proficiency |
| Selected Subjects | Subjects chosen for the test |
| Score | Test score (correct answers) |
| Total Questions | Total number of questions |
| Score Percentage | Score as a percentage |
| Test Completed | Whether the test was completed |
| Test Answers | JSON data of all test answers |

## Troubleshooting

### The data is not appearing in Google Sheets

1. Check that the `.env` file has the correct URL
2. Make sure you restarted the development server after updating `.env`
3. Check the browser console for any errors
4. Verify that the Web App deployment has "Who has access" set to "Anyone"

### Authorization issues

1. Make sure you authorized the script during deployment
2. Try deploying again and carefully follow the authorization steps
3. Make sure you're using the Google account that has access to the spreadsheet

### Script errors

1. Open the Apps Script editor
2. Check the execution log (View > Logs or click the clock icon)
3. You can also test the script manually by running the `testDoPost()` function

## Security Note

The Web App is set to "Anyone" access because the application sends data via POST request. The actual Google Sheet permissions remain unchanged - only people you've shared the sheet with can view the data.

## Need Help?

If you encounter any issues:
1. Check the browser console for errors (F12 in most browsers)
2. Check the Apps Script execution log
3. Make sure all fields in the form are filled correctly
4. Verify the spreadsheet ID in the URL is correct
