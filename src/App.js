import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [currentPrice, setCurrentPrice] = useState("");
	const [loading, setLoading] = useState(false);

	const [boughtPrice, setBoughtPrice] = useState("");
	const [quantity, setQuantity] = useState("");

	const [result, setResult] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		setLoading(true);
		fetch("https://mock-stock-api.herokuapp.com/getValue")
			.then((res) => {
				return res.json();
			})
			.then((resJson) => {
				setCurrentPrice(resJson);
				setLoading(false);
			});
	}, []);

	const check = () => {
		if (!boughtPrice) {
			setResult("");
			setError("Please enter Bought Price");
			return;
		}

		if (!quantity) {
			setResult("");
			setError("Please enter Quantity");
			return;
		}

		if (boughtPrice < currentPrice) {
			setError("");
			setResult(
				`You have a profit of ${
					(currentPrice - boughtPrice) * quantity
				}, that is ${Math.floor(
					100 * ((currentPrice - boughtPrice) / boughtPrice)
				)}% 🎉`
			);
		}
		if (boughtPrice > currentPrice) {
			setError("");
			setResult(
				`You have a loss of ${
					(-currentPrice + boughtPrice) * quantity
				}, that is ${Math.floor(
					100 * ((-currentPrice + boughtPrice) / boughtPrice)
				)}% 😵`
			);
		}
		if (boughtPrice === currentPrice) {
			setError("");
			setResult(`No pain, no gain and no gain, no pain`);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Profit or Loss</h1>
				<div className="input-container">
					<label className="input-label">
						Bought Price:
						<input
							required
							type="number"
							className="input"
							onChange={(e) => {
								setBoughtPrice(parseInt(e.target.value));
								setResult("");
								setError("");
							}}
						/>
					</label>
					<label className="input-label">
						Quantity:
						<input
							required
							type="number"
							className="input"
							onChange={(e) => {
								setQuantity(parseInt(e.target.value));
								setResult("");
								setError("");
							}}
						/>
					</label>
					<label className="input-label">
						Current Price:
						<input
							type="text"
							className="input"
							value={loading ? "Loading..." : currentPrice}
						/>
					</label>
				</div>
				<button className="button" onClick={() => check()}>
					Check!
				</button>
				<p
					className={
						boughtPrice < currentPrice
							? "green"
							: boughtPrice > currentPrice
							? "red"
							: "white"
					}
				>
					{result}
				</p>
				<p>{error}</p>
			</header>
		</div>
	);
}

export default App;
