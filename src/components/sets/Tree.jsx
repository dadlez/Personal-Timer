import React, { Component } from 'react';
import Timer from './Timer.jsx';
import Loop from './../sets/Loop.jsx';

const uuidv4 = require('uuid/v4');

class Tree extends Component {

	renderElement(e) {
		const type = e.type;

		if (type === "loop") {
			const reps = e.reps;

			if (e.content.length > 0) {
				e.content.forEach(innerE => this.renderElement(innerE));
			}

			return(
				<div>
					<Loop
						loopID={uuidv4()}
						reps={reps}
						times={this.props.times}
						editTimes={this.props.editTimes}
					/>
				</div>
			)
		} else if (type === "timer") {
			return (
				<Timer
					minutes={e.minutes}
					seconds={e.seconds}
					edit={this.props.edit}
				/>
			)
		}
	}

	render() {
		return(
			<ul className="tree">
				{this.props.times.map(e => {
					return (
						<li key={uuidv4()}>
							{this.renderElement(e)}
						</li>
					)
				})}
			</ul>
		)
	}
}

export default Tree;
