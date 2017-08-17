import React, { Component } from 'react';
import AddLoop from './../edit/AddLoop.jsx';
import AddTimer from './../edit/AddTimer.jsx';
import RemoveItem from './../edit/RemoveItem.jsx';

class Loop extends Component {
	render() {
		return (
			<ul className="loop">
				Loop - repeat {this.props.reps} times.
				<RemoveItem
					id={this.props.id}
					times={this.props.times}
					editTimes={this.props.editTimes}
				/>
				{this.props.content}
				<div className="addElement">
					<AddLoop
						id={this.props.id}
						times={this.props.times}
						editTimes={this.props.editTimes}
					/>
					<AddTimer
						id={this.props.id}
						times={this.props.times}
						editTimes={this.props.editTimes}
					/>
				</div>
			</ul>
		)
	}
}

export default Loop;
