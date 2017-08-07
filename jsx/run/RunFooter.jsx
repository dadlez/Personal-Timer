import React from 'react';

class RunFooter extends React.Component {
	render() {
		return (
			<footer className="controls container">
				<button className="stop" onClick={this.props.handleStop}>stop</button>
				<button className="start" onClick={this.props.handleStart}>start</button>
				<button className="pause">pause</button>
				<button className="return">return</button>
			</footer>
		)
	}
}

export default RunFooter;
