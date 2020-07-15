export default ({ changeValue, action, ref, label, desc, id, placeholder }) => {
	return (
		<div ref={ref} className='input-div'>
			<label htmlFor={id}>{label}</label>
			{desc ? <p>{desc}</p> : null}
			<input
				onKeyPress={(e) => (e.charCode === 13 ? action() : null)}
				onChange={(e) => changeValue(e.target.value)}
				type='text'
				id={id}
				placeholder={placeholder}
			/>
			<span />
			<style jsx>{`
				.input-div {
					width: 100%;
				}

				.input-div input {
					position: relative;
					z-index: 5;
					background: var(--background-color);
					color: var(--text-color);
					width: 100%;
					border: none;
					border-bottom: 2px solid var(--text-color);
					font-size: 1.3em;
					padding: 10px;
					outline: none;
					margin: 10px 0;
					caret-color: var(--text-color);
					padding-left: 20px;
				}

				.input-div input:focus + span {
					width: 100%;
					transition: 0.2s ease-in-out;
				}

				.input-div input + span {
					content: "";
					position: relative;
					width: 0%;
					height: 0;
					border-bottom: 3px solid var(--button-color);
					z-index: 15;
					transform: translateY(-13px);
				}

				.input-div p {
					color: var(--highlight-color);
					font-size: 1.2em;
					justify-self: start;
					margin-right: auto;
					margin-left: 10px;
				}
				@media only screen and (max-width: 600px) {
					.input-div input {
						font-size: 1.2em;
					}
				}
			`}</style>
		</div>
	);
};
