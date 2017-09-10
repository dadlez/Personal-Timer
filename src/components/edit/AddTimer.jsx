import React, { Component } from 'react';
import { Form, InputGroup, FormGroup, FormControl } from 'react-bootstrap/lib';

const uuidv4 = require('uuid/v4');

class AddTimer extends Component {
	findLoop(e, id, min, sec) {
		if (e.type === "loop") {
			if (e.id === id) {

				const result = {
					id: uuidv4(),
					type: "timer",
					minutes: min,
					seconds: sec,
					active: this.props.times.length == 0 ? true : false,
					parentLoop: e
				}
				e.content.push(result);
				return e;

			} else if (e.content.length > 0){
				return e.content.map(innerE => {
					return this.findLoop(innerE, id, min, sec);
				});
			} else {
				return e;
			}
		}
	}

	handleSubmit(event, id) {
		event.preventDefault();

		let times = this.props.times;
		const min = event.target.elements.minutes.valueAsNumber;
		const sec = event.target.elements.seconds.valueAsNumber;

		if (id === "mainLoop") {
			times.push({
				id: uuidv4(),
				type: "timer",
				minutes: min,
				seconds: sec,
				active: this.props.times.length == 0 ? true : false,
				parentLoop: "mainLoop"
			});
		} else {
			times.map(e => {
				return this.findLoop(e, id, min, sec);
			});
		}

		this.props.editTimes(times);
	}

	render() {
		return(
			<Form className="timer" inline onSubmit={event => this.handleSubmit(event, this.props.id)}>
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
							defaultValue={3}
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
