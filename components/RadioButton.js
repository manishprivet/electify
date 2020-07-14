export default ({ id, array, setIndex, objectKey }) => {
	return (
		<ul className='radio-buttons' id={id}>
			{array.map((item, index) => (
				<li key={`item-${index}`}>
					<input
						onChange={(e) => setIndex(e.target.value)}
						type='radio'
						id={`${index}-option`}
						name='selector'
						value={index}
					/>
					<label htmlFor={`${index}-option`}>{typeof item === typeof {} ? item[objectKey] : item}</label>
					<div className='check'>{index === 0 ? <div className='inside' /> : null}</div>
				</li>
			))}
			<style jsx>{`
				.radio-buttons {
					list-style: none;
					margin: 0;
					padding: 0;
					overflow: auto;
					margin-top: 20px;
					width: 100%;
				}

				.radio-buttons li {
					color: #aaaaaa;
					display: block;
					position: relative;
					float: left;
					width: 100%;
					height: 75px;
					border-bottom: 1px solid #333;
				}

				.radio-buttons li input[type=radio] {
					position: absolute;
					visibility: hidden;
				}

				.radio-buttons li label {
					display: block;
					position: relative;
					font-weight: 300;
					font-size: 1.35em;
					padding: 12px 25px 12px 80px;
					margin: 10px auto;
					height: 30px;
					z-index: 9;
					cursor: pointer;
					-webkit-transition: all 0.2s linear;
				}

				.radio-buttons li:hover label {
					color: var(--button-color);
				}

				.radio-buttons li .check {
					display: block;
					position: absolute;
					border: 5px solid var(--highlight-color);
					border-radius: 100%;
					height: 25px;
					width: 25px;
					top: 18px;
					left: 20px;
					z-index: 5;
					transition: border .2s linear;
					-webkit-transition: border .2s linear;
				}

				.radio-buttons li:hover .check {
					border: 5px solid var(--button-color);
				}

				.radio-buttons li .check::before {
					display: block;
					position: absolute;
					content: '';
					border-radius: 100%;
					height: 15px;
					width: 15px;
					top: 5px;
					left: 5px;
					margin: auto;
					transition: background 0.2s linear;
					-webkit-transition: background 0.2s linear;
				}

				.radio-buttons input[type=radio]:checked ~ .check {
					border: 5px solid var(--button-color);
				}

				.radio-buttons input[type=radio]:checked ~ .check::before {
					background: var(--button-color);
				}

				.radio-buttons input[type=radio]:checked ~ label {
					color: var(--button-color);
				}
			`}</style>
		</ul>
	);
};
