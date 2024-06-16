import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
	amount: Number,
	category: String,
	date: Date,
	description: String,
});

export default mongoose.models.Expense ||
	mongoose.model('Expense', ExpenseSchema);
