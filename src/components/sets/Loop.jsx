import React, { Component }from 'react';

class Loop extends Component {
	render() {
		return (
			<ul>
				Loop - repeat {this.props.reps} times.
			</ul>
		)
	}
}

export default Loop;
