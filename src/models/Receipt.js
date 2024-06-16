import mongoose from 'mongoose';

const ReceiptSchema = new mongoose.Schema({
	imageUrl: String,
	text: String,
	date: Date,
});

export default mongoose.models.Receipt ||
	mongoose.model('Receipt', ReceiptSchema);
