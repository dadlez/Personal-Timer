import React from 'react';
import Timer from './Timer.jsx';

const uuidv1 = require('uuid/v1');

class Tree extends React.Component {
	render() {
		return(
			<ul className="tree">
				{this.props.times.map((e) => {
					return <Timer key={uuidv1()} minutes={e.minutes} seconds={e.seconds} edit={this.props.edit} />
				})}
			</ul>
		)
	}
}

export default Tree;
