import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loop from './sets/Loop.jsx';

const uuidv4 = require('uuid/v4');

const times = [
	{
		type: "loop1",
		id: uuidv4(),
		reps: 1,
		content: [
			{
				type: "loop2",
				id: uuidv4(),
				reps: 1,
				content: [
					{
						type: "timer1"
					}
				]
			},
			{
				type: "timer1"
			},
			{
				type: "timer2"
			}
		]
	},
	{
		type: "timer3"
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

		let result = times.map(e => {
			if (e.type.includes("loop")) {
				return (
					<li key={uuidv4()}>
						<Loop
							id={e.id}
							reps={e.reps}
							times={times}
							editTimes={this.props.editTimes}
							content={e.content.length != 0 ? this.renderTest(e.content) : null}
						/>
					</li>
				);
			} else {
				return <li key={uuidv4()}>{e.type}</li>;
			}
		})

		return result;
	}

	render() {
		return (
			<ul>
				{this.renderTest(this.state.times).map(e => {
					return e;
				})}
			</ul>
		)
	}
}


export default Test;
