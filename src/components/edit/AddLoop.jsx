import React, { Component } from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';

const uuidv4 = require('uuid/v4');

class AddLoop extends Component {

	findLoop(e, id, reps) {
		if (e.type === "loop") {
			if (e.id === id) {

				const result = {
					type: "loop",
					id: uuidv4(),
					reps,
					content: []
				}
				e.content.push(result);
				return e;

			} else if (e.content.length > 0){
				return e.content.map(innerE => {
					return this.findLoop(innerE, id, reps);
				});
			} else {
				return e;
			}
		}
	}

	handleSubmit(event, id) {
		event.preventDefault();
		let times = this.props.times;
		const reps = event.target.elements.reps.value;

		if (id === "mainLoop") {
			times.push({
				type: "loop",
				id: uuidv4(),
				reps,
				content: []
			});
		} else {
			times.map(e => {
				return this.findLoop(e, id, reps);
			});
		}

		this.props.editTimes(times);
	}

	render() {
		return(
			<Form inline onSubmit={event => this.handleSubmit(event, this.props.id)}>
				<FormGroup>
					New loop [number of repetitions]
					<FormControl
						type="number"
						name="reps"
						defaultValue={2}
						bsClass="loop-reps"
					/>
					<FormControl
						type="submit"
						defaultValue="Add" />
				</FormGroup>
			</Form>
		)
	}
}

export default AddLoop;
