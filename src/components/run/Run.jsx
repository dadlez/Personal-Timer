import React, {Component} from 'react';
import { Button } from 'react-bootstrap/lib'
import Tree from './../sets/Tree.jsx';
import RunFooter from './RunFooter.jsx';

class Run extends Component {

	render() {
		return(
			<div>
				<Tree times={this.props.times} run={this.props.run} edit={false} />
				<hr />
				<RunFooter handleStart={this.props.handleStart} handleStop={this.props.handleStop} />
				<hr />
				<Button bsStyle="primary" block onClick={() => this.props.changeView("edit")}>Edit this set</Button>
			</div>
		)
	}
}

export default Run;
