import React from 'react';
import EditHeader from './EditHeader.jsx';
import EditFooter from './EditFooter.jsx';
import Tree from './../sets/Tree.jsx';

class Edit extends React.Component {
	constructor(props){
		super(props);
	}

	handleSubmit(event) {
		event.preventDefault();

		const min = event.target.elements.minutes.value
		const sec = event.target.elements.seconds.value

		this.props.editTimes({
			minutes: parseInt(min),
			seconds: parseInt(sec),
			active: this.props.times.length == 0 ? true : false
		});
	}


	render() {
		return (
			<div>
				<EditHeader />
				<Tree
					times={this.props.times}
					edit={true}
				/>
				<form onSubmit={(event) => this.handleSubmit(event)}>
					<label>
						Add new timer
						<input
							type="number"
							name="minutes"
							defaultValue={0}
						/>
						<input
							type="number"
							name="seconds"
							defaultValue={10}
						/>
					</label>
					<input type="submit" defaultValue="Add"/>
				</form>
			</div>
		)
	}
}

export default Edit;
