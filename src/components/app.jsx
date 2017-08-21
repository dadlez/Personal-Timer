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
			activeTimer: {},
			activeLoop: {},
			// activateNextTimer: false
		};
		this.timerInterval = 0;
	}

	editTimes = (newTimes) => {
		this.setState({ times: newTimes })
	}

	// findActiveID(timers) {
		// let result = [];
		// let times = this.state.times;
		//
		// timers.forEach((timer, i) => {
		// 	if (timer.active === true) {
		// 		if (i < timers.length - 1) {
		// 			result = [timer.id, timers[i + 1].id];
		//
		// 		} else {
		// 			result = [timer.id, false];
		// 		// 	result = [timer.id];
		// 		//
		// 		// 	let activeLoop = this.state.activeLoop;
		// 		//
		// 		// 	if (activeLoop.reps > 0) {
		// 		// 		result.push(activeLoop[0].id);
		// 		// 	} else {
		// 		// 		result.push(false);
		// 		// 	}
		// 		}
		// 	}
		// });
	//
	// 	return result;
	// }

	makeItemsList(times) {
		let timers = [];
		let loops = [];

		let iterateArray = (innerArray) => {
			innerArray.forEach(e => {
				if (e.type === "timer") {
					timers.push(e);
				} else {
					loops.push(e);
					if (e.content.length > 0) {
						iterateArray(e.content);
					}
				}
			});
		}

		times.forEach(e => {
			if (e.type === "timer") {
				timers.push(e);
			} else {
				loops.push(e);
				if (e.content.length > 0) {
					iterateArray(e.content);
				}
			}
		});
		console.log("makeItemsList");
		console.log("timers", timers);
		console.log("loops", loops);
		return [timers, loops];
	}

	// activateTimer(activeID) {
	// 	if (e.type === "loop" && e.content.length > 0) {
	// 		e.content = e.content.map(innerE => {
	// 			return this.activateTimer(innerE, activeID);
	// 		});
	// 	} else if (e.id === activeID[1]) {
	// 		e.active = true;
	// 		this.setState({activateNextTimer: false});
	// 	}
	// 	return e;
	// }

	// updateTime(e, activeID) {
	// 	if (e.type === "loop" && e.content.length > 0) {
	// 		e.content = e.content.map(innerE => {
	// 			this.setState({activeLoop: e});
	// 			return this.updateTime(innerE, activeID);
	// 		});
	// 	} else if (e.id === activeID[0]) {
	// 		if (e.seconds === 0 && e.minutes === 0) {
	// 			e.active = false;
	// 			this.setState({activateNextTimer: true});
	// 		} else if (e.seconds < 1) {
	// 			e.minutes -= 1;
	// 			e.seconds = 59;
	// 		} else {
	// 			e.seconds -= 1;
	// 		}
	// 	} else if (this.state.activateNextTimer === true && e.id === activeID[1]) {
	// 		e.active = true;
	// 		this.setState({activateNextTimer: false});
	// 	}
	// 	return e;
	// }

	updateTime(e, timers) {
		let newActiveTimer = this.state.activeTimer;

		if (e.seconds === 0 && e.minutes === 0) {
			console.log("switch timer");
			timers.forEach((e, i) => {
				if (e.id === newActiveTimer.id) {
					newActiveTimer = timers[i + 1];
				}
			})
		} else if (e.seconds < 1) {
			e.minutes -= 1;
			e.seconds = 59;
		} else {
			e.seconds -= 1;
		}
		return [e, newActiveTimer];
	}

	findItem(e, activeLoop, activeTimer, newActiveTimer, newActiveLoop, timers) {
		if (e.type === "loop") {
			if (e.id === activeLoop.id) {
				// reduce number of reps in active loop
				if (activeLoop.reps > 0) {
					e.reps -= 1;
					newActiveLoop = e;
				//set next loop as active
				} else {
					loops.forEach((loop, i) => {
						if (loop.id === activeLoop.id) {
							newActiveLoop = loops[i + 1];
							// this.setState({ activeLoop: loops[i + 1] })
						}
					});
				}
			} else if (e.content > 0) {
				newActiveTimer = this.findItem(innerE, activeLoop, activeTimer, newActiveTimer, newActiveLoop)[1];
				newActiveLoop = this.findItem(innerE, activeLoop, activeTimer, newActiveTimer, newActiveLoop)[2];

				e.content = e.content.map(innerE => this.findItem(innerE, activeLoop, activeTimer, newActiveTimer, newActiveLoop)[0]);
			}
		// handle timer update
		} else {
			if (e.id === activeTimer.id) {
				let { newE, newActiveTimer } = this.updateTime(e, timers);
				e = newE;
			}
		}
		return [e, newActiveTimer, newActiveLoop];
	}

	updateState(times) {
		const { timers, loops } = this.makeItemsList(this.state.times);
		const activeLoop = this.state.activeLoop;
		const activeTimer = this.state.activeTimer;
		let newActiveTimer = activeTimer;
		let newActiveLoop = activeLoop;


		times.map(e => {
			if (e.type === "loop") {

				if (e.id === activeLoop.id) {
					// reduce number of reps in active loop
					if (activeLoop.reps > 0) {
						e.reps -= 1;
						newActiveLoop = e;
					//set next loop as active
					} else {
						loops.forEach((loop, i) => {
							if (loop.id === activeLoop.id) {
								newActiveLoop = loops[i + 1];
								// this.setState({ activeLoop: loops[i + 1] })
							}
						});
					}
				} else if (e.content > 0) {
					newActiveTimer = this.findItem(innerE, activeLoop, activeTimer, newActiveTimer, newActiveLoop, timers)[1];
					newActiveLoop = this.findItem(innerE, activeLoop, activeTimer, newActiveTimer, newActiveLoop, timers)[2];

					e.content = e.content.map(innerE => this.findItem(innerE, activeLoop, activeTimer, newActiveTimer, newActiveLoop, timers)[0]);
				}
			// handle timer update
			} else {
				if (e.id === activeTimer.id) {
					let { newE, newActiveTimer } = this.updateTime(e, timers);
					e = newE;
				}
			}
			return e;
		});

		console.log(times);
		this.setState({
			times: times,
			activeTimer: newActiveTimer,
			activeLoop: newActiveLoop
		});
	}

	// updateState(times) {
	// 	let timers, loops  = this.makeItemsList(times);
	// 	// let activeID = this.findActiveID(timers); //get id's of timers to toggle active state [current timer ID, next timer ID]
	//
	// 	if (activeID.length < 1) {
	// 		this.setState({run: false});
	// 		clearInterval(this.timerInterval);
	// 	}
	//
	// 	let result = times.map(e => {
	// 		if (e.type === "loop" && e.content.length > 0) {
	// 			e.content = e.content.map(innerE => {
	// 				return this.findItem(innerE, activeID);
	// 			});
	// 		} else {
	// 			e = this.updateTime(e, activeID);
	// 		}
	// 		return e;
	// 	});
	//
	// 	console.log("activeLoop", this.state.activeLoop);
	//
	// 	this.editTimes(result);
	//
	// }

	startInterval() {
		this.timerInterval = setInterval(() => {
			this.updateState(this.state.times);
		}, 1000);
	}

	handleStart = (event) => {
		event.preventDefault();

		// let { activeTimer, activeLoop } = this.updateAtiveItems(this.state.times, this.makeItemsList, this.state.activeTimer, this.state.activeLoop);
		let newActiveLoop = this.state.activeLoop;
		let newActiveTimer = this.state.activeTimer;

		if (newActiveTimer.length != 0 || newActiveLoop.length != 0) {

			console.log("active items will update");

			if (this.state.times.length > 0) {
				const items = this.makeItemsList(this.state.times);
				console.log(items);
				const timers = items[0];
				const loops = items[1];

				if (loops.legth > 0) {
					newActiveLoop = loops[0];
				}

				if (timers.length > 0) {
					newActiveTimer = timers[0];
				}
			}
		}

		this.setState({
			run: true,
			activeTimer: newActiveTimer,
			activeLoop: newActiveLoop
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
