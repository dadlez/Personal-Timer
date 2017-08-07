import React from 'react';

class Footer extends React.Component {
	render() {
		return (
			<footer className="controls container">
				<button className="stop">stop</button>
				<button className="start">start</button>
				<button className="pause">pause</button>
				<button className="return">return</button>
			</footer>
		)
	}
}

export default Footer;
