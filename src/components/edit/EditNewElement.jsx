import React, { Component } from 'react';
import AddLoop from './AddLoop.jsx';
import AddTimer from './AddTimer.jsx';

const uuidv4 = require('uuid/v4');

class NewElement extends Component {
	handleSubmit(event, type) {
		event.preventDefault();

		let times = this.props.times;
		const min = event.target.elements.minutes.value;
		const sec = event.target.elements.seconds.value;

		times.push({
			type: "timer",
			minutes: parseInt(min),
			seconds: parseInt(sec),
			active: this.props.times.length == 0 ? true : false
		});

		this.props.editTimes(times);
	}

	render() {
		return (
			<div>
				<form onSubmit={event => this.handleSubmit(event, "timer")}>
					<label>
						New timer
						<input
							type="number"
							name="minutes"
							defaultValue={0}
						/>
						<input
							type="number"
							name="seconds"
							defaultValue={10}
						/>
						<input type="submit" defaultValue="Add"/>
					</label>
				</form>
				<AddLoop
					loopID="newLoop"
					times={this.props.times}
					editTimes={this.props.editTimes}
				/>
			</div>
		)
	}
}

export default NewElement;
