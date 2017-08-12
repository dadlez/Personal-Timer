import React, {Component} from 'react';
import Tree from './../sets/Tree.jsx';
import RunFooter from './RunFooter.jsx';

class Run extends Component {

	render() {
		return(
			<div>
				<Tree times={this.props.times} run={this.props.run} edit={false} />
				<RunFooter handleStart={this.props.handleStart} handleStop={this.props.handleStop} />
				<button onClick={() => this.props.changeView("edit")}>Edit this set</button>
			</div>
		)
	}
}

export default Run;