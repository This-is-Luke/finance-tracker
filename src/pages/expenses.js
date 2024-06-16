import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

const Expenses = () => {
	return (
		<div>
			<h1>Manage Expenses</h1>
			<ExpenseForm />
			<ExpenseTable />
		</div>
	);
};

export default Expenses;
