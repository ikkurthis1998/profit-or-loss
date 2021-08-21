import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [currentPrice, setCurrentPrice] = useState("");
	const [loading, setLoading] = useState(false);

	const [boughtPrice, setBoughtPrice] = useState("");
	const [quantity, setQuantity] = useState("");

	const [result, setResult] = useState("");
	const [error, setError] = useState("");

	const [sadTheme, setSadTheme] = useState(false);

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
			setSadTheme(false);
			setResult("");
			setError("Please enter Bought Price");
			return;
		}

		if (!quantity) {
			setSadTheme(false);
			setResult("");
			setError("Please enter Quantity");
			return;
		}

		if (boughtPrice < currentPrice) {
			setError("");
			setSadTheme(false);
			setResult(
				`You have a profit of ${
					(currentPrice - boughtPrice) * quantity
				}, that is ${(
					100 *
					((currentPrice - boughtPrice) / boughtPrice)
				).toFixed(2)}% 🎉`
			);
		}
		if (boughtPrice > currentPrice) {
			setError("");
			setResult(
				`You have a loss of ${
					(-currentPrice + boughtPrice) * quantity
				}, that is ${(
					100 *
					((-currentPrice + boughtPrice) / boughtPrice)
				).toFixed(2)}% 😵`
			);
			if (
				(100 * ((-currentPrice + boughtPrice) / boughtPrice)).toFixed(2) >= 50
			) {
				setSadTheme(true);
			}
		}
		if (boughtPrice === currentPrice) {
			setError("");
			setSadTheme(false);
			setResult(`No pain, no gain & no gain, no pain`);
		}
	};

	return (
		<div className="App">
			<header className={sadTheme ? "sad" : "App-header"}>
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
								setSadTheme(false);
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
								setSadTheme(false);
							}}
						/>
					</label>
					<label className="input-label">
						Current Price:
						<span className="price-notification">
							Price is updated every minute using an API.
						</span>
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
