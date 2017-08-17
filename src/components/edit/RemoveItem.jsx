import React, { Component } from 'react';

class RemoveItem extends Component {

	findItem(times, id) {
		if (times.every(e => e.id != id)) {
			times.map(e => {
				if (e.type === "loop" && e.content.length != 0) {
					this.findItem(e.content, id);
				} else {
					return e;
				}
			});
		} else {
			return times.filter(e => e.id != id);
		}

		return times;
	}

	handleRemove(event, id) {
		event.preventDefault();
		let times = this.props.times;

		if (times.every(e => e.id != id)) {
			times = times.map(e => this.findItem(e, id));
		} else {
			times = times.filter(e => e.id != id)
		}

		this.props.editTimes(times);
	}

	render() {
		return (
			<button
				className="btn btn-sm btn-danger"
				onClick={event => this.handleRemove(event, this.props.id)}>
				x
			</button>
		)
	}
}

export default RemoveItem;
