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

	switchActive() {
		console.log("switch active");
		activeTimer = this.state.activeTimer;

		

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

		if (activeTimer.minutes === 0 && activeTimer.seconds === 0) {
			this.switchActive();
		} else {
			this.updateTime(activeTimer);
		}

		this.setState({
			times: times,
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
			const len = times.length

			function iterateLoop(itemsList) {
				for (let j = 0; j < itemsList.length; j++) {
					if (itemsList[j].type === "timer") {
						activeTimer = itemsList[j];
						i = len;
						j = itemsList.length;
					} else if (itemsList[j].content.length > 0) {
						iterateLoop(itemsList[j].content);
					}
				}
			}

			for (let i = 0; i < len; i++) {
				if (times[i].type === "timer") {
					activeTimer = times[i];
					i = len;
				} else if (times[i].content.length > 0){
					iterateLoop(times.content);
				}
			}
		}

		console.log(activeTimer);

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
