import "../styles/error.css"

function ErrorCom(props) {
	
	return (
		<div className="error-card">
			<span className="emoji">
				😕
			</span>
			<p className="para">
				{props.isError}
			</p>
			<button className="btn">Reload the page</button>
		</div>
	);
}

export default ErrorCom;