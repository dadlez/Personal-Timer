import React, {Component} from 'react';
import { Button } from 'react-bootstrap/lib'
import Tree from './../sets/Tree.jsx';
import RunFooter from './RunFooter.jsx';

class Run extends Component {

	render() {
		return(
			<div className="run">
				<Tree
					times={this.props.times}
					run={this.props.run}
					edit={false}
				/>
				<hr />
				<RunFooter
					handleStart={this.props.handleStart}
					handleStop={this.props.handleStop}
				/>
				<hr />
				<button
					className="btn btn-primary"
					onClick={() => this.props.changeView("edit")}>Edit this set</button>
			</div>
		)
	}
}

export default Run;
