/**
 * Google Apps Script for Hayot Yuli Education
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Ystv4eBqN1Be4hoKrq9ya6A1lHIUqqVsSdromGp4XH0/edit
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Execute as: "Me"
 * 7. Who has access: "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL
 * 10. Paste it in your .env file as VITE_GOOGLE_APPS_SCRIPT_URL
 */

function doPost(e) {
    try {
        // Get the active spreadsheet
        const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = spreadsheet.getSheetByName('Responses');

        // Create sheet if it doesn't exist
        if (!sheet) {
            sheet = spreadsheet.insertSheet('Responses');

            // Add headers
            const headers = [
                'Timestamp',
                'First Name',
                'Last Name',
                'Phone',
                'Region',
                'District',
                'School Number',
                'Father Name',
                'Father Phone',
                'Mother Name',
                'Mother Phone',
                'Q1: Current Education',
                'Q2: Certificates',
                'Q3: Desired Field',
                'Q4: Future Career',
                'Q5: Study Abroad',
                'Q6: Study in Russian',
                'English Level',
                'Russian Level',
                'Selected Subjects',
                'Score',
                'Total Questions',
                'Score Percentage',
                'Test Completed',
                'Test Answers'
            ];

            sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
            sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
            sheet.setFrozenRows(1);
        }

        // Parse the data
        const data = JSON.parse(e.postData.contents);

        // Prepare row data
        const rowData = [
            data.timestamp || new Date().toISOString(),
            data.first_name || '',
            data.last_name || '',
            data.phone || '',
            data.region || '',
            data.district || '',
            data.school_number || '',
            data.father_name || '',
            data.father_phone || '',
            data.mother_name || '',
            data.mother_phone || '',
            data.q1 || '',
            data.q2 || '',
            data.q3 || '',
            data.q4 || '',
            data.q5 || '',
            data.q6 || '',
            data.english_level || '',
            data.russian_level || '',
            data.selectedSubjects || '',
            data.score || 0,
            data.totalQuestions || 0,
            data.scorePercentage || 0,
            data.testCompleted ? 'Yes' : 'No',
            data.testAnswers || ''
        ];

        // Append the data
        sheet.appendRow(rowData);

        // Auto-resize columns for better readability
        sheet.autoResizeColumns(1, headers.length);

        // Return success response
        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            message: 'Data saved successfully'
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error response
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// Optional: Function to test the script
function testDoPost() {
    const testData = {
        postData: {
            contents: JSON.stringify({
                timestamp: new Date().toISOString(),
                first_name: 'Test',
                last_name: 'User',
                phone: '+998901234567',
                region: 'Tashkent',
                district: 'Chilonzor',
                school_number: '123',
                father_name: 'Test Father',
                father_phone: '+998901234568',
                mother_name: 'Test Mother',
                mother_phone: '+998901234569',
                q1: 'School',
                q2: 'No',
                q3: 'IT',
                q4: 'Software Engineer',
                q5: 'Yes',
                q6: 'Yes',
                english_level: 'good',
                russian_level: 'medium',
                selectedSubjects: 'russian, math, physics',
                score: 25,
                totalQuestions: 30,
                scorePercentage: 83,
                testCompleted: true,
                testAnswers: '{}'
            })
        }
    };

    const result = doPost(testData);
    Logger.log(result.getContent());
}
