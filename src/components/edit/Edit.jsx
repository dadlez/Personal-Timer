import React, { Component } from 'react';
import { Button } from 'react-bootstrap/lib';
import EditHeader from './EditHeader.jsx';
import EditFooter from './EditFooter.jsx';
import Tree from './../sets/Tree.jsx';
import AddLoop from './../edit/AddLoop.jsx';
import AddTimer from './../edit/AddTimer.jsx';

class Edit extends Component {
	render() {
		return (
			<div className="edit">
				<EditHeader />
				<Tree
					times={this.props.times}
					edit={true}
					editTimes={this.props.editTimes}
				/>
				<hr />
				<div className="addElement">
					<AddLoop
						id="mainLoop"
						times={this.props.times}
						editTimes={this.props.editTimes}
					/>
					<AddTimer
						id="mainLoop"
						times={this.props.times}
						editTimes={this.props.editTimes}
					/>
				</div>
				<hr />
				<button className="btn btn-primary" onClick={() => this.props.changeView("run")}>Run this set</button>
			</div>
		)
	}
}

export default Edit;
