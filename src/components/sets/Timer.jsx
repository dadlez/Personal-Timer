import React from 'react';

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			minutes: this.props.minutes,
			seconds: this.props.seconds,
			edit: this.props.edit,
			active: false,
			run: this.props.run
		}
	}

	startInterval() {
		let timerInterval = setInterval(() => {
			console.log(this.state.seconds);
			if (this.state.seconds == 0 && this.state.minutes == 0) {
				clearInterval(this.timerInterval);
			} else if (this.state.seconds < 1) {
				this.setState({
					minutes: this.state.minutes - 1,
					seconds: 59,
				});
			} else {
				this.setState({
					seconds: this.state.seconds - 1
				});
			}

		}, 1000)
	}

	componentDidMount() {
		if (this.state.active === false) {
			clearInterval(this.timerInterval);
		} else {
			this.startInterval();
		}
	}

	render() {
		return(
			<li className="time">
				{this.state.minutes} : {this.state.seconds}
			</li>
		)
	}
}

export default Timer;
