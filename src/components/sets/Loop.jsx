import React, { Component }from 'react';
import AddLoop from './../edit/AddLoop.jsx';
import AddTimer from './../edit/AddTimer.jsx';

class Loop extends Component {
	render() {
		return (
			<ul>
				Loop - repeat {this.props.reps} times.
				{this.props.content}
				<AddLoop
					loopID={this.props.loopID}
					times={this.props.times}
					editTimes={this.props.editTimes}
				/>
				<AddTimer
					loopID={this.props.loopID}
					times={this.props.times}
					editTimes={this.props.editTimes}
				/>
			</ul>
		)
	}
}

export default Loop;
