import React from 'react';
import EditHeader from './EditHeader.jsx';
import EditFooter from './EditFooter.jsx';
import NewElement from './EditNewElement.jsx';
import Tree from './../sets/Tree.jsx';

class Edit extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<EditHeader />
				<Tree
					times={this.props.times}
					edit={true}
				/>
				<NewElement
					times={this.props.times}
					editTimes={this.props.editTimes}
				/>
				<button onClick={() => this.props.changeView("run")}>Run this set</button>
			</div>
		)
	}
}

export default Edit;
