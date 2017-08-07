import React from 'react';
import StartHeader from './StartHeader.jsx';
import StartFooter from './StartFooter.jsx';
import Sets from './Sets.jsx';

class Start extends React.Component {
	render() {
		return (
			<div>
				<StartHeader />
				<Sets />
				<StartFooter />
			</div>
		)
	}
}

export default Start;
