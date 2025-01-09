import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {

	const location = useLocation();
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>

				<div className="d-flex justify-content-end align-items-center">
					{(location.pathname === "/" || location.pathname === "/login") && (
						<Link to="/signup" className="me-2">
							<button className="btn btn-primary">Sign Up</button>
						</Link>
					)}
					{(location.pathname === "/" || location.pathname === "/signup") && (
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
					)}
					{location.pathname === "/perfil" && (
						<Link to="/">
							<button className="btn btn-primary">Logout</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
