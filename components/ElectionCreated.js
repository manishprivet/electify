export default ({ voterData }) => {
	function copy(text, id) {
		var input = document.createElement('input');
		input.setAttribute('value', text);
		document.body.appendChild(input);
		input.select();
		var result = document.execCommand('copy');
		document.body.removeChild(input);
		document.getElementById(id).style.setProperty('--text-content', '"Copied"');
		return result;
	}

	function exit(id) {
		setTimeout(() => document.getElementById(id).style.setProperty('--text-content', '"Click to Copy"'), 200);
	}
	function downloadObjectAsJson(exportObj, exportName) {
		var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
		var downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', dataStr);
		downloadAnchorNode.setAttribute('download', exportName + '.json');
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}

	function convertToCSV(objArray, fileTitle) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';
		str += 'election_id,' + fileTitle + '\r\n';
		for (var i = 0; i < array.length; i++) {
			var line = '';
			for (var index in array[i]) {
				if (line != '') line += ',';

				line += array[i][index];
			}

			str += line + '\r\n';
		}

		return str;
	}

	function exportCSVFile(headers, items, fileTitle) {
		if (headers) {
			items.unshift(headers);
		}

		// Convert Object to JSON
		var jsonObject = JSON.stringify(items);

		var csv = convertToCSV(jsonObject, fileTitle);

		var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

		var blob = new Blob([ csv ], { type: 'text/csv;charset=utf-8;' });
		if (navigator.msSaveBlob) {
			// IE 10+
			navigator.msSaveBlob(blob, exportedFilenmae);
		} else {
			var link = document.createElement('a');
			if (link.download !== undefined) {
				// feature detection
				// Browsers that support HTML5 download attribute
				var url = URL.createObjectURL(blob);
				link.setAttribute('href', url);
				link.setAttribute('download', exportedFilenmae);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	}

	return (
		<main className='container'>
			<h1>Election Created</h1>
			<div className='terms'>
				<h3>Election Name:</h3>
				<div>
					<span id='election-name'>{voterData.display_name}</span>
					<button
						id='copy-name-button'
						onMouseOut={() => exit('copy-name-button')}
						onClick={() => copy(voterData.display_name, 'copy-name-button')}
					>
						Copy
					</button>
				</div>
			</div>
			<div className='terms'>
				<h3>Your unique Election ID:</h3>
				<div>
					<span id='election-id'>{voterData.election_id}</span>
					<button
						id='copy-id-button'
						onMouseOut={() => exit('copy-id-button')}
						onClick={() => copy(voterData.election_id, 'copy-id-button')}
					>
						Copy
					</button>
				</div>
			</div>
			<h2>Candidates</h2>
			<table>
				<tbody>
					<tr>
						<th>Candidate Name</th>
						<th>Number of Votes</th>
					</tr>
					{voterData.candidates.map((candidate, index) => (
						<tr key={candidate.name + index}>
							<td>{candidate.name}</td>
							<td>{candidate.votes}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2>Voters</h2>
			<div className='downloads-container'>
				<button onClick={() => downloadObjectAsJson(voterData.voters, voterData.election_id)}>
					Download JSON
				</button>
				<button
					onClick={() =>
						exportCSVFile(
							{ voter_id: 'voter_id', voter_secret: 'voter_secret' },
							voterData.voters,
							voterData.election_id
						)}
				>
					Download CSV
				</button>
			</div>
			<table>
				<tbody>
					<tr>
						<th>Voter Id</th>
						<th>Voter Secret</th>
					</tr>
					{voterData.voters.map((voter) => (
						<tr key={voter.voter_id}>
							<td>{voter.voter_id}</td>
							<td>{voter.voter_secret}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='downloads-container'>
				<button onClick={() => downloadObjectAsJson(voterData.voters, voterData.election_id)}>
					Download JSON
				</button>
				<button
					onClick={() =>
						exportCSVFile(
							{ voter_id: 'voter_id', voter_secret: 'voter_secret' },
							voterData.voters,
							voterData.election_id
						)}
				>
					Download CSV
				</button>
			</div>
			<style jsx>{`
				.container {
					position: relative;
					height: 100%;
					width: 70%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-flow: column nowrap;
					margin: auto;
					color: var(--text-color);
					margin-top: 60px;
					margin-bottom: 40px;
				}

				.container h1 {
					text-align: center;
					font-size: 2.5em;
				}

				.terms {
					display: flex;
					width: 100%;
					flex-flow: row wrap;
					justify-content: center;
					align-items: center;
					font-size: 1.3em;
				}

				.terms h3 {
					color: var(--button-color);
					font-size: 1.4em;
					margin: 10px 0;
					margin-right: 20px;
				}

				.terms span {
					font-family: monospace;
					font-size: 1.4em;
					padding: 5px 15px;
					background: #d3d3d3;
					border-radius: 10px;
					color: black;
				}

				#copy-id-button {
					--text-content: "Click to copy";
				}

				#copy-name-button {
					--text-content: "Click to copy";
				}

				.terms button {
					position: relative;
					background: none;
					border: 1px solid var(--text-color);
					padding: 7px 25px;
					color: var(--text-color);
					font-size: 1em;
					margin: 0 15px;
					border-radius: 20px;
					outline: none;
				}

				.terms button:hover {
					cursor: pointer;
				}

				.terms button:hover::after {
					visibility: visible;
					opacity: 1;
					transform: translateY(-180%) translateX(-35%);
				}

				.terms button::after {
					content: var(--text-content);
					position: absolute;
					height: 100%;
					width: 100%;
					border: none;
					margin: 0;
					padding: 5px 15px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 0.8em;
					background: #000000df;
					border-radius: 10px;
					transform: translateY(-180%) translateX(-35%);
					visibility: hidden;
					opacity: 0;
					transition: all 0.2s ease-out;
					pointer-events: none;
				}

				table {
					background-color: #d3d3d34a;
					padding: 10px;
					border-radius: 20px;
					margin: 15px 0;
				}

				th,
				td {
					padding: 7px 15px 10px 15px;
					text-align: center;
					font-size: 1.2em;
				}

				td:first-child {
					border-right: 1px solid white;
				}

				.downloads-container {
					position: relative;
					display: flex;
					flex-flow: row wrap;
					justify-content: center;
					margin: 20px 0;
				}

				.downloads-container button {
					position: relative;
					background: none;
					padding: 15px 45px;
					border: 2px solid #b66dff;
					font-size: 1.3em;
					margin: 0 30px;
					border-radius: 20px;
					color: #b66dff;
					outline: none;
					cursor: pointer;
				}

				.downloads-container button:last-child {
					border: 2px solid #ff977e;
					color: #ff977e;
				}

				.downloads-container button:hover {
					color: var(--background-color);
					background: #b66dff;
				}

				.downloads-container button:last-child:hover {
					background: #ff977e;
				}

				@media only screen and (max-width: 900px) {
					.container {
						width: 90%;
					}
				}

				@media only screen and (max-width: 680px) {
					.downloads-container button {
						margin-top: 20px;
					}
				}

				@media only screen and (max-width: 450px) {
					.terms {
						font-size: 1.2em;
					}

					.terms h3 {
						margin: 20px 0;
					}
				}
			`}</style>
		</main>
	);
};
