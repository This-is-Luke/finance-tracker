import Link from 'next/link';

const Home = () => {
	return (
		<div>
			<h1>Finance Tracker</h1>
			<nav>
				<ul>
					<li>
						<Link href="/expenses">Expenses</Link>
					</li>
					<li>
						<Link href="/upload-receipt">Upload Receipt</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Home;
