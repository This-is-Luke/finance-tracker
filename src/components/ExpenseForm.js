import { useState } from 'react';
import axios from 'axios';

const ExpenseForm = () => {
	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState('');
	const [date, setDate] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await axios.post('/api/expenses', {
			amount,
			category,
			date,
			description,
		});

		if (res.status === 201) {
			console.log('Expense added');
			setAmount('');
			setCategory('');
			setDate('');
			setDescription('');
		} else {
			console.log('Error adding expense');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="number"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				placeholder="Amount"
				required
			/>
			<input
				type="text"
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				placeholder="Category"
				required
			/>
			<input
				type="date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				required
			/>
			<input
				type="text"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="Description"
				required
			/>
			<button type="submit">Add Expense</button>
		</form>
	);
};

export default ExpenseForm;
