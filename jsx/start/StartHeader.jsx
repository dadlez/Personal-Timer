import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<header className="container">
				<div className="logo">
					<img src='http://phocusapp.com/img/icon-timer.png' alt="timer logo" />
				</div>
				<div className="viewTitle">
					<p>tytuł widoku</p>
				</div>
				<div className="hamburger">
					menu
				</div>
			</header>
		)
	}
}

export default Header;
