import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap/lib'

class RunFooter extends Component {
	render() {
		return (
				<footer className="controls container">
					<ButtonToolbar>
						<Button bsStyle="danger" className="stop" onClick={this.props.handleStop}>stop</Button>
						<Button bsStyle="success" className="start" onClick={this.props.handleStart}>start</Button>
						<Button bsStyle="warning" className="pause">pause</Button>
						<Button bsStyle="primary" className="return">return</Button>
					</ButtonToolbar>
				</footer>
		)
	}
}

export default RunFooter;
