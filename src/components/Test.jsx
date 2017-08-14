import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const uuidv1 = require('uuid/v1');

const times = [
	{
		type: "loop",
		loopID: uuidv1(),
		reps: 1,
		content: [
			{
				type: "loop",
				loopID: uuidv1(),
				reps: 1,
				content: [

				]
			},
			{
				type: "timer"
			},
			{
				type: "timer"
			}
		]
	},
	{
		type: "timer"
	}
]

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			times: times
		}
	}

	renderTest(times) {
		times.map(e => {
			if (e.type === "loop") {
				this.renderTest(e.content);
				console.log("loop");
			} else {
				console.log("timer");
			}
		})
	}

	render() {
		return (
			<div>
				{this.renderTest(this.state.times)}
			</div>
		)
	}
}


export default Test;
