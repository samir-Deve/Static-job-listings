import "../styles/loading.css"

function Loading() {
	return (
		<div className="spinner">
			Loading...
			<div className="spinner-sector spinner-sector-blue"></div>
			<div className="spinner-sector spinner-sector-red"></div>
			<div className="spinner-sector spinner-sector-yellow"></div>
		</div>
	);
}

export default Loading;