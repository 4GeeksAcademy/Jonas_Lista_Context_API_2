import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/">
					<button className="home-btn btn btn-secondary mb-0 h1">Home</button>
				</Link>

			</div>
		</nav>
	);
};