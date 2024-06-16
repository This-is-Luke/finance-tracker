import { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseTable = () => {
	const [expenses, setExpenses] = useState([]);

	useEffect(() => {
		const fetchExpenses = async () => {
			const res = await axios.get('/api/expenses');
			setExpenses(res.data.data);
		};

		fetchExpenses();
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th>Amount</th>
					<th>Category</th>
					<th>Date</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{expenses.map((expense) => (
					<tr key={expense._id}>
						<td>{expense.amount}</td>
						<td>{expense.category}</td>
						<td>{new Date(expense.date).toLocaleDateString()}</td>
						<td>{expense.description}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ExpenseTable;
