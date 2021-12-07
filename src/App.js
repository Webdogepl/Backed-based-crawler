import React from "react";
import "./App.css";
import { useState } from "react";
import Results from "./components/Results";
import XLSXdownloader from "./components/XLSXdownloader";
import axios from "axios";

function App() {
	const [url, setUrl] = useState("");
	const [data, setData] = useState("");

	function handleChange(e) {
		setUrl(e.target.value);
	}

	async function getResult(e) {
		e.preventDefault();

		const options = {
			method: "POST",
			url: "http://localhost:5000/",
			headers: { "Content-Type": "application/json" },
			data: { adress: url },
		};

		axios
			.request(options)
			.then(function (response) {
				setData(response);
			})
			.catch(function (error) {
				alert("Connection refused - check adress");
			});
	}

	return (
		<div className="App">
			<div className="crawler__container">
				<h1 className="crawler__container__title">Crawler</h1>
				<form className="crawler__container__form" method="get" action="/">
					<input
						type="text"
						name="urlInput"
						placeholder="https://adress.com"
						onChange={handleChange}
					/>
					<button onClick={(e) => getResult(e)}>Search</button>
					{data && <XLSXdownloader />}
				</form>

				<div className="crawler__container__results">
					{data && <Results data={data} url={url} />}
				</div>
			</div>
		</div>
	);
}

export default App;
