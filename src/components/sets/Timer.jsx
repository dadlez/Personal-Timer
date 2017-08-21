import React from 'react';
import RemoveItem from './../edit/RemoveItem.jsx';

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			minutes: this.props.minutes,
			seconds: this.props.seconds
		}
	}

	render() {
		return(
			<div className="time">
				{this.state.minutes} : {this.state.seconds}
				<RemoveItem
					id={this.props.id}
					times={this.props.times}
					editTimes={this.props.editTimes}
				/>
			</div>
		)
	}
}

export default Timer;
