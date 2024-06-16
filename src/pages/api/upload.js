import connectToDatabase from '../../lib/mongodb';
import Receipt from '../../models/Receipt';
import multer from 'multer';
import { createWorker } from 'tesseract.js';
import nextConnect from 'next-connect';
import { authenticate, uploadFile } from '../../lib/googleDrive';
import fs from 'fs';
import path from 'path';

const upload = multer({ dest: 'uploads/' });

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({ error: `Something went wrong! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
	await connectToDatabase();

	const worker = createWorker();
	await worker.load();
	await worker.loadLanguage('eng');
	await worker.initialize('eng');
	const {
		data: { text },
	} = await worker.recognize(req.file.path);
	await worker.terminate();

	const auth = authenticate();
	const fileId = await uploadFile(auth, req.file.path, req.file.originalname);

	fs.unlinkSync(req.file.path);

	const receipt = await Receipt.create({
		imageUrl: `https://drive.google.com/uc?id=${fileId}`,
		text,
		date: new Date(),
	});

	res.status(200).json({ success: true, data: receipt });
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false,
	},
};
