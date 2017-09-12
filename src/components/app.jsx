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
				console.log("timer not found here");
				return null;
			}
		}
	}

	switchActiveLoop(timer) {
		// returns new active timer and updated loop or null if no further timer found
		// TODO: switching loops takes 1 updateState run == 1sec. Modify it for an asynchronus loop reps countdown
		let activeTimer = {};

		let updateLoop = (loop) => {
			// return updated loop and new active timer

			if (loop.reps > 0) {
				// case 2: reduce loop reps, reset content to initial, set first timer in loop as active
				loop.reps -= 1;
				console.log("reset loop content");
				// TODO: reset loop content to initial
				// loop.content = loop.initial;

				activeTimer = this.findFirstTimer(loop.content);

				if (activeTimer == null) { console.error("you did not specify any timer!"); }

				return loop;
			} else {
				if (loop.parentLoop === "mainLoop") {
					// case 4: end of last timer - stop countdown
					return;
				}
				// case 3: reduce parent loop reps
				return updateLoop(loop.parentLoop);
			}
		}

		const loopToUpdate = updateLoop(timer.parentLoop);
		return [activeTimer, loopToUpdate];
		// return [activeTimer, updateLoop(timer.parentLoop)]; // why not working?

	}


	updateState() {
		console.log("setting state");
		// main function for updating state in timers and loops, switching timers and updating this.state
		let times = this.state.times;
		let activeTimer = this.state.activeTimer;

		console.log("activeTimer", activeTimer);

		function updateTime(timer) {
			if (timer.seconds < 1) {
				if (timer.minutes < 1) { return timer; } // in case there is switching loops
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

		if (activeTimer.minutes < 1 && activeTimer.seconds < 1) {
			// case 1: end of timer
			const parentLoop = activeTimer.parentLoop;
			let timerIndex = 0;
			let newActiveTimer = {};

			if (parentLoop === "mainLoop") {
				// set variables if timer is not inside loop or stop if it's last timer
				timerIndex = times.indexOf(activeTimer);

				if (timerIndex == times.length - 1) {
					// end of set - stop interval
					this.endTimer();
					return;
				}

				newActiveTimer = this.findFirstTimer(times, timerIndex + 1);
			} else {
				// set variables if timer is inside inner loop
				timerIndex = parentLoop.content.indexOf(activeTimer);
				newActiveTimer = this.findFirstTimer(parentLoop.content, timerIndex + 1);
			}

			if (newActiveTimer == null) {
				// case 1a: no next timer inside this loop
				console.log("switchActiveLoop");
				let loopToUpdate = {};

				//find and set next timer as active or stop countdown if no more timers in times
				[activeTimer, loopToUpdate] = this.switchActiveLoop(activeTimer);

				if (loopToUpdate == null) {
					this.endTimer();
					return;
				}

				activeTimer = updateTime(activeTimer);
				times.map(e => {
					return updateTimes(e, loopToUpdate)
				});
			} else {
				// case 1b: switch active timer to the next one inside this loop
				console.log("switchActiveTimer");
				activeTimer = newActiveTimer;

				activeTimer = updateTime(activeTimer);
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
		}

		this.setState({
			run: true,
			activeTimer
		});
	}

	handleStop = (event) => {
		event.preventDefault();
		this.setState({ run: false });
		clearInterval(this.timerInterval);
	}

	endTimer = () => {
		console.log("THE END");
		this.setState({ run: false })
		clearInterval(this.timerInterval);
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
