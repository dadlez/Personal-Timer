import React, { Component } from 'react';
import Timer from './Timer.jsx';
import Loop from './../sets/Loop.jsx';

const uuidv1 = require('uuid/v1');

class Tree extends Component {

	renderLoop(obj, key) {
		const type = obj.type;

		if (type === "loop") {
			const reps = obj.reps;

			return(
				<div>
					<Loop
						reps={reps}
						renderLoop={this.renderLoop} 
					/>
				</div>
			)
		} else if (type === "timer") {
			return (
				<Timer
					minutes={obj.minutes}
					seconds={obj.seconds}
					edit={this.props.edit}
				/>
			)
		}
	}

	render() {
		return(
			<ul className="tree">
				{this.props.times.map(e => {
					const key = uuidv1();

					return (
						<li key={uuidv1()}>
							{
								this.renderLoop(e)
							}
						</li>
					)
				})}
			</ul>
		)
	}
}

export default Tree;
