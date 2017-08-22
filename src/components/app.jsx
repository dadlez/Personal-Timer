import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Start from './start/Start.jsx';
import Edit from './edit/Edit.jsx';
import Run from './run/Run.jsx';

require('./../scss/main.scss');

const uuidv4 = require('uuid/v4');

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			view: "edit",
			times: [],
			run: false,
			timers: [],
			loops: [],
			sequence: [],
			activeTimer: {},
			activeLoop: {}
		};
		this.timerInterval = 0;
	}

	editTimes = (newTimes) => {
		this.setState({ times: newTimes })
	}

	makeItemsList(times) {
		let sequence = [];

		function loopTimes(arr) {
			arr.forEach(e => {
				sequence.push(e);

				if (e.type === "loop") {
					if (e.content.length > 0) {
						loopTimes(e.content);
					}
				}
			});
		}

		loopTimes(times);

		return sequence;
	}

	updateTime(e) {
		let newActiveTimer = this.state.activeTimer;

		if (e.seconds === 0 && e.minutes === 0) {
			console.log("switch timer");
			// find next timer in state.sequence and set it as active
			this.state.sequence.forEach((e, i) => {
				console.log(i);
				if (e.id === this.state.activeTimer.id) {
					let j=i+1;
					let len = this.state.sequence.length;
					while (j < len) {
						if (this.state.sequence[j].type === "timer") {
							newActiveTimer = this.state.sequence[j];
							len = j;
							console.log("new activeTimer", newActiveTimer);
						}
						j++;
					}
				}
			});
		} else if (e.seconds < 1) {
			e.minutes -= 1;
			e.seconds = 59;
		} else {
			e.seconds -= 1;
		}
		console.log("updateTime", e);
		return [e, newActiveTimer];
	}

	// !!! bug
	// przepisać z dwóch list timers i loops na jedną listę sequence
	updateItem(e) {
		let newActiveTimer = this.state.activeTimer;
		let newActiveLoop = this.state.activeLoop;

		if (e.type === "loop") {
			if (e.id === this.state.activeLoop.id) {
				// reduce number of reps in active loop
				if (this.state.activeLoop.reps > 0) {
					e.reps -= 1;
					newActiveLoop = e;
				//set next loop as active
				} else {
					loops.forEach((loop, i) => {
						if (loop.id === this.state.activeLoop.id) {
						 	newActiveLoop = loops[i + 1];
							// this.setState({ activeLoop: loops[i + 1] })
						}
					});
				}
			} else if (e.content > 0) {
				e.content = e.content.map(innerE => {
					let newE = {};
					[ newE, newActiveTimer, newActiveLoop ] = this.updateItem(innerE);
					console.log("updated inner loop", newE);
					return newE;
				});
			}
		// handle timer update
		} else {
			if (e.id === this.state.activeTimer.id) {
				[ newE, newActiveTimer ] = this.updateTime(e);
				e = newE;
			}
		}
		return [e, newActiveTimer, newActiveLoop];
	}

	updateState(times) {
		let newActiveTimer = this.state.activeTimer;
		let newActiveLoop = this.state.activeLoop;


		console.log(newActiveTimer);
		console.log(newActiveLoop);

		times.map(e => {
			console.log("times element", e.type, e.id);

			if (e.type === "loop") {
				if (e.id === this.state.activeLoop.id) {
					console.log("loop active");
					// reduce number of reps in active loop
					if (this.state.activeLoop.reps > 0) {
						e.reps -= 1;
						newActiveLoop = e;

						// look through this loop content to update inner elements
						e.content = e.content.map(innerE => {
							let newE = {};
							[ newE, newActiveTimer, newActiveLoop ] = this.updateItem(innerE);
							console.log("updated inner loop", newE);
							return newE;
						});
					//set next loop as active
					} else {
						this.state.loops.forEach((loop, i) => {
							if (loop.id === this.state.activeLoop.id) {
								newActiveLoop = this.state.loops[i + 1];
							}
						});
					}
				} else if (e.content > 0) {
					e.content = e.content.map(innerE => {
						let newE = {};
						[ newE, newActiveTimer, newActiveLoop ] = this.updateItem(innerE);
						console.log("updated inner loop", newE);
						return newE;
					});
				}
			// handle timer update
			} else {
				if (e.id === this.state.activeTimer.id) {
					let newE = {};

					[ newE, newActiveTimer ] = this.updateTime(e);
					e = newE;
				}
			}
			return e;
		});
		let sequence = this.makeItemsList(times);

		this.setState({
			times: times,
			sequence: sequence,
			activeTimer: newActiveTimer,
			activeLoop: newActiveLoop
		});
	}

	startInterval() {
		this.timerInterval = setInterval(() => {
			this.updateState(this.state.times);
		}, 1000);
	}

	handleStart = (event) => {
		// set active elements in sequence and start timer
		console.log("start timer");

		event.preventDefault();

		function isEmpty(obj) {
			for (let x in obj) { return false; }
			return true;
		}

		let newActiveLoop = this.state.activeLoop;
		let newActiveTimer = this.state.activeTimer;

		let sequence = this.makeItemsList(this.state.times);

		if (isEmpty(this.state.activeTimer)) {

			console.log("active timer will update");
;
			if (this.state.times.length > 0) {

				console.log("sequence", this.state.sequence);
				console.log("sequence length", sequence.length);
				if (sequence.length > 0) {
					newActiveTimer = sequence[0];
				}
			}
		}

		this.setState({
			run: true,
			activeTimer: newActiveTimer,
			activeLoop: newActiveLoop,
			sequence: sequence
		});
	}

	handleStop = (event) => {
		event.preventDefault();
		this.setState({
			run: false
		});
	}

	changeView = (view) => {
		this.setState({ view });
	}


	renderView(view) {
		if (this.state.view === "edit") {
			return(
				<Edit
					times={this.state.times}
					run={this.state.run}
					editTimes={this.editTimes}
					changeView={this.changeView}
				/>
			)
		} else if (this.state.view === "run") {
			return (
				<Run
					times={this.state.times}
					run={this.state.run}
					handleStart={this.handleStart}
					handleStop={this.handleStop}
					changeView={this.changeView}
				/>
			)
		}
	}


	render() {
		if (this.state.run === false) {
			clearInterval(this.timerInterval);
			this.timerInterval = 0;
		} else if (this.timerInterval === 0){
			this.startInterval();
		}

		return(
			<div className="view">{this.renderView(this.state.view)}</div>
		)
	}
}

document.addEventListener('DOMContentLoaded', function(){
	ReactDOM.render(
		<App />,
		document.getElementById('app')
	);
});
