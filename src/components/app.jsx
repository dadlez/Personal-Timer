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

			// TODO: set stop condition if end of main loop

			if (loop.reps > 0) {
				loop.reps = loop.reps -= 1;
				// reset content state (reset timers and inner loops)
				// TODO: reset loop content to initial
				// loop.content = loop.initial;

				// return first timer in loop as active
				const newActiveTimer = this.findFirstTimer(loop.content);

				if (newActiveTimer == null) { console.error("you did not specify any timer!"); }

				console.log("loop to update", loop);
				console.log("active loop reps", loop.reps);
				console.log("newActiveTimer", newActiveTimer);
				return [newActiveTimer, loop];

			} else {
				if (loop.parentLoop === "mainLoop") {
					// stop timer if end of 'main' loop
					console.log("Congratulations! You did it!");
					this.handleStop();
				} else {
					return updateLoop(loop.parentLoop);
				}
			}
		}

		return updateLoop(timer.parentLoop);
	}

	updateTime(timer) {
		if (timer.seconds < 1) {
			timer.minutes -= 1;
			timer.seconds = 59;
		} else {
			timer.seconds -= 1;
		}
		return timer;
	}

	updateState(times) {
		let activeTimer = this.state.activeTimer;

		function updateTimes(e, itemToUpdate) {
			// function returns a new times object with changed only desired loop or timer
			if (e.id === itemToUpdate.id) {
				if (itemToUpdate.type === "timer") {
					// if timer - countdown and return
					return this.updateTime(itemToUpdate);
				} else {
					// if loop - return passed loop, as it has been updated before passing as argument
					return itemToUpdate;
				}
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
			const parentLoop = activeTimer.parentLoop;
			const timerIndex = parentLoop.content.indexOf(activeTimer);
			console.log("parentLoop", parentLoop);
			console.log("timerIndex", timerIndex);

			let newActiveTimer = this.findFirstTimer(parentLoop.content, timerIndex + 1);
			console.log("activeTimer", activeTimer);

			if (newActiveTimer == null) {
				console.log("switchActiveLoop");
				[activeTimer, loopToUpdate] = this.switchActiveLoop(activeTimer);

				times.map(e => {
					return updateTimes(e, loopToUpdate)
				});
			} else {
				activeTimer = newActiveTimer;

				times.map(e => {
					console.log("switchActiveTimer");
					return updateTimes(e, activeTimer);
				});
			}

			// } else {
			// 	console.log("switchActiveLoop");
			// 	[activeTimer, loopToUpdate] = this.switchActive(activeTimer);
			//
			// 	times.map(e => {
			// 		return updateTimes(e, loopToUpdate)
			// 	});

		} else {
			console.log("countdown");
			activeTimer = this.updateTime(activeTimer);
			times.map(e => {
				return updateTimes(e, activeTimer);
			});
		}

		this.setState({
			times,
			activeTimer
		});
	}

	startInterval() {
		this.timerInterval = setInterval(() => {
			this.updateState(this.state.times);
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
