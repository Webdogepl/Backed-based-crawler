import React, { useState } from "react";
import { useTable } from "react-table";

function ResultsTableData(tableData) {
	let data = [{ urls: "", emails: "", numbers: "" }];

	function Row(url, email, phoneNumber) {
		this.row = {
			urls: url,
			emails: email,
			numbers: phoneNumber,
		};
	}

	for (let i = 0; i < tableData.tableData.length; i++) {
		let newRow = new Row(
			tableData.tableData[i],
			tableData.emails[i],
			tableData.phoneNumbers[i]
		);

		data.push(newRow.row);
	}

	const columns = React.useMemo(
		() => [
			{
				Header: "Urls",
				accessor: "urls",
			},
			{
				Header: "Emails",
				accessor: "emails",
			},
			{
				Header: "Phone Numbers",
				accessor: "numbers",
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<table {...getTableProps()} id="main-table">
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>{column.render("Header")}</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default ResultsTableData;
