import React, { Component } from 'react';

class AddTimer extends Component {
	findLoop(e, loopID, min, sec) {
		if (e.type === "loop") {
			if (e.loopID === loopID) {

				const result = {
					type: "timer",
					minutes: min,
					seconds: sec,
					active: this.props.times.length == 0 ? true : false
				}
				e.content.push(result);
				return e;

			} else if (e.content.length > 0){
				return e.content.map(innerE => {
					return this.findLoop(innerE, loopID, min, sec);
				});
			} else {
				return e;
			}
		}
	}

	handleSubmit(event, loopID) {
		event.preventDefault();

		let times = this.props.times;
		const min = event.target.elements.minutes.valueAsNumber;
		const sec = event.target.elements.seconds.valueAsNumber;

		if (loopID === "mainLoop") {
			times.push({
				type: "timer",
				minutes: min,
				seconds: sec,
				active: this.props.times.length == 0 ? true : false
			});
		} else {
			times.map(e => {
				return this.findLoop(e, loopID, min, sec);
			});
		}

		this.props.editTimes(times);
	}

	render() {
		return(
			<form onSubmit={event => this.handleSubmit(event, this.props.loopID)}>
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
		)
	}
}

export default AddTimer;
