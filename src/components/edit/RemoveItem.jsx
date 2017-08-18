import React, { Component } from 'react';

class RemoveItem extends Component {

	findItem(e, id) {
		if (e.content.every(innerE => innerE.id != id)) {
			e.content.map(innerE => {
				if (innerE.type.includes("loop") && innerE.content.length > 0) {
					return this.findItem(innerE, id);
				} else {
					return innerE;
				}
			});
			return e;
		} else {
			e.content = e.content.filter(innerEE => innerEE.id != id);
			return e;
		}
	}

	handleRemove(event) {
		event.preventDefault();
		const id = this.props.id;
		let times = this.props.times;

		if (times.every(e => e.id != id)) {
			let result = times.map(e => {
				if (e.type === "loop") {
					return this.findItem(e, id)
				} else {
					return e;
				}
			});
			this.props.editTimes(result);
		} else {
			let result = times.filter(e => e.id != id);
			this.props.editTimes(result);
		}
	}

	render() {
		return (
			<button
				className="btn btn-sm btn-danger"
				onClick={event => this.handleRemove(event)}>
				x
			</button>
		)
	}
}

export default RemoveItem;
