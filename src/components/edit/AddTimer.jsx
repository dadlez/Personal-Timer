import React, { Component } from 'react';
import { Form, InputGroup, FormGroup, FormControl } from 'react-bootstrap/lib';

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
			<Form className="timer" inline onSubmit={event => this.handleSubmit(event, this.props.loopID)}>
				<FormGroup>
					New timer [mm]:[ss]
					<InputGroup>
						<FormControl
							type="number"
							name="minutes"
							defaultValue={0}
							bsClass="timer-minutes"
						/>
						 :
						<FormControl
							type="number"
							name="seconds"
							defaultValue={10}
							bsClass="timer-seconds"
						/>
					</InputGroup>
					<FormControl
						type="submit"
						defaultValue="Add"/>
				</FormGroup>
			</Form>
		)
	}
}

export default AddTimer;
