import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap/lib'

class RunFooter extends Component {
	render() {
		return (
			<footer>
				<button className="btn btn-danger stop" onClick={this.props.handleStop}>stop</button>
				<button className="btn btn-success start" onClick={this.props.handleStart}>start</button>
				<button className="btn btn-warning pause">pause</button>
				<button className="btn btn-primary return">return</button>
			</footer>
		)
	}
}

export default RunFooter;
