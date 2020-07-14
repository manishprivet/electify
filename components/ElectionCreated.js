import Countdown from './Countdown';
import IDButton from './IDButton';

export default ({ voterData }) => {
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
			<div className='terms c-flex'>
				<h3>Election Name:</h3>
				<div className='c-flex'>
					<span>{voterData.display_name}</span>
					<IDButton text={voterData.display_name} />
				</div>
			</div>
			<div className='terms c-flex'>
				<h3>Your unique Election ID:</h3>
				<div className='c-flex'>
					<span>{voterData.election_id}</span>
					<IDButton text={voterData.election_id} />
				</div>
			</div>
			<h2>Download the Voter Data</h2>
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

			<h3>
				This is the <span style={{ color: 'red', fontSize: '1.2em' }}>only time</span> you'll be seeing this
				list. So <span style={{ color: 'red', fontSize: '1.2em' }}>download it</span> at a safe location.
			</h3>
			<h3>
				Distribute Voter IDs and <span style={{ color: 'red', fontSize: '1.2em' }}>Secrets</span> among the
				voters <span style={{ color: 'red', fontSize: '1.2em' }}>seperately</span>, as each voter ID gets
				exactly <span style={{ color: 'red', fontSize: '1.2em' }}>one chance to vote</span>
			</h3>
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
			<div className='terms c-flex'>
				<h3>Link for voters:</h3>
				<div className='c-flex'>
					<span
						style={{
							display: 'block',
							overflowX: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap'
						}}
					>{`electify.manish.codes/vote/${voterData.election_id}`}</span>
					<IDButton long text={`https://electify.manish.codes/vote/${voterData.election_id}`} />
				</div>
			</div>
			<div className='terms c-flex'>
				<h3>Link for results:</h3>
				<div className='c-flex'>
					<span
						style={{
							display: 'block',
							overflowX: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap'
						}}
					>{`electify.manish.codes/results/${voterData.election_id}`}</span>
					<IDButton long text={`https://electify.manish.codes/results/${voterData.election_id}`} />
				</div>
			</div>
			<h2>Voters</h2>

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
			<h2 style={{ textAlign: 'center' }}>
				This will expire in: <br />
				<Countdown
					style={{ color: 'red', fontFamily: 'monospace', fontSize: '1.2em' }}
					epoch={voterData.expiration_time}
				/>
			</h2>
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
				.terms {
					width: 100%;
					flex-flow: row wrap;
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

				.terms div {
					flex-flow: row wrap;
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
