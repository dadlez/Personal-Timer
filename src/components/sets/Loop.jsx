import React, { Component }from 'react';
import AddLoop from './../edit/AddLoop.jsx';

class Loop extends Component {
	render() {
		return (
			<ul>
				Loop - repeat {this.props.reps} times.
				<AddLoop
					loopID={this.props.loopID}
					times={this.props.times}
					editTimes={this.props.editTimes}
				/>
			</ul>
		)
	}
}

export default Loop;
