import React from "react";
import XLSX from "xlsx";

function handleDownload(e) {
	e.preventDefault();

	let date = new Date().toLocaleDateString();

	var workbook = XLSX.utils.table_to_book(
		document.getElementById("main-table")
	);
	XLSX.writeFile(workbook, `crawler-${date}.csv`);
}

function XLSXdownloader() {
	return <button onClick={handleDownload}>Download .csv</button>;
}

export default XLSXdownloader;
