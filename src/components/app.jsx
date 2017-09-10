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
			activeTimer: {}
		};
		this.timerInterval = 0;
	}

	editTimes = (newTimes) => {
		this.setState({ times: newTimes });
	}


	findFirstTimer(items, startIndex = 0) {
		// TODO: set seperate iteration for main loop

		const len = items.length;

		for (let i=startIndex; i<len; i++) {
			if (items[i].type === "timer") {
				console.log("found first timer", items[i]);
				return items[i];
			} else if (items[i].content.length > 0){
				return this.findFirstTimer(items[i].content);
			} else {
				return null;
			}
		}
	}

	switchActiveLoop(timer) {
		function updateLoop(loop) {
			// return updated loop and new active timer

			// TODO: set stop countdown condition if end of main loop

			if (loop.reps > 0) {
				// case 2: reduce loop reps, reset content to initial, set first timer in loop as active
				loop.reps = loop.reps -= 1
				// TODO: reset loop content to initial
				// loop.content = loop.initial;

				const newActiveTimer = this.findFirstTimer(loop.content);

				if (newActiveTimer == null) { console.error("you did not specify any timer!"); }

				console.log("loop to update", loop);
				console.log("active loop reps", loop.reps);
				console.log("newActiveTimer", newActiveTimer);
				return [newActiveTimer, loop];

			} else {
				// case 3: reduce parent loop reps
				return updateLoop(loop.parentLoop);
			}
		}

		return updateLoop(timer.parentLoop);
	}


	updateState() {
		// main function for updating state in timers and loops, switching timers and updating this.state
		let times = this.state.times;
		let activeTimer = this.state.activeTimer;

		function updateTime(timer) {
			if (timer.seconds < 1) {
				timer.minutes -= 1;
				timer.seconds = 59;
			} else {
				timer.seconds -= 1;
			}
			return timer;
		}

		function updateTimes(e, itemToUpdate) {
			// function returns a new times object with changed only desired loop or timer to passed element
			if (e.id === itemToUpdate.id) {
				return itemToUpdate;
			} else if (e.type === "loop") {
				// if element id does not match desired item.id, return not changed element
				if (e.content.length > 0) {
					return e.content.map(innerE => {
						return updateTimes(e.content, itemToUpdate);
					});
				} else {
					return e;
				}
			} else {
				return e;
			}
		}

		if (activeTimer.minutes === 0 && activeTimer.seconds === 0) {
			// case 1: end of timer
			const parentLoop = activeTimer.parentLoop;
			let timerIndex = 0;
			let newActiveTimer = {};

			if (parentLoop === "mainLoop") {
				// set variables if timer is not inside loop
				timerIndex = times.indexOf(activeTimer);

				if (timerIndex == times.length - 1) {
					// end of set - stop interval
					console.log("END");
					this.setState({ run: false });
					return;
				}

				newActiveTimer = this.findFirstTimer(times, timerIndex + 1);
			} else {
				// set variables if timer is inside inner loop
				timerIndex = parentLoop.content.indexOf(activeTimer);
				newActiveTimer = this.findFirstTimer(parentLoop.content, timerIndex + 1);
			}

			console.log("parentLoop", parentLoop);
			console.log("timerIndex", timerIndex);
			console.log("activeTimer", newActiveTimer);

			if (newActiveTimer == null) {
				// case 1a: no next timer inside this loop
				console.log("switchActiveLoop");
				[activeTimer, loopToUpdate] = this.switchActiveLoop(activeTimer);

				times.map(e => {
					return updateTimes(e, loopToUpdate)
				});
			} else {
				// case 1b: switch active timer to the next one inside this loop
				console.log("switchActiveTimer");

				// if (timerIndex == times.length - 1) {
				// 	// end of set - stop interval
				// 	console.log("END");
				// 	this.setState({ run: false });
				// 	return;
				// }

				activeTimer = newActiveTimer;

				times.map(e => {
					return updateTimes(e, activeTimer);
				});
			}
		} else {
			// case 2: only countdown timer, no switching
			console.log("countdown");
			activeTimer = updateTime(activeTimer);
			times.map(e => {
				return updateTimes(e, activeTimer);
			});
		}

		this.setState({
			times: times,
			activeTimer: activeTimer
		});
	}

	startInterval() {
		this.timerInterval = setInterval(() => {
			this.updateState();
		}, 1000);
	}

	handleStart = (event) => {
		// set active timer if not set and start countdown
		event.preventDefault();

		function isEmpty(obj) {
			for (let x in obj) { return false; }
			return true;
		}

		let activeTimer = this.state.activeTimer;

		if (isEmpty(activeTimer)) {
			//set new active timer
			console.log("active timer empty, will be set to default");

			const times = this.state.times;
			activeTimer = this.findFirstTimer(times);

			if (activeTimer == null) { console.error("no timer set!"); }
			// function iterateLoop(itemsList) {
			// 	for (let j = 0; j < itemsList.length; j++) {
			// 		if (itemsList[j].type === "timer") {
			// 			activeTimer = itemsList[j];
			// 			i = len;
			// 			j = itemsList.length;
			// 		} else if (itemsList[j].content.length > 0) {
			// 			iterateLoop(itemsList[j].content);
			// 		}
			// 	}
			// }
		}

		this.setState({
			run: true,
			activeTimer
		});
	}

	handleStop = (event) => {
		event.preventDefault();
		this.setState({ run: false });
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
