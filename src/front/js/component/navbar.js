import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate(); // Redirigir

	const handleLogout = () => {
		localStorage.removeItem("accessToken"); // Supuestamente elimina el token de sessionStorage
		navigate("/"); // Redirije
	};

	return (
		<nav className="navbar navbar-light bg-warning">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 lobster-regular fs-4">Home</span>
				</Link>

				<div className="d-flex justify-content-end align-items-center eb-garamond">
					{(location.pathname === "/" || location.pathname === "/login") && (
						<Link to="/signup" className="me-2">
							<button className="btn btn-secondary">Sign Up</button>
						</Link>
					)}
					{(location.pathname === "/" || location.pathname === "/signup") && (
						<Link to="/login">
							<button className="btn btn-secondary">Login</button>
						</Link>
					)}
					{location.pathname === "/perfil" && (
						<button className="btn btn-secondary" onClick={handleLogout}>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};