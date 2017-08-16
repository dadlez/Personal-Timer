import React, { Component } from 'react';
import EditHeader from './EditHeader.jsx';
import EditFooter from './EditFooter.jsx';
import Tree from './../sets/Tree.jsx';
import AddLoop from './../edit/AddLoop.jsx';
import AddTimer from './../edit/AddTimer.jsx';

class Edit extends Component {
	render() {
		return (
			<div>
				<EditHeader />
				<Tree
					times={this.props.times}
					edit={true}
					editTimes={this.props.editTimes}
				/>
				<AddLoop
					loopID="mainLoop"
					times={this.props.times}
					editTimes={this.props.editTimes}
				/>
				<AddTimer
					loopID="mainLoop"
					times={this.props.times}
					editTimes={this.props.editTimes}
				/>
				<button onClick={() => this.props.changeView("run")}>Run this set</button>
			</div>
		)
	}
}

export default Edit;
