import React, { Component } from 'react';

const uuidv4 = require('uuid/v4');

class AddLoop extends Component {

// sprawdzić czy zwracane do times są prawidłowe obiekty we wszystkich componentach

	findLoop(e, loopID, reps) {

		if (e.type === "loop") {
			if (e.loopID === loopID) {
				console.log("pushed result");

				const result = {
					type: "loop",
					loopID: uuidv4(),
					reps,
					content: []
				}
				e.content.push(result);
				return e;

			} else if (e.content.length > 0){
				console.log("going through inner loop");
				e.content.forEach(innerE => this.findLoop(innerE));
			} else {
				return e;
			}
		}
	}

	handleSubmit(event, loopID) {
		event.preventDefault();
		let times = this.props.times;
		const reps = event.target.elements.reps;

		if (loopID === "newLoop") {
			loopID = uuidv4();

			const result = {
				type: "loop",
				loopID,
				reps,
				content: []
			}

			console.log(times);
			times.push(result);
			console.log(times);
		} else {
			console.log("wewnętrzna pętla");
			// times.map(e => {
				// return this.findLoop(e, loopID, reps);
			// });
		}

		this.props.editTimes(times);
	}

	render() {
		return(
			<form onSubmit={event => this.handleSubmit(event, this.props.loopID)}>
				<label>
					New loop
					<input
						type="number"
						name="reps"
						defaultValue={2}
					/>
					<input type="submit" defaultValue="Add" />
				</label>
			</form>
		)
	}
}

export default AddLoop;
