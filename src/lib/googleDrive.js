const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const TOKEN_PATH = path.join(__dirname, 'token.json');

const authenticate = () => {
	const auth = new google.auth.GoogleAuth({
		keyFile: path.join(__dirname, 'credentials.json'),
		scopes: SCOPES,
	});

	return auth;
};

const uploadFile = async (auth, filePath, fileName) => {
	const drive = google.drive({ version: 'v3', auth });
	const fileMetadata = {
		name: fileName,
		parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // Replace with your Google Drive folder ID
	};
	const media = {
		mimeType: 'image/jpeg',
		body: fs.createReadStream(filePath),
	};

	const response = await drive.files.create({
		resource: fileMetadata,
		media: media,
		fields: 'id',
	});

	return response.data.id;
};

module.exports = { authenticate, uploadFile };
