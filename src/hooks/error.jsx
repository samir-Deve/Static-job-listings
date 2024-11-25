import "../styles/error.css"

function Error() {
	return (
		<div className="error-card">
			<span className="emoji">
				😕
			</span>
			<p className="para">
				Oh something went wrong !
			</p>
			<button className="btn">Reload the page</button>
		</div>
	);
}

export default Error;