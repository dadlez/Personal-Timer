import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Start from './start/Start.jsx';
import Edit from './edit/Edit.jsx';
import Run from './run/Run.jsx';
// import { Router, Rouet, hashHistory } from 'react-router';

require('./../scss/main.scss');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: "edit",
			times: [],
			run: false
		};
		this.timerInterval = 0;
	}

	editTimes = (newTimes) => {
		const times = this.state.times.slice();
		times.push(newTimes)

		this.setState({
			times: times
		})
	}

	changeTime() {

		this.state.times.forEach((e, i) => {
			if (e.active === true) {
				const times = this.state.times.slice();

				if (e.seconds == 0 && e.minutes == 0) {

					times[i].active = false;

					if (i + 1 < this.state.times.length) {
						times[i + 1].active = true;
					} else {
						clearInterval(this.timerInterval);
					}

				} else if (e.seconds < 1) {
					times[i].minutes -= 1;
					times[i].seconds = 59;

				} else {
					times[i].seconds -= 1;

				}
				this.setState(times);
			}
		});

	}

	startInterval() {
		this.timerInterval = setInterval(() => {
			this.changeTime();
		}, 1000);
	}

	handleStart = (event) => {
		event.preventDefault();
		this.setState({
			run: true
		});
	}

	handleStop = (event) => {
		event.preventDefault();
		this.setState({
			run: false
		});
	}

	changeView = (view) => {
		this.setState({view: view});
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

		return( <div>{this.renderView(this.state.view)}</div>)
		// if (this.state.view === "edit") {
		// 	return(
		// 		<Edit
		// 			times={this.state.times}
		// 			run={this.state.run}
		// 			editTimes={this.editTimes}
		// 			changeView={this.changeView}
		// 		/>
		// 	)
		// } else if (this.state.view === "run") {
		// 	return (
		// 		<Run
		// 			times={this.state.times}
		// 			run={this.state.run}
		// 			handleStart={this.handleStart}
		// 			handleStop={this.handleStop}
		// 			changeView={this.changeView}
		// 		/>
		// 	)
		// }
	}
}

document.addEventListener('DOMContentLoaded', function(){
	ReactDOM.render(
		<App />,
		document.getElementById('app')
	);
});
