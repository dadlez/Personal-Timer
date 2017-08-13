import React, { Component } from 'react';
import AddLoop from './AddLoop.jsx';
import AddTimer from './AddTimer.jsx';

// const uuidv1 = require('uuid/v1');

class NewElement extends Component {
	handleSubmit(event, type) {
		event.preventDefault();
		let result = {};

		if (type === "timer") {
			const min = event.target.elements.minutes.value;
			const sec = event.target.elements.seconds.value;
			result = {
				type: "timer",
				minutes: parseInt(min),
				seconds: parseInt(sec),
				active: this.props.times.length == 0 ? true : false
			}
		} else if (type === "loop") {
			const reps = event.target.elements.reps.value;

			result = {
				// loopID: uuidv1(),
				type: "loop",
				reps: parseInt(reps),

			}
		}

		this.props.editTimes(result);
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
